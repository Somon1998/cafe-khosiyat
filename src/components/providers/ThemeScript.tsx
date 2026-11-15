/**
 * Постоянная тёмная culinary-тема.
 * Игнорирует ранее сохранённый light-preference, чтобы не было flash.
 */
export function ThemeScript() {
  const script = `
    (function() {
      try {
        var key = 'cafe-theme';
        if (localStorage.getItem(key) === 'light') {
          localStorage.setItem(key, 'dark');
        }
        document.documentElement.classList.add('dark');
      } catch (e) {
        document.documentElement.classList.add('dark');
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
