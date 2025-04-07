'use client';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-red-50 p-4">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-lg text-gray-700 mb-6">{error.message || 'An unexpected error occurred.'}</p>
            <button
                onClick={reset}
                className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
                Try Again
            </button>
        </div>
    );
}
