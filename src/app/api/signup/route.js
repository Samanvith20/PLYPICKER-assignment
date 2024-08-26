import bcrypt from 'bcryptjs';
import User from "@/models/user.model";
import dbConnect from '@/lib/Database';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password, role } = await req.json(); // Parse the JSON body
    await dbConnect();

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Please fill all the details" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });
    

    await newUser.save();
    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'User registration failed', details: error.message }, { status: 400 });
  }
}
