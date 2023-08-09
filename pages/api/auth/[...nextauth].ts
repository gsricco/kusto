import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { Path } from "common/enums/path";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "assets/database/connectDB";
import { Adapter } from "next-auth/adapters";
import connectMongo from "assets/database/conn";
import Users from "assets/model/Schema";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    })
    //     CredentialsProvider({
    //       name:'Credentials',
    //       authorize(credentials, req) {
    //         connectMongo().catch(error=>{error:"Connection Failed...!"})
    // // проверка сущевтования пользователя
    //         const result = Users.findOne({email: credentials?.email})
    //         if (!result) {
    //           throw new Error('No user Found with Email Please Sign Up..!')
    //         }

    //         // сравнение

    //       },
    //     })
  ],

  // pages: {
  //   signIn: //ссылка на кастомную страницу
  // },
  adapter: MongoDBAdapter(clientPromise) as Adapter, // если входить в github, то выходит ошибка

  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      console.log(token);
      return token;
    }
  }
};

export default NextAuth(authOptions);
