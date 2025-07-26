import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn MongoDB - Interactive Learning Platform",
  description: "Master MongoDB from fundamentals to advanced concepts with our interactive learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light', filter: 'none' }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Only set if not already set to prevent hydration mismatch
                  var html = document.documentElement;
                  if (!html.classList.contains('light')) {
                    html.classList.add('light');
                  }
                  if (html.classList.contains('dark')) {
                    html.classList.remove('dark');
                  }
                  // Ensure consistent styling
                  html.style.colorScheme = 'light';
                  html.style.filter = 'none';
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
        style={{ backgroundColor: '#ffffff', color: '#111827' }}
      >
        {children}
      </body>
    </html>
  );
}
