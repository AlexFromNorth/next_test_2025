'use client'

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import Header from "../components/Header";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function Providers({ 
  children, 
}: ClientLayoutProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Header />
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
      </PersistGate>
    </Provider>
  );
}