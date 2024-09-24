import React from 'react';

interface ActivityButtonProps {
  label: string;
}

const ActivityButton: React.FC<ActivityButtonProps> = ({ label }) => (
  <button className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-full transition duration-300">
    {label}
  </button>
);

export default ActivityButton;