import { DEMO } from "@/constants/demo";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/providers/CartProvider";
import { DemoBanner } from "./DemoBanner";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  // showBanner=false: Header стартует с Y=0. Disclosure — в Footer.
  const content = (
    <>
      <DemoBanner />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );

  // В демо заказы отключены — корзину не монтируем
  if (DEMO.disableOrders) {
    return content;
  }

  return (
    <CartProvider>
      {content}
      <CartDrawer />
    </CartProvider>
  );
}
