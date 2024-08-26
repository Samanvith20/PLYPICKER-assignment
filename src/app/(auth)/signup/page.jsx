"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signup= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('team member');
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/signup', { email, password, role });
      setIsRegistered(true);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  useEffect(() => {
    if (isRegistered) {
      router.replace('/signin');
    }
  }, [isRegistered]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Role:</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="admin" className="mr-4">Admin</label>
              <input
                type="radio"
                id="teamMember"
                name="role"
                value="team member"
                onChange={(e) => setRole(e.target.value)}
                defaultChecked
                className="mr-2"
              />
              <label htmlFor="teamMember">Team Member</label>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200">
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/signin" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;