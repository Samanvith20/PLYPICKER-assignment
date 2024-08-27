"use client";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Dashboard() {
  const { data: session, status } = useSession();
  

 

  // Handle the loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          PLYPICKER
        </a>

        {session ? (
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/signin">
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant="outline">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
