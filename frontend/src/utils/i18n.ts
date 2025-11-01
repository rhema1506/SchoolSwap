import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to School Swap!",
      login: "Login",
      register: "Register",
      logout: "Logout",
      language: "Language",
      city: "City",
    },
  },
  ru: {
    translation: {
      welcome: "Добро пожаловать в School Swap!",
      login: "Войти",
      register: "Регистрация",
      logout: "Выйти",
      language: "Язык",
      city: "Город",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "ru",
  interpolation: { escapeValue: false },
});

export default i18n;
