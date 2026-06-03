import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shivam Bhardwaj | Python Developer & AI Developer",
  description: "Portfolio of Shivam Bhardwaj, a passionate Python Developer and AI Developer specializing in building scalable web applications, robust APIs, and intelligent systems.",
  keywords: ["Shivam Bhardwaj", "Python Developer", "AI Developer", "Software Engineer", "Backend Developer", "Portfolio", "Full Stack Developer"],
  authors: [{ name: "Shivam Bhardwaj" }],
  creator: "Shivam Bhardwaj",
  openGraph: {
    title: "Shivam Bhardwaj | Python Developer & AI Developer",
    description: "Portfolio of Shivam Bhardwaj, a passionate Python Developer and AI Developer.",
    url: "https://bhardwaj-shivam-portfolio.netlify.app/",
    siteName: "Shivam Bhardwaj Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <body style={{ fontFamily: "var(--font-body)" }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
