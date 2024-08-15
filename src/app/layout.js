import { Inter } from "next/font/google";
import '../styles/globals.css'; // อัปเดต path ตามตำแหน่งที่ถูกต้อง

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
