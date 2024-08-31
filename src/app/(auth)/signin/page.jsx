"use client"
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast";

const SignIn = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        ...data,
      });

      if (result.error) {
       
        console.error('Sign in failed:', result.error);
      } else {
        const session = await fetch('/api/auth/session').then((res) => res.json());
        toast({
          title: "Sign in successful",
          description: "You have successfully signed in to your account.",
        })
        if (session?.user?.role === 'team member') {
          router.push('/');
        } else {
          router.push('/dashboard/admin');
        }
      }
    } catch (err) {
      console.error('Sign in error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

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
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              errors.email ? 'border-red-500' : 'focus:border-indigo-500'
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
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              errors.password ? 'border-red-500' : 'focus:border-indigo-500'
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className={`w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          Sign In
        </button>

        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
