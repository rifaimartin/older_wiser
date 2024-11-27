

'use client'
import { useState, useRef } from 'react';
import { AuthCard } from './AuthCard';
import { SocialButton } from '@/components/auth/SocialButton';
import ReCAPTCHA from "react-google-recaptcha";
import { API_BASE_URL } from '@/constants';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const captchaRef = useRef<ReCAPTCHA>(null);

   // Pastikan site key tersedia
   const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LcaT4sqAAAAAIL_cafg21PiFM-LIJnkLAhIA23_";
    console.log(RECAPTCHA_SITE_KEY + "ADAAN GA CUY")
   if (!RECAPTCHA_SITE_KEY) {
     console.error('RECAPTCHA_SITE_KEY is not defined');
   }

   console.log(RECAPTCHA_SITE_KEY+"jancok")

  const verifyCaptcha = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/captcha/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ captchaToken: token }),
      });
      
      const data = await response.json();
      return data.success;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const token = captchaRef.current?.getValue();
      if (!token) {
        setError('Please verify that you are not a robot');
        return;
      }

      const isValidCaptcha = await verifyCaptcha(token);
      if (!isValidCaptcha) {
        setError('Captcha verification failed');
        return;
      }

      // Proceed with registration
      const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await registerResponse.json();
      
      if (!data.success) {
        throw new Error(data.message);
      }

      if (!registerResponse.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Clear form and captcha
      setFormData({ email: '', name: '', password: '' });
      // captchaRef.current?.reset();
      // Show success message or redirect
      router.push('/auth/login?registered=true');
      // Redirect to login or dashboard
      window.location.href = '/auth/login';

      
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
      captchaRef.current?.reset();
    }
  };

  return (
    <AuthCard>
      <div>
        <h2 className="text-center text-2xl font-bold mb-8">Create account</h2>
        <div className="space-y-4">
          <SocialButton provider="google" onClick={() => {}} />
          <SocialButton provider="facebook" onClick={() => {}} />
        </div>
        <div className="mt-4 text-center">
          <span className="px-2 bg-white text-sm text-gray-500">or</span>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {/* ReCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={RECAPTCHA_SITE_KEY || ''}
              onChange={() => setError('')}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-600 hover:text-blue-500">
            Log in
          </a>
        </p>
      </div>
    </AuthCard>
  );
}