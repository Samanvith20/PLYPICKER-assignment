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
    pendingRequests: 0,
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
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">User Statistics</h3>
        <ul className="space-y-2">
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-600">Total Requests:</span>
            <span className="text-gray-800">{stats.totalRequests}</span>
          </li>
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-600">Approved Requests:</span>
            <span className="text-gray-800">{stats.approvedRequests}</span>
          </li>
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-600">Rejected Requests:</span>
            <span className="text-gray-800">{stats.rejectedRequests}</span>
          </li>
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-600">Pending Requests:</span>
            <span className="text-gray-800">{stats.pendingRequests}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
