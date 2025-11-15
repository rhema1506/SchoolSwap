import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm px-3 py-1 border rounded-lg hover:bg-gray-100 transition"
    >
      {i18n.language === "en" ? "🇷🇺 RU" : "🇬🇧 EN"}
    </button>
  );
};

export default LanguageSwitcher;
