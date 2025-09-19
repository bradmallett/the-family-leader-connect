import { Inter, Crimson_Pro } from "next/font/google";
import "./globals.css";


const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Family Leader | Connect",
  description: "Connecting Constituents with Legislators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${inter.variable} antialiased bg-paperSwatch`}
      >
        {children}
      </body>
    </html>
  );
}
