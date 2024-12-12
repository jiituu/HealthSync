'use client';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div>
            <h1>Something went wrong</h1>
            <button onClick={reset}>Try Again</button>
        </div>
    );
}
