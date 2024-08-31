// hooks/useMySubmissions.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const useMySubmissions = (userRole) => {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userRole === "team member" && status === "authenticated") {
      const fetchReviews = async () => {
        try {
          // Include userId in the query parameters
          const response = await axios.get(`/api/my-submissions?userId=${session.user.id}`);
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
  }, [userRole, status, session.userId]);

  return { reviews, loading, error };
};

export default useMySubmissions;
