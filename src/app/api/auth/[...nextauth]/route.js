import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/Database";
import Sessions from "@/models/Session.model";

 export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        try {
          // Normalize email and find the user in the database
          const normalizedEmail = credentials.email.toLowerCase();
          const user = await User.findOne({ email: normalizedEmail });

          if (!user) throw new Error("No user found with the email");

          // Compare provided password with the stored hashed password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) throw new Error("Password is incorrect");

          // Return user object with necessary information
          return { _id: user._id.toString(), email: user.email, role: user.role };
        } catch (error) {
          console.error("Error in authorize function:", error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user information to the token after successful login
      if (user) {
        token._id = user._id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Set the role in the session based on token
      session.user.role = token.role || "guest";
      session.user._id = token._id;
      return session;
    },
    async signIn({ user }) {
      await dbConnect();
      try {
        // Create a new session in the database after user signs in
        const newSession = new Sessions({
          userId: user._id,
          loginTime: new Date(),
          activities: [
            {
              action: "login",
              description: `User ${user.email} has logged in`,
              timestamp: new Date(),
            },
          ],
        });
        await newSession.save();
        console.log("New session created:", newSession);

        return true; // Return true if sign-in is successful
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Return false if there was an error during sign-in
      }
    },
    
    
  },
  session: {
    strategy: "jwt", // Using JWT strategy for sessions
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment variables
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
