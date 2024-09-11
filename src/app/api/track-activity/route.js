import {  NextResponse } from 'next/server';


import dbConnect from '@/lib/Database';
import Sessions from '@/models/Session.model';
import { getToken } from "next-auth/jwt"


export async function POST(req) {
  const token = await getToken({ req })

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
    
  await dbConnect();
  const userId = token._id; 
  console.log(userId);
  

  // Handle the request within a try-catch block
  try {
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }


    const { action, description, details } = await req.json(); // Parse JSON body

    const updatedSession = await Sessions.findOneAndUpdate(
      { userId, logoutTime: null },
      {
        $push: {
          activities: {
            action,
            description,
            details,
            timestamp: new Date(),
          }
        }
      },
      { new: true }
    );

    if (!updatedSession) {
      return NextResponse.json({ message: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Activity recorded', updatedSession }, { status: 200 });
  } catch (error) {
    console.error('Error recording activity:', error);
    return NextResponse.json({ message: 'Error recording activity' }, { status: 500 });
  }
}
