import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function ProtectedRoute({ children }) {
  const [, setLocation] = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLocation('/login');
        return;
      } else {
        setIsAuthorized(true);
      }
    };

    void verifyAuth();
  }, [setLocation]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
