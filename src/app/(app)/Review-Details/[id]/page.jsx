"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

const ReviewDetails = () => {
  const { data: session, status } = useSession();
  const [review, setReview] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);
  const params = useParams();
  const id=params.id

  useEffect(() => {
    const fetchReviewAndProduct = async () => {
      try {
        const reviewResponse = await axios.get(`/api/pending-request/${id}`);
        setReview(reviewResponse.data);

        const productResponse = await axios.get(`/api/products/${reviewResponse.data.productId}`);
        setOriginalProduct(productResponse.data);
      } catch (error) {
        console.error("Error fetching review details or original product data:", error);
      }
    };

    if (status === "authenticated" && session.user.role === "admin") {
      fetchReviewAndProduct();
    }
  }, [id, status, session]);

  const handleApproval = async (status) => {
    try {
        console.log(status);
        
      await axios.patch(`/api/pending-request/${id}`, { status: status.toLowerCase() }); // Convert status to lowercase
      router.push("/PendingReviews");
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

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status !== "authenticated" || session.user.role !== "admin") {
    return <p>Access Denied</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {review && originalProduct ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Review Details for {review.name}</h1>
          <img
            src={review.image}
            alt={review.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          
          {/* Compare fields */}
          {renderFieldComparison("Name", originalProduct.name, review.name)}
          {renderFieldComparison("Description", originalProduct.description, review.description)}
          {renderFieldComparison("Price", `$${originalProduct.price}`, `$${review.price}`)}
          {renderFieldComparison("Image", originalProduct.image, review.image)}
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => handleApproval("Approved")}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Approved
            </button>
            <button
              onClick={() => handleApproval("Reject")}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Reject
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
