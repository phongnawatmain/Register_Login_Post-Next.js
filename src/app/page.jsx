'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // เรียงลำดับโพสต์ตาม _id จากใหม่สุดไปเก่า
        const sortedPosts = data.sort((a, b) => b._id.localeCompare(a._id));
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white flex flex-col">
      <nav className="w-full py-4 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">ยินดีต้อนรับ!</h1>
          <div>
            <Link href="/signup">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2">
                สมัครสมาชิก
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-2">
                เข้าสู่ระบบ
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between">
                {post.imageLink ? (
                  <img
                    src={post.imageLink}
                    alt={post.title}
                    className="w-full h-48 object-contain rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-600">No Image Available</span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="max-h-20 overflow-y-auto">{post.content}</p>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()}</p>
          <p className="text-xs">Developed by Phongnawat Boonekarree (https://github.com/phongnawatmain)</p>
        </div>
      </footer>
    </div>
  );
}
