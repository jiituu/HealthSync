
import { ReactNode } from 'react';

interface DoctorLayoutProps {
    children: ReactNode;
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
    return (
        <div className="admin-layout">
            {/* we will import and put doctor side bar component defined somewhere */}
            <main>{children}</main>
        </div>
    );
}
