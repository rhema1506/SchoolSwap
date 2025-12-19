import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700
                 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
};

export default ThemeToggle;
