import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">ยินดีต้อนรับ!</h1>
      <div className="space-x-4">
        <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          สมัครสมาชิก
        </Link>
        <Link href="/login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          เข้าสู่ระบบ
        </Link>
      </div>
    </div>
    </main>
  );
}
