"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

import enTranslations from "../public/locales/en/common.json";
import ruTranslations from "../public/locales/ru/common.json";

export default function HomePage() {
  const currentLang = useSelector((s: RootState) => s.language.current);
  const translations = currentLang === "en" ? enTranslations : ruTranslations;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">{translations.pages?.home_title || "Welcome to the Project"}</h1>

      <p>{translations.pages?.home_description || "Главная страница. Любое демо-описание проекта:"}</p>

      <div className="mt-4 space-y-2">
        <div className="p-2 bg-gray-100 rounded">{translations.pages?.block1 || "Блок 1: краткое описание проекта"}</div>
        <div className="p-2 bg-gray-100 rounded">{translations.pages?.block2 || "Блок 2: дополнительные детали"}</div>
        <div className="p-2 bg-gray-100 rounded">{translations.pages?.block3 || "Блок 3: контактная информация или заметки"}</div>
      </div>
    </div>
  );
}
