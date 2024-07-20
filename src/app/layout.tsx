import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { getSiteConfig } from '@/service/site-config/get-site-config';

const inter = Inter({ subsets: ['latin'] });

const defaultSiteConfig = {
  siteName: 'Default Site Name',
  siteDescription: 'Default site description',
};

export async function generateMetadata(): Promise<Metadata> {
  let siteConfig;
  try {
    siteConfig = await getSiteConfig();
  } catch (error) {
    console.error('Failed to fetch site config:', error);
    siteConfig = defaultSiteConfig;
  }
  return {
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
