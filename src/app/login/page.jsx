"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'tailwindcss/tailwind.css'; // นำเข้า Tailwind CSS

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // เก็บ token ใน localStorage หรือ context
        localStorage.setItem('token', data.token);
        // ไปที่หน้าใหม่
        router.push('/welcome');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred while logging in.');
    }
  };

  const handleSignupRedirect = () => {
    router.push('/signup'); // ไปที่หน้า สมัครสมาชิก
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded mb-4"
          />
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <button 
          onClick={handleSignupRedirect}
          className="mt-4 text-blue-500 hover:underline"
        >
          ยังไม่มีบัญชี? ลงทะเบียน
        </button>
        <p>Website by Phongnawat Boonekarree</p>
      </div>
    </div>
  );
}
