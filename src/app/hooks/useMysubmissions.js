
import { useEffect, useState } from "react";
import axios from "axios";

const useMySubmissions = (userRole) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userRole === "team member") {
      const fetchReviews = async () => {
        try {
          const response = await axios.get("/api/my-submissions");
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
  }, [userRole]);

  return { reviews, loading, error };
};

export default useMySubmissions;
