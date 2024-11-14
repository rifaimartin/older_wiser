'use client'
import { useState } from 'react';
import { AuthCard } from './AuthCard';
import { SocialButton } from '@/components/auth/SocialButton';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic
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
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700"
          >
            Create account
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