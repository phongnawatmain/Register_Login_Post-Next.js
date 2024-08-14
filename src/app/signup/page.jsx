"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'tailwindcss/tailwind.css'; // นำเข้า Tailwind CSS

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('สมัครสมาชิกสำเร็จ');
        router.push('/login'); // เปลี่ยนไปที่หน้า login หลังจากสมัครสมาชิก
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred while registering.');
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login'); // ไปที่หน้า Login
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded mb-4"
          />
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
            Register
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <button 
          onClick={handleLoginRedirect}
          className="mt-4 text-blue-500 hover:underline"
        >
          Already have an account? Login
        </button>
        <p>Website by Phongnawat Boonekarree</p>
      </div>
    </div>
  );
}
