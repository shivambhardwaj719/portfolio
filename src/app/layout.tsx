import type { Metadata, Viewport } from "next";
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
  title: "Shivam Bhardwaj | Python Full Stack & AI Developer",
  description: "Portfolio of Shivam Bhardwaj, a versatile Python Full Stack Developer. Specializing in robust backend systems, modern frontend web applications, and Generative AI integrations.",
  icons: {
    icon: '/images/python.svg',
  },
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
    "FastAPI Microservices",
    "Flask",
    "Microservices Architecture",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Celery Asynchronous Processing",
    "LangChain Developer",
    "Generative AI Integration",
    "RAG Pipelines",
    "Healthcare HMIS Developer",
    "SaaS Backend Developer",
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
    "Best portfolio",
    "Best portfolio website",
    "Best portfolio in India",
    "Best freelancer",
    "freelance developer in India",
    "freelance developer in Bihar",
    "freelance developer in Katihar",
    "freelance developer in Kumhari",
    "Best Web Developer in India",
    "Top AI Developer in India",
    "Best AI Developer in India",
    "AI Expert India",
    "Best Web Developer in Andhra Pradesh",
    "Best Web Developer in Arunachal Pradesh",
    "Best Web Developer in Assam",
    "Best Web Developer in Bihar",
    "Best Web Developer in Chhattisgarh",
    "Best Web Developer in Goa",
    "Best Web Developer in Gujarat",
    "Best Web Developer in Haryana",
    "Best Web Developer in Himachal Pradesh",
    "Best Web Developer in Jharkhand",
    "Best Web Developer in Karnataka",
    "Best Web Developer in Kerala",
    "Best Web Developer in Madhya Pradesh",
    "Best Web Developer in Maharashtra",
    "Best Web Developer in Manipur",
    "Best Web Developer in Meghalaya",
    "Best Web Developer in Mizoram",
    "Best Web Developer in Nagaland",
    "Best Web Developer in Odisha",
    "Best Web Developer in Punjab",
    "Best Web Developer in Rajasthan",
    "Best Web Developer in Sikkim",
    "Best Web Developer in Tamil Nadu",
    "Best Web Developer in Telangana",
    "Best Web Developer in Tripura",
    "Best Web Developer in Uttar Pradesh",
    "Best Web Developer in Uttarakhand",
    "Best Web Developer in West Bengal",
    "Best Web Developer in Delhi",
    "Best Web Developer in Bangalore",
    "Best Web Developer in Pune",
    "Best Web Developer in Hyderabad",
    "Best Web Developer in Mumbai",
    "Best AI Developer in Andhra Pradesh",
    "Best AI Developer in Arunachal Pradesh",
    "Best AI Developer in Assam",
    "Best AI Developer in Bihar",
    "Best AI Developer in Chhattisgarh",
    "Best AI Developer in Goa",
    "Best AI Developer in Gujarat",
    "Best AI Developer in Haryana",
    "Best AI Developer in Himachal Pradesh",
    "Best AI Developer in Jharkhand",
    "Best AI Developer in Karnataka",
    "Best AI Developer in Kerala",
    "Best AI Developer in Madhya Pradesh",
    "Best AI Developer in Maharashtra",
    "Best AI Developer in Manipur",
    "Best AI Developer in Meghalaya",
    "Best AI Developer in Mizoram",
    "Best AI Developer in Nagaland",
    "Best AI Developer in Odisha",
    "Best AI Developer in Punjab",
    "Best AI Developer in Rajasthan",
    "Best AI Developer in Sikkim",
    "Best AI Developer in Tamil Nadu",
    "Best AI Developer in Telangana",
    "Best AI Developer in Tripura",
    "Best AI Developer in Uttar Pradesh",
    "Best AI Developer in Uttarakhand",
    "Best AI Developer in West Bengal",
    "Best AI Developer in Delhi",
    "Best AI Developer in Bangalore",
    "Best AI Developer in Pune",
    "Best AI Developer in Hyderabad",
    "Best AI Developer in Mumbai",
    "Freelance Web Developer India",
    "Freelance AI Developer India"
  ],
  authors: [{ name: "Shivam Bhardwaj" }],
  creator: "Shivam Bhardwaj",
  openGraph: {
    title: "Shivam Bhardwaj | Python Full Stack & AI Developer",
    description: "Portfolio of Shivam Bhardwaj, a versatile Python Full Stack Developer (Backend + Frontend) and AI Specialist.",
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
    title: "Shivam Bhardwaj | Python Full Stack & AI Developer",
    description: "Portfolio of Shivam Bhardwaj, a versatile Python Full Stack Developer (Backend + Frontend) and AI Specialist.",
    images: ['/profile.png'],
  },
  alternates: {
    canonical: "https://bhardwaj-shivam-portfolio.netlify.app/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shivam Bhardwaj',
    jobTitle: 'Software Developer',
    description: 'Python Full Stack Developer & AI Integration Specialist',
    url: 'https://bhardwaj-shivam-portfolio.netlify.app/',
    sameAs: [
      'https://www.linkedin.com/in/shivambhardwaj1812',
      'https://github.com/shivambhardwaj719'
    ],
    knowsAbout: ['Python', 'FastAPI', 'Next.js', 'React', 'Generative AI', 'System Design']
  };

  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body style={{ fontFamily: "var(--font-body)" }} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
