import './globals.css';

export const metadata = {
  title: 'Lipaz Nussen | Portfolio',
  description: 'Operations, Technology & Management — Portfolio',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
