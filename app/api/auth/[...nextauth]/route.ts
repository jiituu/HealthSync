import NextAuth from "next-auth";
import { authOptions } from "../authOptions";

// Export the NextAuth handler for GET and POST requests
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
