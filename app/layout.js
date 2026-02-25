import { Outfit } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gacha Hub | Últimas novedades",
  description: "Tu fuente principal de actualizaciones y eventos de juegos gacha.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth suppressHydrationWarning">
      <body
        className={`${outfit.variable} font-sans antialiased h-screen overflow-hidden flex bg-white text-zinc-900 dark:bg-[#0a0a0e] dark:text-gray-100`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
