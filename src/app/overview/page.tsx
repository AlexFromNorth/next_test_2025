"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageProps } from "@/types/pages";

import enTranslations from "../../public/locales/en/common.json";
import ruTranslations from "../../public/locales/ru/common.json";

export default function AboutPage({ params }: PageProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const currentLangRedux = useSelector((s: RootState) => s.language.current);
  const currentLang = currentLangRedux || params.lang;
  const translations = currentLang === "en" ? enTranslations : ruTranslations;

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/register");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">{translations.header?.about || "About Project"}</h1>

      <p>{translations.pages?.about_description || 'Страница "О проекте". Любое демо-описание проекта:'}</p>

      <div className="mt-4 space-y-2">
        <div className="p-2 bg-gray-100 rounded">{translations.pages?.block1 || "Block 1: project information"}</div>
        <div className="p-2 bg-gray-100 rounded">{translations.pages?.block2 || "Block 2: additional details"}</div>
        <div className="p-2 bg-gray-100 rounded">{translations.pages?.block3 || "Block 3: contacts or description"}</div>
      </div>
    </div>
  );
}
