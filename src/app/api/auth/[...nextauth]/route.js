import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/Database";

const authOptions = {
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
          const normalizedEmail = credentials.email.toLowerCase();
          const user = await User.findOne({ email: normalizedEmail });

          if (!user) throw new Error("No user found with the email");

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) throw new Error("Password is incorrect");

          return user;
          
        } catch (error) {
          console.error("Error in authorize function:", error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user }) {
   
      if (user) {
        token._id = user._id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
     
      if (token.role) {
        session.user.role = token.role;
      } else {
        session.user.role = "guest"; 
      }
      return session;
    },
  },


  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
 
  
  pages: {
    signIn: "/signin",
  },
 
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
