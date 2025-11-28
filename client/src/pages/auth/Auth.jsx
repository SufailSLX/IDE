import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader';

const Auth = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      console.log('Login successful:', response.data);
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (showLoader) {
    return <Loader text="Loading authentication..." />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-black/60 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <div className="h-5 w-5 rounded-md border border-white/60" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
              Dev Ai.
            </span>
          </h2>
          <p className="text-sm text-white/60">
            Let&apos;s create your new account to get started.
          </p>
        </div>

        {/* Social buttons */}
        <div className="space-y-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-3 text-sm font-medium text-white shadow-sm ring-1 ring-white/10 transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white">
            <span className="text-lg">G</span>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 text-xs text-white/40">
          <div className="h-px flex-1 bg-white/10" />
          <span>OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="space-y-1.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white focus:ring-1 focus:ring-white"
            />
          </div>
          <div className="space-y-1.5">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white focus:ring-1 focus:ring-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-70"
          >
            {loading ? 'Connecting...' : 'Connect'}
          </button>
        </form>

        {/* Footer text */}
        <div className="space-y-4 text-center text-xs text-white/50">
          <p>
            By continuing, you agree to our{' '}
            <button className="font-medium text-white hover:underline">Terms of Service</button>
            {' '} &amp;{' '}
            <button className="font-medium text-white hover:underline">Privacy Policy</button>.
          </p>
          <p>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="font-medium text-white hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
