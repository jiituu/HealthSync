import { loginAdmin } from "@/redux/api/adminApi";
import { loginDoctor } from "@/redux/api/doctorApi";
import { loginPatient } from "@/redux/api/patientApi";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export async function authenticateUser( password: string,role:'admin'|'patient'|'doctor',phone?: string,email?:string,): Promise<User | null> {

    let result:any = null;

    switch(role){
        case 'patient':
            result = await loginPatient(password,phone,email)
            break
        case 'doctor':
            result = await loginDoctor(password,phone,email)
            break
        case 'admin':
            result = await loginAdmin(password,phone,email)
            break
    }

    if (result) {
        return {
            id: result?.data?._id || "",
            role,
            user:result?.data
        };
    }

    return null;
}

// NextAuth configuration
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Phone (email) and Password",
            credentials: {
                phone: { label: "Phone", type: "text",required:false },
                email: { label: "Email", type: "text",required:false },
                role: { label: "Role", type: "text",required:false },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await authenticateUser(credentials?.password??'', credentials?.role as any,credentials?.phone,credentials?.email);
                
                if (!user) {
                    console.error("Invalid Credentials");
                }

                return user; // Return user data if authentication is successful
            },
        }),
    ],
    pages: {
        signIn: "/", // Custom sign-in page
        signOut: "/", // redirect when sign-out is called 
    },
    session: {
        strategy: "jwt", // Use JWT for session handling
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user && token) {
                token.lastLogin = Date(); // Store the login time in the token
                token.role = user.role;
                token.user = user.user;
                
                // Store user data in JWT token
                return { ...token, ...user };
            }
            return token; // Return the token object
        },
        async session({ session, token }) {
            session.lastLogin = token.lastLogin;
            session.role = token.role;
            session.user = token.user; 

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // Secret key for JWT signing (ensure it's set in your environment)
};