
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProfile from "next-auth/providers/google";
import FacebookProfile from "next-auth/providers/facebook";
import TwitterProfile from "next-auth/providers/twitter";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login", 
    newUser :"/register"
  },

  callbacks: {
    async jwt({ token, user }) {
    
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.password = user.name;
      }
      return token;
    },
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProfile({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProfile({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    TwitterProfile({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "Enter your email",
          type: "text",
        },
        password: {
          label: "Password",
          placeholder: "Enter your password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const res = await fetch("https://exam.elevateegy.com/api/v1/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

      
        const user = await res.json();

        if (user && user.user?.email === credentials?.email) {
       
          return {
            id: user.user?.id,
            email: user.user?.email,
            name: user.user?.name,
          };
        } else {
          
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt", 
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
