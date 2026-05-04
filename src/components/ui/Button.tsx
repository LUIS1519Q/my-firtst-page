import React from 'react';

// TypeScript: Defining exact props
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({ onClick, children, className = '', type = 'button' }: ButtonProps) {
  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}