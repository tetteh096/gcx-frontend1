'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Bell, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Home, 
  PieChart, 
  Database,
  User,
  LogOut,
  Crown,
  Briefcase,
  MapPin,
  Clock
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSidebar } from '@/contexts/SidebarContext';

// Modern tooltip component
const ModernTooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-card text-card-foreground text-sm px-3 py-2 rounded-lg shadow-lg z-50 whitespace-nowrap pointer-events-none border border-border">
        {text}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-card border-l border-t border-border rotate-45"></div>
      </div>
    </div>
  );
};

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
  badge?: string;
  premium?: boolean;
  description?: string;
  category?: string;
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    description: 'Overview and insights',
    category: 'main'
  },
  {
    name: 'Market Data',
    href: '/market-data',
    icon: BarChart3,
    description: 'Real-time market information',
    category: 'data',
    children: [
      { name: 'Live Prices', href: '/market-data/prices', icon: TrendingUp, description: 'Current commodity prices' },
      { name: 'Historical Data', href: '/market-data/history', icon: Database, description: 'Past market performance' },
      { name: 'Market Overview', href: '/market-data/overview', icon: PieChart, description: 'Market summary and trends' },
    ],
  },
  {
    name: 'Trading',
    href: '/trading',
    icon: DollarSign,
    description: 'Trading tools and portfolio',
    category: 'trading',
    children: [
      { name: 'Portfolio', href: '/trading/portfolio', icon: Briefcase, description: 'Your trading positions' },
      { name: 'Orders', href: '/trading/orders', icon: FileText, description: 'Order management' },
    ],
  },
  {
    name: 'Index',
    href: '/index',
    icon: TrendingUp,
    description: 'GCX commodity index and price comparisons',
    category: 'analysis',
    children: [
      { name: 'GCX Index', href: '/index', icon: BarChart3, description: 'GCX commodity basket index' },
      { name: 'Regional Comparison', href: '/index/regional-comparison', icon: MapPin, description: 'Compare prices across regions' },
    ],
  },
  {
    name: 'Alerts',
    href: '/alerts',
    icon: Bell,
    children: [
      { name: 'Dashboard', href: '/alerts', icon: Bell },
      { name: 'Manage Rules', href: '/alerts/rules', icon: Settings },
      { name: 'History', href: '/alerts/history', icon: Clock },
    ],
  },
  {
    name: 'Pricing',
    href: '/pricing',
    icon: Crown,
    description: 'Subscription plans',
    category: 'premium'
  },
];

const Sidebar: React.FC = () => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isChildActive = (children: NavItem[]) => 
    children.some(child => pathname === child.href);

  const NavItemComponent: React.FC<{ item: NavItem; level?: number }> = ({ 
    item, 
    level = 0 
  }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.name);
    const isItemActive = isActive(item.href) || (hasChildren && isChildActive(item.children!));

    return (
      <div>
        <div
          className={`
            group relative flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer min-h-[3rem]
            ${isItemActive && item.name !== 'Alerts'
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-card-foreground hover:bg-muted/50 hover:text-primary hover:transform hover:scale-[1.01]'
            }
            ${level > 0 ? 'ml-4' : ''}
          `}
        >
          <Link 
            href={item.href} 
            className="flex items-center flex-1"
            onClick={() => hasChildren && toggleExpanded(item.name)}
          >
            <div className={`
              p-2 rounded-lg transition-all duration-200
              ${isItemActive && item.name !== 'Alerts'
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
              }
            `}>
              <item.icon className="w-4 h-4" />
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 ml-3 min-w-0">
                <div className="flex items-center">
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium block truncate leading-tight">{item.name}</span>
                    {item.description && (
                      <span className={`text-xs block truncate leading-tight ${
                        isItemActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {item.description}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-2">
                    {item.badge && (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isItemActive 
                          ? 'bg-primary-foreground/20 text-primary-foreground' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.premium && (
                      <Crown className="w-3 h-3 text-yellow-400" />
                    )}
                  </div>
                </div>
              </div>
            )}
          </Link>
          
          {hasChildren && !isCollapsed && (
            <button
              onClick={() => toggleExpanded(item.name)}
              className={`
                p-1.5 rounded-lg transition-all duration-200 ml-2
                ${isItemActive 
                  ? 'hover:bg-white/20 text-white' 
                  : 'hover:bg-muted text-muted-foreground'
                }
              `}
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`} />
            </button>
          )}
        </div>
        
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-2 ml-4 space-y-1 border-l-2 border-border pl-4">
            {item.children!.map((child) => (
              <NavItemComponent key={child.name} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`
      fixed left-0 top-20 bottom-0 bg-card text-card-foreground shadow-xl border-r border-border transition-all duration-300 ease-in-out z-40
      ${isCollapsed ? 'w-24' : 'w-72'}
    `}>
      <div className="h-full flex flex-col">
        {/* Expand button for collapsed state */}
        {isCollapsed && (
          <div className="p-4 border-b border-border">
            <div className="flex justify-center">
              <button 
                onClick={() => setIsCollapsed(false)}
                className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-card-foreground transition-colors"
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto py-6">
          <nav>
            <ul className="space-y-3 px-5">
              {navigation.map((item, index) => (
                <li key={index}>
                  {/* Special handling for Dashboard with collapse button */}
                  {item.name === 'Dashboard' && !item.children ? (
                    <div className="flex items-center gap-2">
                      <Link
                        href={item.href}
                        className={`flex-1 flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                          isActive(item.href) 
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg" 
                            : "text-card-foreground hover:bg-muted hover:text-primary"
                        } ${isCollapsed ? "justify-center" : "gap-3"}`}
                        aria-label={isCollapsed ? item.name : undefined}
                      >
                        <div className="w-5 h-5 flex-shrink-0">
                          <item.icon className="w-full h-full" />
                        </div>
                        
                        {!isCollapsed && (
                          <span className="font-medium text-sm">
                            {item.name}
                          </span>
                        )}
                        
                        {/* Active indicator */}
                        {!isCollapsed && isActive(item.href) && (
                          <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </Link>
                      
                      {/* Collapse button next to Dashboard */}
                      {!isCollapsed && (
                        <button 
                          onClick={() => setIsCollapsed(!isCollapsed)}
                          className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-card-foreground transition-colors"
                          aria-label="Collapse sidebar"
                          title="Collapse sidebar"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ) : item.children ? (
                    // Expandable menu item
                    <div>
                      <button 
                        onClick={() => toggleExpanded(item.name)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
                          isActive(item.href) || isChildActive(item.children!)
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg" 
                            : "text-card-foreground hover:bg-muted hover:text-primary"
                        } ${isCollapsed ? "justify-center" : ""}`}
                      >
                        <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-4"}`}>
                          <div className="w-6 h-6 flex-shrink-0">
                            <item.icon className="w-full h-full" />
                          </div>
                          {!isCollapsed && (
                            <span className="font-medium text-base">
                              {item.name}
                            </span>
                          )}
                        </div>
                        
                        {!isCollapsed && (
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              expandedItems.includes(item.name) ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>
                      
                      {/* Submenu */}
                      {!isCollapsed && expandedItems.includes(item.name) && (
                        <div className="overflow-hidden">
                          <ul className="ml-8 mt-2 space-y-1">
                            {item.children.map((subItem, subIndex) => (
                              <li key={`${index}-${subIndex}`}>
                                <Link 
                                  href={subItem.href}
                                  className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                                    isActive(subItem.href) 
                                      ? "bg-primary/10 text-primary font-medium" 
                                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                                  }`}
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <ModernTooltip text={item.name}>
                          <span className="sr-only">{item.name}</span>
                        </ModernTooltip>
                      )}
                    </div>
                  ) : (
                    // Regular menu item
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive(item.href) 
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg" 
                          : "text-card-foreground hover:bg-muted hover:text-primary"
                      } ${isCollapsed ? "justify-center" : "gap-4"}`}
                      aria-label={isCollapsed ? item.name : undefined}
                    >
                      <div className="w-6 h-6 flex-shrink-0">
                        <item.icon className="w-full h-full" />
                      </div>
                      
                      {!isCollapsed && (
                        <span className="font-medium text-base">
                          {item.name}
                        </span>
                      )}
                      
                      {/* Active indicator */}
                      {!isCollapsed && isActive(item.href) && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                      )}
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <ModernTooltip text={item.name}>
                          <span className="sr-only">{item.name}</span>
                        </ModernTooltip>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Fixed Footer - ALWAYS VISIBLE */}
        <div className="border-t border-border bg-card p-4">
          {!isCollapsed ? (
            <div className="space-y-3">
              {/* User Info */}
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground">Premium</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                
                {/* LOGOUT BUTTON - GUARANTEED VISIBLE */}
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors" title="Settings">
                <Settings className="w-4 h-4" />
              </button>
              <button 
                onClick={logout}
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
