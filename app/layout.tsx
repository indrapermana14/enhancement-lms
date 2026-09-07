import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portaverse LMS Enhancement 2025 - Interactive Prototype",
  description: "Prototipe Resmi Enhancement Portaverse LMS V2 Fase 3 - PT Pelabuhan Indonesia (Persero)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen selection:bg-pelindo-100 selection:text-pelindo-900">
        {children}
      </body>
    </html>
  );
}
