import dbConnect from './mongodb';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export async function registerUser(name, email, password) {
  await dbConnect();

  // ตรวจสอบว่าอีเมลมีอยู่แล้วหรือไม่
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // แฮชรหัสผ่าน
  const hashedPassword = await bcrypt.hash(password, 12);

  // สร้างผู้ใช้ใหม่
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return user;
}
