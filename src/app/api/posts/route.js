import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Post from '../../../models/Post';

export async function GET() {
    try {
        await dbConnect(); // เชื่อมต่อกับ MongoDB
        const posts = await Post.find(); // ดึงข้อมูลโพสต์ทั้งหมดจาก MongoDB
        return NextResponse.json(posts, { status: 200 }); // ตอบกลับด้วยข้อมูลโพสต์และสถานะ 200 OK
    } catch (error) {
        console.error('Error fetching posts:', error); // เพิ่มการดีบัก
        return NextResponse.json({ message: 'Error fetching posts', error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
  try {
      await dbConnect(); // เชื่อมต่อกับ MongoDB

      const { title, content, imageLink, imageFile } = await request.json();

      if (!title || !content) {
          return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
      }

      const newPost = new Post({
          title,
          content,
          imageLink,
          imageFile,
      });

      await newPost.save();

      return NextResponse.json({ message: 'Post created successfully' }, { status: 201 });
  } catch (error) {
      console.error('Error creating post:', error);
      return NextResponse.json({ message: 'Error creating post', error: error.message }, { status: 500 });
  }
}
