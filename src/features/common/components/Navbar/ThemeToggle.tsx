import { useEffect, useState } from "react";
import { GoMoon, GoSun } from "react-icons/go";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={darkMode}
      aria-label="Toggle dark mode"
      onClick={() => setDarkMode((current) => !current)}
      className={`relative flex h-6 w-11 items-center rounded-full p-1 transition-colors duration-300  ${
        darkMode ? "bg-(--accent-bg)" : "bg-transparent"
      }`}
    >
      {/* Toggle knob */}
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
          darkMode ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {darkMode ? (
          <GoMoon className="text-slate-700" size={15} />
        ) : (
          <GoSun className="text-yellow-500" size={16} />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
