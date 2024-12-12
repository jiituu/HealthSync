'use client';

interface PatientErrorProps {
    error: Error;
    reset: () => void;
}

export default function PatientError({ error, reset }: PatientErrorProps) {
    return (
        <div>
            <h1>Something went wrong in the Patient area!</h1>
            <button onClick={reset}>Try Again</button>
        </div>
    );
}
