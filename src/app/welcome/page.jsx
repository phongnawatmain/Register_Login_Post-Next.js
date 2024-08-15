'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Welcome() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          const sortedPosts = data.sort((a, b) => b._id.localeCompare(a._id));
          setPosts(sortedPosts);
        } else {
          console.error('Data is not an array', data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/auth/verify-token', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setUsername(data.user.name);
        fetchPosts();
      } catch (error) {
        console.error('Error verifying token or fetching user:', error);
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white">
      <nav className="w-full py-4 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="text-xl font-semibold text-blue-600">
            สวัสดี, {username}
          </span>
          <div>
            <Link href="/post">
              <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                เพิ่มโพสต์
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="ml-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between">
                {post.imageLink ? (
                  <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                    <img
                      src={post.imageLink}
                      alt={post.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
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
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <p className="text-sm">© {new Date().getFullYear()}</p>
          <p className="text-xs">Developed by Phongnawat Boonekarree (https://github.com/phongnawatmain)</p>
        </div>
      </footer>
    </div>
  );
}
