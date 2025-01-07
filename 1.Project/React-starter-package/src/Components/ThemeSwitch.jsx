import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeSwitch = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="">
      <button
        onClick={toggleTheme}
        className="bg-transparent rounded-lg px-4 py-2 transition-all duration-150 flex items-center gap-2"
      >
        {theme === 'dark' ? (
          <>
            <Moon className="h-5 w-5 text-gray-800 dark:text-yellow-300" />
            <span className="text-sm font-medium text-gray-800 dark:text-white">Dark</span>
          </>
        ) : (
          <>
            <Sun className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-800">Light</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ThemeSwitch;