import "./globals.css";
import GrainyFilter from "@/components/GrainyFilter";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <GrainyFilter />
        {children}
      </body>
    </html>
  );
}
