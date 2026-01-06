import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/animations/Loader'
import {
  Eye,
  EyeOff,
  Github,
} from 'lucide-react';
import { FcGoogle } from "react-icons/fc";


const Signup = () => {
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const calculatePasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length > 7) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear specific error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5001/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Signup error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.response?.data?.message || 'Signup failed. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  if (showLoader) {
    return <Loader text="Loading sign up..." />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white px-4 py-8">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-black/60 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <div className="h-5 w-5 rounded-md border border-white/60" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Create an account
          </h2>
          <p className="text-sm text-white/60">
            Join <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text text-transparent font-medium">Dev Ai</span> today.
          </p>
        </div>

        {/* Social buttons */}
        <div className="flex gap-4 justify-center">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-sm ring-1 ring-white/10 transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white">
            <FcGoogle className="h-5 w-5" />
          </button>
          {/* <button className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-sm ring-1 ring-white/10 transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white">
            <Github className="h-5 w-5" />
          </button> */}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 text-xs text-white/40">
          <div className="h-px flex-1 bg-white/10" />
          <span>OR CONTINUE WITH EMAIL</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full rounded-full border bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-1 focus:ring-white transition-colors
                ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/15 focus:border-white'}`}
            />
            {errors.name && <p className="text-xs text-red-400 px-2">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className={`w-full rounded-full border bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-1 focus:ring-white transition-colors
                ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/15 focus:border-white'}`}
            />
            {errors.email && <p className="text-xs text-red-400 px-2">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full rounded-full border bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-1 focus:ring-white transition-colors pr-10
                  ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/15 focus:border-white'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="px-2 space-y-1">
                <div className="flex justify-between text-[10px] text-white/60 uppercase font-medium tracking-wider">
                  <span>Strength</span>
                  <span className={
                    passwordStrength <= 2 ? 'text-red-400' :
                      passwordStrength <= 3 ? 'text-yellow-400' : 'text-green-400'
                  }>{getStrengthText()}</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {errors.password && <p className="text-xs text-red-400 px-2">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className={`w-full rounded-full border bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-1 focus:ring-white transition-colors
                ${errors.confirmPassword ? 'border-red-500/50 focus:border-red-500' : 'border-white/15 focus:border-white'}`}
            />
            {errors.confirmPassword && <p className="text-xs text-red-400 px-2">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                <span>Creating account...</span>
              </>
            ) : (
              'Sign up'
            )}
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
            Already Have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="font-medium text-white hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
