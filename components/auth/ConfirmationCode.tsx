import { useState } from 'react';
import { AuthCard } from './AuthCard';

export default function ConfirmationCode() {
  const [code, setCode] = useState(['', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle confirmation code verification
  };

  return (
    <AuthCard>
      <div>
        <h2 className="text-center text-2xl font-bold mb-8">
          Enter confirmation code
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center space-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Next
          </button>
        </form>
      </div>
    </AuthCard>
  );
}