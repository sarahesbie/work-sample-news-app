import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News App",
  description: "Work Sample created for Portable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
