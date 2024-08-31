"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (session) {
        try {
          const response = await axios.get('/api/profile', {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          console.log(response.data);
          
          setStats(response.data);
        } catch (error) {
          console.error('Error fetching profile stats:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStats();
  }, [session]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">User Statistics</h3>
        <ul>
          <li>Total Requests: {stats.totalRequests}</li>
          <li>Approved Requests: {stats.approvedRequests}</li>
          <li>Rejected Requests: {stats.rejectedRequests}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;