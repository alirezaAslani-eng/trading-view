


export default function RootLayout({ children }) {
  return (
    <html lang="fa"  className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
