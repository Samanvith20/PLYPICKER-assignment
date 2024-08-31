"use client"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/signup', data);
      router.replace('/signin');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full p-2 border border-gray-300 rounded focus:outline-none ${
                errors.email ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              className={`w-full p-2 border border-gray-300 rounded focus:outline-none ${
                errors.password ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-bold mb-2">Role</label>
            <select
              id="role"
              {...register('role', { required: 'Role is required' })}
              className={`w-full p-2 border border-gray-300 rounded ${
                errors.role ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-500'
              }`}
            >
              <option value="team member">Team Member</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
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
