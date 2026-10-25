import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authApi } from '../../lib/notesApi';
import { useAuthStore } from '../../store/authStore';
import Spinner from '../../components/Spinner';

/** Landing page after the Google callback: swaps the short-lived httpOnly cookie for the session. */
const GoogleComplete = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    authApi
      .googleSession()
      .then(({ user, token }) => {
        setAuth(user, token);
        toast.success(`Welcome, ${user.name ?? user.email}!`);
        navigate('/notes', { replace: true });
      })
      .catch(() => navigate('/login?error=google_state_mismatch', { replace: true }));
  }, [navigate, setAuth]);

  return <Spinner />;
};

export default GoogleComplete;
