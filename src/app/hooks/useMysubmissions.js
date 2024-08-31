
import { useEffect, useState } from "react";
import axios from "axios";

const useMySubmissions = (userId) => {
  console.log(userId);
  
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchReviews = async () => {
        try {
          // Include userId in the query parameters
          const response = await axios.get(`/api/my-submissions?userId=${userId}`);
          console.log(response.data);
          
          setReviews(response.data);
        } catch (error) {
          setError(error);
          console.error("Error fetching reviews:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }
  }, [userId]);

  return { reviews, loading, error };
};

export default useMySubmissions;
