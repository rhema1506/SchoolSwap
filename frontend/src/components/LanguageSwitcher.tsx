import React from "react";
import i18n from "../utils/i18n";

const LanguageSwitcher: React.FC = () => {
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <button onClick={toggleLanguage} className="px-2 border rounded">
      {i18n.language === "en" ? "Русский" : "English"}
    </button>
  );
};

export default LanguageSwitcher;
