import "@/styles/globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Test App",
  description: "A modern Next.js application",
};

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ru' }
  ];
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default function RootLayout({ 
  children, 
  params 
}: RootLayoutProps) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className="bg-gray-50 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}