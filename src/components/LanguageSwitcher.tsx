"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleLanguage } from "../store/languageSlice";

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const currentLang = useSelector((state: RootState) => state.language.current);

  const handleToggle = () => {
    dispatch(toggleLanguage());
  };

  return (
    <button
      onClick={handleToggle}
      className="px-3 py-1 border rounded text-sm hover:bg-gray-100 transition-colors"
    >
      {currentLang === 'en' ? 'EN' : 'RU'}
    </button>
  );
}