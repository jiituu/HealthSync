
import { ReactNode } from 'react';

interface PatientLayoutProps {
    children: ReactNode;
}

export default function PatientLayout({ children }: PatientLayoutProps) {
    return (
        <div className="admin-layout">
            {/* we will import and put patient side bar component defined somewhere */}
            <main>{children}</main>
        </div>
    );
}
