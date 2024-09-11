"use client";
import useMySubmissions from "@/app/hooks/useMysubmissions";
import { useSession, signIn } from "next-auth/react";

const MySubmissions = () => {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;
  const userId = session.user._id
  // console.log(session);
  console.log(userId);
  
  

  // Call useMySubmissions with the correct userId
  const { reviews, loading, error } = useMySubmissions(userId);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    signIn();
    return null; // Prevent further rendering
  }

  if (userRole !== "team member") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">
          Access Denied. Only team members can access this page.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">
          Error loading submissions.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Submissions
      </h1>
      {reviews.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {review.name}
                </h2>
                <p className="text-gray-600 mt-2">{review.description}</p>
                <p className="text-lg font-bold mt-4">Price: ${review.price}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
                    review.status === "approved"
                      ? "bg-green-200 text-green-800"
                      : review.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : review.status === "rejected"
                      ? "bg-red-200 text-red-800"
                      : ""
                  }`}
                >
                  {review.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
