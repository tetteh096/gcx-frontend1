'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
];

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section - Left Side */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-20 h-20 relative flex items-center justify-center">
                <Image
                  src="/logo_black.png"
                  alt="GCX Logo"
                  width={80}
                  height={80}
                  className="object-contain w-full h-full"
                  priority
                  quality={100}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Absolute Center */}
          <div className="hidden xl:flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 px-4 py-3 text-base font-medium transition-colors rounded-lg hover:bg-green-50 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Right Side */}
          <div className="flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="hidden lg:block text-gray-700 hover:text-green-600 px-6 py-3 text-base font-medium transition-colors rounded-lg hover:bg-gray-50"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="hidden lg:block bg-green-600 text-white px-8 py-3 rounded-lg text-base font-semibold hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-green-600 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-6 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 block px-4 py-3 text-lg font-medium rounded-lg hover:bg-green-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <hr className="my-4 border-gray-200" />
            <div className="space-y-3">
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-green-600 block px-4 py-3 text-lg font-medium rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="bg-green-600 text-white block px-4 py-3 text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
