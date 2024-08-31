"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

const ReviewDetails = () => {
  const { data: session, status } = useSession();
  const [review, setReview] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  useEffect(() => {
    const fetchReviewAndProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const reviewResponse = axios.get(`/api/pending-request/${id}`);
        const productResponse = reviewResponse.then(response =>
          axios.get(`/api/products/${response.data.productId}`)
        );

        const [reviewData, productData] = await Promise.all([reviewResponse, productResponse]);

        setReview(reviewData.data);
        setOriginalProduct(productData.data);
      } catch (error) {
        console.error("Error fetching review details or original product data:", error);
        setError("Failed to load review details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && session.user.role === "admin") {
      fetchReviewAndProduct();
    }
  }, [id, status, session]);

  const handleApproval = async (status) => {
    try {
      console.log("Before sending to backend:", status.toLowerCase());
      await axios.patch(`/api/pending-request/${id}`, { status: status.toLowerCase() });
      router.push("/pending-requests");
    } catch (error) {
      console.error(`Error ${status === "approved" ? "approving" : "rejecting"} the review:`, error);
    }
  };

  const renderFieldComparison = (label, originalValue, newValue) => {
    const hasChanged = originalValue !== newValue;
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">{label}:</label>
        {hasChanged ? (
          <div className="flex items-center">
            <span className="line-through text-red-500 mr-2">{originalValue}</span>
            <span className="font-bold text-green-500">{newValue}</span>
          </div>
        ) : (
          <span>{originalValue}</span>
        )}
      </div>
    );
  };

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
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (status !== "authenticated" || session.user.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">
          Access Denied
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {review && originalProduct ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Review Details for {review.name}</h1>

          {/* Responsive Layout for Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={review.image}
                alt={review.name}
                className="w-full h-64 object-contain rounded-lg mb-4"
              />
            </div>
            <div>
              {/* Compare fields */}
              {renderFieldComparison("Name", originalProduct.name, review.name)}
              {renderFieldComparison("Description", originalProduct.description, review.description)}
              {renderFieldComparison("Price", `$${originalProduct.price}`, `$${review.price}`)}

              {/* Image URL Shortening */}
              {renderFieldComparison(
                "Image URL",
                originalProduct.image?.substring(0, 30) + "...",
                review.image?.substring(0, 30) + "..."
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 justify-end">
            <button
              onClick={() => handleApproval("Approved")}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Approved
            </button>
            <button
              onClick={() => handleApproval("Rejected")}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Rejected
            </button>
          </div>
        </div>
      ) : (
        <p>Loading review details...</p>
      )}
    </div>
  );
};

export default ReviewDetails;
