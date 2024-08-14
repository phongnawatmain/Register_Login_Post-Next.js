import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  await dbConnect();

  const { name, email, password } = await request.json();

  try {
    // ตรวจสอบอีเมลที่มีอยู่แล้ว
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 12);

    // สร้างผู้ใช้ใหม่
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
