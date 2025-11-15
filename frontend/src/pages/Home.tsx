import React from "react";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{t("welcome")}</h1>
      <p className="text-gray-700">SchoolSwap — platform for students to swap books and supplies.</p>
    </div>
  );
};

export default Home;
