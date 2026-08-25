// Theme toggle script
(() => {
  const THEME_KEY = "theme";
  const html = document.documentElement;
  const toggle = document.getElementById("themeToggle");

  const applyTheme = (theme) => {
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem(THEME_KEY, theme);
  };

  // Initialize from storage or system preference
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) {
    applyTheme(stored);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme("dark");
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = html.classList.contains("dark");
      applyTheme(isDark ? "light" : "dark");
    });
  }
})();
