
'use client'
import { useState } from 'react';
import { AuthCard } from './AuthCard';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic
  };

  return (
    <AuthCard>
      <div>
        <h2 className="text-center text-2xl font-bold mb-8">Forgot password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 "
          >
            Send
          </button>
        </form>
      </div>
    </AuthCard>
  );
}