import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
export const autOptions = {
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_KEY,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        let email = credentials.email;
        let password = credentials.password;
        //   database email and password chekc
        if (email === "a@gmail.com" && password === "123") {
            const user = {id: 1, name: "Mahabub", email:"a@gmail.com"}
            return user
        }else{
            return null
        }      },
    }),
  ],
};

const handler = NextAuth(autOptions);
export {handler as GET, handler as POST};
