import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-2">Oops! The page you are looking for does not exist.</p>
        <Link href="/doctor" className="mt-4 px-6 py-2 bg-primaryColor text-white rounded-lg hover:bg-[#85f7ff] transition">
          Go Home
        </Link>
      </div>
    );
  }
  