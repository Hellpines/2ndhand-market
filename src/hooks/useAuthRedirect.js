import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuthRedirect({ user, redirectTo = '/login' }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);

  return { isRequiredAuthenticated: Boolean(user) };
}
