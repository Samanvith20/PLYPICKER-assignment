import { NextResponse } from 'next/server';
import dbConnect from '@/lib/Database';
import Sessions from '@/models/Session.model';
import { getToken } from 'next-auth/jwt';

export async function POST(req) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const userId = token._id;
  console.log(userId);
  
  try {
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // Update the session with logoutTime
    const updatedSession = await Sessions.findOneAndUpdate(
      { userId , logoutTime: null }, // Find the active session
      {
        $set: { logoutTime: new Date() },
        $push: {
          activities: {
            action: "logout",
            description: "User has logged out",
            timestamp: new Date(),
          },
        },
      },
      { new: true }
    );

    

    if (!updatedSession) {
      return NextResponse.json({ message: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User logged out successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error logging out:', error);
    return NextResponse.json({ message: 'Error logging out' }, { status: 500 });
  }
}
