'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AuthService from '@/services/authService';
import { ResetPasswordRequest } from '@/types/auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { AlertCircle, CheckCircle, Mail } from 'lucide-react';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      await AuthService.requestPasswordReset({ email });
      setIsSubmitted(true);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6 text-white">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
              <p className="text-green-100">Password reset link sent successfully</p>
            </div>
          </div>

          {/* Success Content */}
          <div className="px-10 py-10 text-center">
            <div className="mb-8">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <Mail className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Reset Link Sent to <strong className="text-green-600">{email}</strong>
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We've sent a secure password reset link to your email address. 
                Click the link in the email to create a new password.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> The reset link will expire in 1 hour for security reasons. 
                  If you don't see the email, check your spam folder.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Back to Sign In
              </Link>
              
              <p className="text-sm text-gray-500">
                Didn't receive the email?{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Try again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
          <p className="text-green-100">Enter your email to receive a reset link</p>
        </div>

        {/* Form Content */}
        <div className="px-10 py-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="text-center mb-6">
              <p className="text-gray-600 leading-relaxed">
                Don't worry! We'll send you a secure link to reset your password. 
                This helps keep your account safe.
              </p>
            </div>

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              error={error}
              required
            />

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-5 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                isLoading={isLoading}
              >
                {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
              </Button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              Remember your password?{' '}
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

export default ForgotPasswordForm;
