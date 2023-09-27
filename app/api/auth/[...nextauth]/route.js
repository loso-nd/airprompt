import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
import { connectToDB } from "@utils/database";


//function handling our providers
const handler = NextAuth({
    //options obj
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });
            // allows us to konw which user is signed in
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({ account, profile }) {
            // serverless route, -> lamda fun
            try {
                await connectToDB();

                // check if a user already exists
                const userExists = await User.findOne({ email: profile.email });

                // if (account.provider === "google") {
                //     return profile.email_verified && profile.email.endsWith("@gmail.com")
                // }
    
                //if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s/g, "").toLowerCase(),
                        image: profile.picture
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    }
})

export { handler as GET, handler as POST };