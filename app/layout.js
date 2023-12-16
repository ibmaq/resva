import { Inter, Comfortaa } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata = {
  title: "Razvo",
  description: "Book with ease, stay at peace!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>{children}</body>
    </html>
  );
}
