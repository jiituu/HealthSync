'use client';

interface AdminErrorProps {
    error: Error;
    reset: () => void;
}

export default function AdminError({ error, reset }: AdminErrorProps) {
    return (
        <div>
            <h1>Something went wrong in the Admin area!</h1>
            <button onClick={reset}>Try Again</button>
        </div>
    );
}
