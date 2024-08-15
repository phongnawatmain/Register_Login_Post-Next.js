import dbConnect from '../../../../lib/mongodb'; // ตรวจสอบพาธให้ถูกต้อง
import User from '../../../../models/User'; // ตรวจสอบพาธให้ถูกต้อง
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await dbConnect();

  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 400 });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return new Response(JSON.stringify({ message: 'Login successful', token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
