"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function Dashboard() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); 

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await res.json();
      if (res.ok) {
        
        await signOut({ redirect: false });
        router.push("/signin"); 
      } else {
        console.error("Error logging out:", data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="/" className="text-xl font-bold mb-4 md:mb-0">
          PLYPICKER
        </a>

        <div className="flex items-center space-x-4 ">
          <Link href="/add-item">
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600 mr-7"
              variant="solid"
            >
              Add Item
            </Button>
          </Link>

          {session ? (
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="flex items-center space-x-2 bg-slate-100 text-black p-2 rounded-full"
              >
                <img
                  src={
                    session.user?.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Ne7oVV6Lx9uAnmJDUZrrLcGy8yzo1sXdpQ&s"
                  }
                  alt="Profile"
                  className="w-full h-8 rounded-full object-contain"
                />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                  <Link href="/profile">
                    <span className="block px-4 py-2 text-sm cursor-pointer">
                      Profile
                    </span>
                  </Link>
                  <Link href="/profile/my-submissions">
                    <span className="block px-4 py-2 text-sm cursor-pointer">
                      My Submissions
                    </span>
                  </Link>
                  <Link href="/pending-requests">
                    <span className="block px-4 py-2 text-sm cursor-pointer">
                      Pending Requests
                    </span>
                  </Link>
                  <Link href="/dashboard/admin">
                    <span className="block px-4 py-2 text-sm cursor-pointer">
                      Admin Dashboard
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm bg-red-500 text-white rounded-b-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin">
              <Button
                className="w-full md:w-auto bg-slate-100 text-black"
                variant="outline"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
