// src/app/welcome/page.jsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'tailwindcss/tailwind.css'; // นำเข้า Tailwind CSS

export default function Welcome() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    } else {
      router.push('/login'); // Redirect to login if no token
    }
  }, [router]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('/api/auth/verify-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        console.error('Failed to fetch user data');
        router.push('/login'); // Redirect if fetching user data fails
      }
    } catch (error) {
      console.error('An error occurred while fetching user data:', error);
      router.push('/login'); // Redirect if there's an error
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user?.name || 'Guest'}</h1>
        <p className="text-lg text-gray-600 mb-6">Thank you for logging in. Enjoy your stay!</p>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
        <p>Website by Phongnawat Boonekarree</p>
      </div>
    </div>
  );
}
