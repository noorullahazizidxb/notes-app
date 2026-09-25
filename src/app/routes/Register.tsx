import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NotebookPen, Eye, EyeOff, UserPlus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { authApi } from '../../lib/notesApi';
import { useAuthStore } from '../../store/authStore';

const Register = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setIsLoading(true);
    try {
      const { user, token } = await authApi.register(
        email.trim(),
        password,
        name.trim() || undefined
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
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--color-accent)]/10">
            <NotebookPen className="h-7 w-7 text-[color:var(--color-accent)]" />
          </div>
          <h1 className="font-display text-3xl text-text">Create your workspace</h1>
          <p className="mt-1 text-sm text-text/65">Start writing notes in seconds</p>
        </div>

        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="rounded-3xl border border-border bg-[color:var(--color-paper)] p-8 shadow-sm"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text">
                Name <span className="text-text/45">(optional)</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className="w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text/40 focus:border-[color:var(--color-accent)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text/40 focus:border-[color:var(--color-accent)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-text">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 pr-10 text-sm text-text placeholder:text-text/40 focus:border-[color:var(--color-accent)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text/45 hover:text-text"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1 text-xs text-text/45">At least 8 characters</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            {isLoading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-text/65">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[color:var(--color-accent)] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
