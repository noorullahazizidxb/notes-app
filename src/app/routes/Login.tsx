import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, LogIn } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { authApi } from '../../lib/notesApi';
import { executeRecaptcha, preloadRecaptcha } from '../../lib/recaptcha';
import { useAuthStore } from '../../store/authStore';
import AuthLayout from '../../components/auth/AuthLayout';
import { PasswordField, TextField } from '../../components/auth/FormFields';
import Seo from '../../seo/Seo';
import { pageJsonLd } from '../../seo/site';

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    preloadRecaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    const keptEmail = email;
    const keptPassword = password;
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const recaptchaToken = await executeRecaptcha('login');
      const { user, token } = await authApi.login(email.trim(), password, recaptchaToken);
      setAuth(user, token);
      toast.success(`Welcome back, ${user.name ?? user.email}!`);
      navigate('/notes', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed.';
      setErrorMessage(message);
      setEmail(keptEmail);
      setPassword(keptPassword);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your notes workspace"
      switchPrompt="No account yet?"
      switchLabel="Create one"
      switchTo="/register"
    >
      <Seo title="Sign in — DevMinds Notes | Online Notes" description="Sign in to DevMinds Notes, the free note taking app, to open your online notes on any device. Continue with Google or email." path="/login" jsonLd={pageJsonLd('Sign in', '/login')} />
      <form
        onSubmit={(e) => void handleSubmit(e)}
        aria-busy={isLoading}
        className="surface-card rounded-3xl p-6 sm:p-8"
      >
        <div className="space-y-4">
          <TextField
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={errorMessage ? true : undefined}
          />
          <PasswordField
            label="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            aria-invalid={errorMessage ? true : undefined}
          />
        </div>

        {errorMessage ? (
          <p role="alert" className="mt-4 text-sm font-medium text-[color:var(--color-danger)]">
            {errorMessage}
          </p>
        ) : null}

        <button type="submit" disabled={isLoading} className="btn btn-primary btn-lg mt-6 w-full">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <LogIn className="h-4 w-4" aria-hidden="true" />}
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
