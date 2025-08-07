import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "SkillConnect",
  description: "Plataforma de servicios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Puedes cargar las fuentes con link si las quieres */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
