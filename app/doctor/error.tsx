'use client';

interface DoctorErrorProps {
    error: Error;
    reset: () => void;
}

export default function DoctorError({ error, reset }: DoctorErrorProps) {
    return (
        <div>
            <h1>Something went wrong in the doctor area!</h1>
            <button onClick={reset}>Try Again</button>
        </div>
    );
}
