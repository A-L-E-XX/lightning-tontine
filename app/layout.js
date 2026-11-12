import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Lightning Tontine',
  description:
    'Save for school fees and rent with your classmates, without trusting one person to hold the money.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0b0d',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <Link href="/" className="brand">
            <span className="bolt" aria-hidden="true">
              ⚡
            </span>
            Lightning Tontine
          </Link>
        </header>
        <main className="page">{children}</main>
        <footer className="footer">
          This app never holds your money. Members pay each other directly.
        </footer>
      </body>
    </html>
  );
}
