import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  
  // Use provided id, or create stable id from name prop
  const inputId = id || (props.name ? `input-${props.name}` : 'input-default');

  // Determine input type for password fields
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          className={cn(
            'flex h-12 w-full rounded-lg border px-4 py-3 text-base text-gray-900',
            'placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            error 
              ? 'border-red-300 bg-red-50 focus:bg-white' 
              : 'border-gray-300 bg-gray-50 hover:bg-white focus:bg-white',
            className
          )}
          {...props}
        />
        
        {/* Password Visibility Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-2">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
