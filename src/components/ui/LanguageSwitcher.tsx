import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hr', label: 'HR' },
    { code: 'sv', label: 'SV' },
];

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    return (
        <div className="flex items-center space-x-2">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`text-sm font-medium transition-colors ${i18n.language === lang.code
                            ? 'text-accent'
                            : 'text-primary/60 hover:text-primary dark:text-cream/60 dark:hover:text-cream'
                        }`}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
};
