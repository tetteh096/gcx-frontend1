'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { RegisterCredentials } from '@/types/auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { CheckCircle, AlertCircle } from 'lucide-react';

const RegisterForm: React.FC = () => {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    company: '',
    phone: '',
    country: '',
    time_zone: '',
  });
  const [errors, setErrors] = useState<Partial<RegisterCredentials>>({});
  const [apiError, setApiError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof RegisterCredentials]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setApiError('');
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterCredentials> = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = 'Please confirm your password';
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await register(formData);
    } catch (error: any) {
      setApiError(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Create Account</h2>
          <p className="text-green-100">Join GCX Market Data Platform</p>
        </div>

        {/* Form Content */}
        <div className="px-10 py-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-600">{apiError}</p>
              </div>
            )}

            {/* Required Fields Section */}
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
                Required Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  error={errors.name}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  error={errors.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  error={errors.password}
                  helperText="Must be at least 6 characters"
                  required
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  error={errors.password_confirmation}
                  required
                />
              </div>
            </div>

            {/* Optional Fields Section */}
            <div className="space-y-8 pt-8 border-t border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
                Additional Information (Optional)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                  label="Company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                />

                <Input
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                  label="Country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                />

                <Input
                  label="Time Zone"
                  type="text"
                  name="time_zone"
                  value={formData.time_zone}
                  onChange={handleChange}
                  placeholder="e.g., UTC+0, GMT+1"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-5 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                isLoading={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
