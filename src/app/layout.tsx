import type { Metadata } from "next";
import { Inter, Fira_Code, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bhardwaj-shivam-portfolio.netlify.app'),
  title: "Shivam Bhardwaj | Python Developer & AI Developer",
  description: "Portfolio of Shivam Bhardwaj, a passionate Python Developer and AI Developer specializing in building scalable web applications, robust APIs, and intelligent systems.",
  keywords: [
    "Shivam Bhardwaj", 
    "Python Developer", 
    "AI Developer", 
    "Full Stack Developer", 
    "Backend Lead",
    "Software Engineer", 
    "System Designer",
    "Django Developer",
    "Django REST Framework", 
    "Node.js Developer", 
    "Next.js Developer",
    "React Developer", 
    "FastAPI", 
    "Flask",
    "Microservices",
    "PostgreSQL", 
    "MongoDB",
    "AWS", 
    "Docker",
    "Telepathy Infotech",
    "Bihar Best Developer",
    "Best Developer in Bihar",
    "best katihar developer",
    "best engineer in katihar",
    "best software developer in katihar",
    "best software engineer in katihar",
    "best developer in bihar",
    "best engineer in bihar",
    "best software developer in bihar",
    "best software engineer in bihar",
    "best developer in kumhari, katihar",
    "best engineer in kumhari, katihar",
    "best software developer in kumhari, katihar",
    "best software engineer in kumhari, katihar",
    "best developer in kumhari",
    "best software developer in kumhari",
    "best software engineer in kumhari",
    "best engineer in kumhari",
    "Portfolio"
  ],
  authors: [{ name: "Shivam Bhardwaj" }],
  creator: "Shivam Bhardwaj",
  openGraph: {
    title: "Shivam Bhardwaj | Python Developer & AI Developer",
    description: "Portfolio of Shivam Bhardwaj, a passionate Python Developer and AI Developer.",
    url: "https://bhardwaj-shivam-portfolio.netlify.app/",
    siteName: "Shivam Bhardwaj Portfolio",
    images: [
      {
        url: '/profile.png',
        width: 800,
        height: 600,
        alt: 'Shivam Bhardwaj Portfolio',
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Shivam Bhardwaj | Python Developer & AI Developer",
    description: "Portfolio of Shivam Bhardwaj, a passionate Python Developer and AI Developer.",
    images: ['/profile.png'],
  },
  alternates: {
    canonical: "https://bhardwaj-shivam-portfolio.netlify.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body style={{ fontFamily: "var(--font-body)" }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
