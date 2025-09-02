'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, LogOut, Bell, Search, Crown, BarChart3 } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { SimpleThemeToggle } from '@/components/ui/ThemeToggle';

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <nav className="text-card-foreground shadow-lg border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95 transition-colors duration-300">
      <div className="w-full px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section - Left */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 via-green-700 to-green-800 dark:from-green-500 dark:via-green-600 dark:to-green-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <Image
                  src="/logo_black.png"
                  alt="GCX Logo"
                  width={28}
                  height={28}
                  className="object-contain filter brightness-0 invert"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-card-foreground">
                  GCX Market Data
                </h1>
                <p className="text-xs text-muted-foreground font-medium">Professional Trading Platform</p>
              </div>
            </Link>
          </div>

          {/* Search Bar - Center (Full Width) */}
          <div className="flex-1 flex justify-center px-8 lg:px-16">
            <div className="relative group w-full max-w-2xl">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                searchFocused ? 'text-primary' : 'text-muted-foreground'
              }`} />
              <input
                type="text"
                placeholder="Search commodities, markets, news, or analysis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-12 pr-6 py-3.5 text-sm border-2 border-border rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-card text-card-foreground placeholder-muted-foreground shadow-sm focus:shadow-lg"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-card-foreground rounded-full hover:bg-muted transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Side Actions - Bell & Profile */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Theme Toggle */}
            <SimpleThemeToggle />
            
            {/* Enhanced Notifications - Only show when authenticated */}
            {session && (
              <button className="relative p-3 text-muted-foreground hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 group">
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="absolute top-2 right-2 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-card animate-pulse"></span>
                <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-red-100 dark:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              </button>
            )}
            
            {/* Enhanced User Profile */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-muted transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <span className="text-sm font-semibold text-card-foreground block">{session.user?.name || 'User'}</span>
                    <div className="flex items-center space-x-1">
                      <Crown className="w-3 h-3 text-yellow-500 dark:text-yellow-400" />
                      <span className="text-xs text-muted-foreground font-medium">Premium</span>
                    </div>
                  </div>
                </button>
                
                {/* Enhanced User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-card text-card-foreground rounded-2xl shadow-2xl border border-border py-3 z-50">
                    {/* User Header */}
                    <div className="px-6 py-4 border-b border-border bg-muted/50 rounded-t-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-md">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-card-foreground truncate">{session.user?.name || 'User'}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Crown className="w-3 h-3 text-yellow-500" />
                            <p className="text-xs text-muted-foreground font-medium">Premium Member</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="px-6 py-3 border-b border-border">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-xs text-muted-foreground">Portfolio</p>
                          <p className="text-sm font-semibold text-green-600 dark:text-green-400">₵45.2M</p>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <p className="text-xs text-muted-foreground">Today's P&L</p>
                          <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">+₵2.1M</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-6 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-card-foreground transition-all duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile & Settings</span>
                      </Link>
                      <Link
                        href="/portfolio"
                        className="flex items-center space-x-3 px-6 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-card-foreground transition-all duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Portfolio</span>
                      </Link>
                      <Link
                        href="/alerts"
                        className="flex items-center space-x-3 px-6 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-card-foreground transition-all duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Bell className="w-4 h-4" />
                        <span>Alerts & Notifications</span>
                      </Link>
                    </div>
                    
                    {/* Footer Actions */}
                    <div className="border-t border-border pt-2 px-6 pb-3">
                      <button 
                        onClick={() => {
                          handleLogout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 rounded-xl transition-all duration-200 border border-red-200 dark:border-red-700 hover:border-red-300 dark:hover:border-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="text-muted-foreground hover:text-card-foreground px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-xl transition-all duration-200"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Search and Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card text-card-foreground px-4 py-6 shadow-lg">
          {/* Mobile Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search commodities, markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 text-sm border-2 border-border rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-card text-card-foreground placeholder-muted-foreground"
            />
          </div>
          
          {/* Mobile Menu Items */}
          {session ? (
            <div className="space-y-3">
              <Link
                href="/profile"
                className="flex items-center space-x-3 px-4 py-3 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-xl transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Profile & Settings</span>
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center space-x-3 px-4 py-3 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-xl transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Portfolio</span>
              </Link>
              <Link
                href="/alerts"
                className="flex items-center space-x-3 px-4 py-3 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-xl transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bell className="w-5 h-5" />
                <span>Alerts & Notifications</span>
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                href="/auth/login"
                className="flex items-center justify-center px-4 py-3 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-xl transition-all duration-200 border border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
