"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const PendingReviews = () => {
  const { data: session, status } = useSession();
  const [pendingReviews, setPendingReviews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session.user.role === "admin") {
      const fetchPendingReviews = async () => {
        try {
          const response = await axios.get("/api/pending-submissions");
          setPendingReviews(response.data);
        } catch (error) {
          console.error("Error fetching pending reviews:", error);
        }
      };

      fetchPendingReviews();
    } else if (status === "unauthenticated") {
      signIn();
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (session && session.user.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">
          Access Denied. Only admins can access this page.
        </p>
      </div>
    );
  }

  const handleReviewClick = (id) => {
    router.push(`/Review-Details/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Pending Reviews
      </h1>
      {pendingReviews.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No pending reviews found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingReviews.map((review) => (
            <div
              key={review._id}
              onClick={() => handleReviewClick(review._id)}
              className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
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
                <p className="text-lg font-bold mt-4">
                  Price: ${review.price}
                </p>
                <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full bg-yellow-200 text-yellow-800">
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

export default PendingReviews;
