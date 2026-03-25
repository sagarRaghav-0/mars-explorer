import { RoverProvider } from "@/components/context/RoverContext";
import localFont from "next/font/local";
import "./globals.css";


const montserrat = localFont({
  src: [
    {
      path: "./fonts/MontserratAlternates-Regular.woff2",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <RoverProvider>
          {children}
        </RoverProvider>
      </body>
    </html>
  );
}