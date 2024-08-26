"use client";

import {  useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./dashboard/page";
import Products from "./products/page";



// Custom Button component
const Button = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${className} hover:bg-gray-200 transition-colors duration-200`}
    >
      {children}
    </button>
  );
};

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
 
 
  console.log(useSession());
  
  const user = session?.user;
console.log(user);

  // If not logged in, redirect to signup
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signup");
    }
  }, [status, router]);

  // Render the appropriate component based on user role
  if (status === "authenticated") {
    if (user.role === "admin") {
      return <Dashboard />;
    } else if (user.role === "team member") {
      return <Products />;
    }
  }

  // Fallback: Render a loading state or nothing if status is "loading"
  return null;
}
