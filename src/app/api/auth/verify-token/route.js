// src/app/api/auth/verify-token/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../../models/User'; // เปลี่ยนเส้นทางตามที่คุณเก็บโมเดล

export async function GET(request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: { name: user.name } }); // ส่งคืนชื่อผู้ใช้
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
