'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');

      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
      // router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
      Logout
    </Button>
  );
};

export default Logout;
