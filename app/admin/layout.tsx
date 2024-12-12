
import { ReactNode } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="admin-layout">
            {/* we will import and put admin side bar component defined somewhere */}
            <main>{children}</main>
        </div>
    );
}
