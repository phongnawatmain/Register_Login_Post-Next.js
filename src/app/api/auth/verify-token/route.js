// src/app/api/auth/verify-token/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../../models/User'; // ตรวจสอบเส้นทางของโมเดลให้ถูกต้อง

export async function GET(request) {
  // ดึง token จาก header
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    // ถอดรหัส token และตรวจสอบความถูกต้อง
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ค้นหาผู้ใช้จากฐานข้อมูลโดยใช้ userId จาก token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // ส่งคืนชื่อผู้ใช้
    return NextResponse.json({ user: { name: user.name } });
  } catch (error) {
    // แสดงข้อผิดพลาดหาก token ไม่ถูกต้อง
    console.error('Error verifying token:', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
