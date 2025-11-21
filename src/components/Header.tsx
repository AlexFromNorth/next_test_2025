"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logoutUser } from "../store/authSlice";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

import enTranslations from "../public/locales/en/common.json";
import ruTranslations from "../public/locales/ru/common.json";

export default function Header() {
  const { isAuthenticated, currentEmail } = useSelector((state: RootState) => state.auth);
  const currentLang = useSelector((s: RootState) => s.language.current);
  const dispatch = useDispatch();
  const router = useRouter();

  const translations = currentLang === "en" ? enTranslations : ruTranslations;

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });

    dispatch(logoutUser());
    router.push("/");
  };

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex gap-4">
          <Link href="/" className="hover:text-blue-500 transition-colors">
            {translations.header?.home || "Home"}
          </Link>
          <Link href="/overview" className="hover:text-blue-500 transition-colors">
            {translations.header?.about || "About"}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {isAuthenticated ? (
            <>
              <span className="text-gray-600">{currentEmail}</span>
              <button onClick={logout} className="px-3 py-1 border rounded hover:bg-gray-50 transition-colors">
                {translations.auth?.logout || "Logout"}
              </button>
            </>
          ) : (
            <Link href="/register" className="px-3 py-1 border rounded hover:bg-gray-50 transition-colors">
              {translations.auth?.login || "Login"}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
