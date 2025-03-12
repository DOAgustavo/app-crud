import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'App CRUD',
  description: 'Aplicativo CRUD com Next.js e Prisma',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}