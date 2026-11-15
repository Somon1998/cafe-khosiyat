"use client";

import { useEffect, useState } from "react";
import { DEMO } from "@/constants/demo";
import { KHOSIYAT_STATIC_MENU } from "@/data/khosiyat-menu";
import type { ProductWithOptions } from "@/types/product";
import { getMenuClient } from "@/lib/supabase/menu-client";

/**
 * Публичное меню.
 * В демо-режиме — только локальные данные Khosiyat (без Supabase).
 */
export function useMenu(onlyAvailable = false) {
  const [allProducts, setAllProducts] = useState<ProductWithOptions[]>([]);
  const [loading, setLoading] = useState(!DEMO.enabled);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (DEMO.enabled) return;

    let cancelled = false;

    void (async () => {
      const { products: data, error: fetchError } = await getMenuClient();
      if (cancelled) return;

      setAllProducts(data);
      setError(fetchError ? "fetch_error" : null);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (DEMO.enabled) {
    return {
      products: filterAvailable(KHOSIYAT_STATIC_MENU, onlyAvailable),
      loading: false,
      error: null,
    };
  }

  return {
    products: filterAvailable(allProducts, onlyAvailable),
    loading,
    error,
  };
}

function filterAvailable(
  data: ProductWithOptions[],
  onlyAvailable: boolean,
): ProductWithOptions[] {
  return onlyAvailable ? data.filter((p) => p.is_available) : data;
}
