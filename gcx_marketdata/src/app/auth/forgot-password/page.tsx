import React from 'react';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Shield, Mail, Lock } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header with Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/auth/login" 
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Sign In</span>
        </Link>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Enhanced Branding & Info */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
          {/* Ghana flag-inspired accent */}
          <div className="absolute top-0 left-0 w-full h-3 bg-yellow-500"></div>
          <div className="absolute top-3 left-0 w-full h-3 bg-red-600"></div>
          
          {/* Logo with Background */}
          <div className="absolute top-8 right-8">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-center">
              <Image
                src="/logo_black.png"
                alt="GCX Logo"
                width={96}
                height={96}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center px-16 py-16 text-white">
            <div className="mb-12">
              <h1 className="text-5xl font-bold mb-6 leading-tight">Reset Your Password</h1>
              <p className="text-xl text-green-100 leading-relaxed max-w-lg">
                Don't worry! We'll help you get back into your GCX Market Data account 
                with a secure password reset process.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Secure Reset</h3>
                  <p className="text-green-100 text-sm">Email-based verification</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Quick & Easy</h3>
                  <p className="text-green-100 text-sm">Reset in minutes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Account Security</h3>
                  <p className="text-green-100 text-sm">Your data stays protected</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-lg">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Reset Password</h2>
              <p className="text-xl text-gray-600">We'll send you a secure reset link</p>
            </div>
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
