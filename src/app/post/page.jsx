"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Post() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageLink, setImageLink] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !content) {
      alert('กรุณากรอกหัวข้อและเนื้อหาก่อนโพสต์');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('กรุณาเข้าสู่ระบบก่อนโพสต์');
      router.push('/login');
      return;
    }
  
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, imageLink }),
      });
  
      console.log('Response status:', response.status);
      console.log('Response body:', await response.text());
  
      if (response.ok) {
        router.push('/welcome');
      } else {
        throw new Error('Error creating post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาดในการสร้างโพสต์');
    }
  };
  
  return (
    <div className="h-screen bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white text-black rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">สร้างโพสต์</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-lg font-semibold mb-2">หัวข้อ:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-lg font-semibold mb-2">เนื้อหา:</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows="6"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="imageLink" className="block text-lg font-semibold mb-2">ลิงก์ภาพ:</label>
              <input
                type="url"
                id="imageLink"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              โพสต์
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
