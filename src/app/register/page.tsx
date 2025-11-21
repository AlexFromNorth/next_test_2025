"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../../store/authSlice";
import { useRouter } from "next/navigation";
import sha256 from "crypto-js/sha256";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import enTranslations from "@/public/locales/en/common.json";
import ruTranslations from "@/public/locales/ru/common.json";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const currentLang = useSelector((s: RootState) => s.language.current);
  const translations = currentLang === "en" ? enTranslations : ruTranslations;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    const passwordHash = sha256(password).toString();
    dispatch(registerUser({ email, passwordHash }));
    const token = "FAKE_TOKEN_" + Date.now();
    dispatch(loginUser({ email, token }));
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}`;

    router.push("/");
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-xl font-semibold">{translations.auth?.register || "Register"}</h1>

      <input
        className="w-full mt-4 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        className="w-full mt-4 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />

      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded">{translations.auth?.create_account || "Create account"}</button>
    </form>
  );
}
