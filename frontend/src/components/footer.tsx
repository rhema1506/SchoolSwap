import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">SchoolSwap</h2>
          <p className="text-sm">
            {t("footer.description", {
              defaultValue:
                "A simple platform to buy, sell, and exchange school supplies among students.",
            })}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            {t("footer.quickLinks", { defaultValue: "Quick Links" })}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-white transition"
              >
                {t("footer.home", { defaultValue: "Home" })}
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-white transition"
              >
                {t("footer.products", { defaultValue: "Products" })}
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-white transition"
              >
                {t("footer.about", { defaultValue: "About Us" })}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition"
              >
                {t("footer.contact", { defaultValue: "Contact" })}
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            {t("footer.categories", { defaultValue: "Categories" })}
          </h3>
          <ul className="space-y-2">
            <li>Books</li>
            <li>Stationery</li>
            <li>Uniforms</li>
            <li>Gadgets</li>
            <li>Other</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            {t("footer.contactInfo", { defaultValue: "Contact Info" })}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@schoolswap.com</li>
            <li>Phone: +7 (900) 123-45-67</li>
            <li>Location: Moscow, Russia</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>
          © {new Date().getFullYear()} SchoolSwap.{" "}
          {t("footer.rights", { defaultValue: "All rights reserved." })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
