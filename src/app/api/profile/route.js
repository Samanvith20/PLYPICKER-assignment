import { NextResponse } from 'next/server';
import dbConnect from '@/lib/Database'; 
import Review from '@/models/Review.model'; 
import { getToken } from 'next-auth/jwt';

export async function GET(req) {
  const token = await getToken({ req });
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect(); 

  try {
    const userId = token._id; 
    

   

    // Fetch statistics
    const totalRequests = await Review.countDocuments({ userId });
    const approvedRequests = await Review.countDocuments({ userId, status: 'approved' }); // Count approved reviews
    const rejectedRequests = await Review.countDocuments({ userId, status: 'rejected' }); // Count rejected reviews
    const pendingRequests = await Review.countDocuments({ userId, status: 'pending' }); // Count pending reviews

    return NextResponse.json({
      totalRequests,
      approvedRequests,
      rejectedRequests,
      pendingRequests, 
    });
  } catch (error) {
    console.error('Error fetching profile stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}