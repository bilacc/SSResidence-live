import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-primary/5 dark:hover:bg-cream/10 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
            aria-label={theme === 'light' ? "Switch to dark mode" : "Switch to light mode"}
        >
            {theme === 'light' ? (
                <Moon className="w-5 h-5 text-primary transition-transform hover:rotate-12" />
            ) : (
                <Sun className="w-5 h-5 text-cream transition-transform hover:rotate-90" />
            )}
        </button>
    );
};
