import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, error, fullWidth = false, className = '', ...props }) => {
  return (
    <div className={`flex flex-col mb-4 ${fullWidth ? 'w-full' : ''} ${className}`}>
      <label className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-wide">
        {label} {props.required && <span className="text-red-600">*</span>}
      </label>
      <input
        className={`border rounded-md px-3 py-2 bg-white text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-school-red/50 transition-colors ${
          error ? 'border-red-500' : 'border-gray-400'
        } disabled:bg-gray-100`}
        {...props}
      />
      {error && <span className="text-xs text-red-600 mt-1">{error}</span>}
    </div>
  );
};