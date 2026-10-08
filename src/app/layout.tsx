import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pour mon amour 💖 - Date Request',
  description: 'Une petite question romantique rien que pour toi...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="text-[#2d2325] antialiased min-h-screen flex flex-col items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
