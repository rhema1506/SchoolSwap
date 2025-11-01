import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to SchoolSwap",
      "products": "Products",
      "add_product": "Add product",
      "login": "Login",
      "register": "Register",
      "logout": "Logout",
      "search": "Search...",
      "city": "City"
    }
  },
  ru: {
    translation: {
      "welcome": "Добро пожаловать в SchoolSwap",
      "products": "Товары",
      "add_product": "Добавить товар",
      "login": "Войти",
      "register": "Регистрация",
      "logout": "Выйти",
      "search": "Поиск...",
      "city": "Город"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    }
  });

export default i18n;
