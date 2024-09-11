// track-activity/route.js

import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";
import dbConnect from '@/lib/Database';
import Sessions from '@/models/Session.model';

export async function POST(req) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
    
  await dbConnect();
  const userId = token._id;

  try {
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const { action, description, details } = await req.json();
    const forwarded = req.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',').pop() : "unknown";

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
        },
        ipAddress: ipAddress, // Store the user's IP address
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
