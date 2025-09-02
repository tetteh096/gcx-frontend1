'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Don't show navbar on auth pages or home page (home has its own LandingNavbar)
  if (pathname?.startsWith('/auth/') || pathname === '/') {
    return null;
  }
  
  return <Navbar />;
}
