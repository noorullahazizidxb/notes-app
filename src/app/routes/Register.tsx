import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, UserPlus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { authApi } from '../../lib/notesApi';
import { executeRecaptcha, preloadRecaptcha } from '../../lib/recaptcha';
import { useAuthStore } from '../../store/authStore';
import AuthLayout from '../../components/auth/AuthLayout';
import { PasswordField, TextField } from '../../components/auth/FormFields';
import Seo from '../../seo/Seo';
import { pageJsonLd } from '../../seo/site';

const Register = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    preloadRecaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setIsLoading(true);
    try {
      const recaptchaToken = await executeRecaptcha('register');
      const { user, token } = await authApi.register(
        email.trim(),
        password,
        name.trim() || undefined,
        recaptchaToken
      );
      setAuth(user, token);
      toast.success('Account created! Welcome aboard.');
      navigate('/notes', { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your workspace"
      subtitle="Start writing notes in seconds"
      switchPrompt="Already have an account?"
      switchLabel="Sign in"
      switchTo="/login"
    >
      <Seo title="Sign up free — DevMinds Notes | Free Note Taking App" description="Create a free DevMinds Notes account and start taking online notes in seconds. Sign up with Google or email." path="/register" jsonLd={pageJsonLd('Sign up', '/register')} />
      <form
        onSubmit={(e) => void handleSubmit(e)}
        aria-busy={isLoading}
        className="surface-card rounded-3xl p-6 sm:p-8"
      >
        <div className="space-y-4">
          <TextField
            label={
              <>
                Name <span className="font-normal text-text-muted">(optional)</span>
              </>
            }
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
          <TextField
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <PasswordField
            label="Password"
            hint="At least 8 characters"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
          />
        </div>

        <button type="submit" disabled={isLoading} className="btn btn-primary btn-lg mt-6 w-full">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <UserPlus className="h-4 w-4" aria-hidden="true" />}
          {isLoading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
