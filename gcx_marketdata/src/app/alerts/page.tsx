'use client';

import { useState } from 'react';
import { Bell, Plus, TrendingUp, DollarSign, BarChart3, AlertTriangle, Clock, CheckCircle, Settings } from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import SliderPanel from '@/components/ui/SliderPanel';
import CreateAlertForm from '@/components/alerts/CreateAlertForm';

// Mock data for demonstration
const mockAlerts = [
  {
    id: '1',
    type: 'price_threshold',
    commodity: 'Maize',
    region: 'Greater Accra',
    message: 'Maize price exceeded GH₵1,800 threshold',
    severity: 'high',
    status: 'active',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    triggered: 3
  },
  {
    id: '2',
    type: 'volume_spike',
    commodity: 'Rice',
    region: 'Ashanti',
    message: 'Trading volume increased by 150%',
    severity: 'medium',
    status: 'active',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    triggered: 1
  },
  {
    id: '3',
    type: 'price_change',
    commodity: 'Soybeans',
    region: 'Western',
    message: 'Price dropped by 8% in the last hour',
    severity: 'critical',
    status: 'triggered',
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    triggered: 1
  }
];

const alertStats = {
  total: 12,
  active: 8,
  triggered: 3,
  critical: 1
};

export default function AlertsDashboard() {
  const { isCollapsed } = useSidebar();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'price_threshold': return <DollarSign className="w-4 h-4" />;
      case 'volume_spike': return <BarChart3 className="w-4 h-4" />;
      case 'price_change': return <TrendingUp className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'price_threshold': return 'Price Threshold';
      case 'volume_spike': return 'Volume Spike';
      case 'price_change': return 'Price Change';
      default: return 'Alert';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        
        <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
          <div className="w-full px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Bell className="w-8 h-8 text-blue-600" />
                    Market Alerts
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Monitor market movements and get notified of important changes
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Create Alert
                  </button>
                </div>
              </div>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                    <p className="text-3xl font-bold text-gray-900">{alertStats.total}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Bell className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active</p>
                    <p className="text-3xl font-bold text-green-600">{alertStats.active}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Triggered</p>
                    <p className="text-3xl font-bold text-orange-600">{alertStats.triggered}</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Critical</p>
                    <p className="text-3xl font-bold text-red-600">{alertStats.critical}</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 mb-8 shadow-sm">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Quick Actions
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Set up alerts to stay informed about market movements and trading opportunities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border border-blue-200 transition-all duration-200 hover:shadow-lg w-full text-left"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                      Create Alert
                    </h3>
                    <p className="text-blue-700">
                      Set up custom price, volume, or pattern alerts
                    </p>
                  </div>
                </button>

                <Link
                  href="/alerts/rules"
                  className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl border border-purple-200 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Settings className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-purple-900 mb-2">
                      Manage Rules
                    </h3>
                    <p className="text-purple-700">
                      View and manage your existing alert rules
                    </p>
                  </div>
                </Link>

                <Link
                  href="/alerts/history"
                  className="group p-6 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl border border-green-200 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-900 mb-2">
                      View History
                    </h3>
                    <p className="text-green-700">
                      Check past alerts and their performance
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Alerts
                  </h2>
                  <Link
                    href="/alerts/history"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All →
                  </Link>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getTypeIcon(alert.type)}
                          </div>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            {getTypeLabel(alert.type)}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {alert.commodity} - {alert.region}
                        </h3>
                        
                        <p className="text-gray-600 mb-3">
                          {alert.message}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Created: {alert.createdAt.toLocaleDateString()}</span>
                          <span>Triggered: {alert.triggered} times</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          alert.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {alert.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Alert Slider Panel */}
      <SliderPanel
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Alert"
        size="lg"
      >
        <CreateAlertForm
          onSuccess={() => {
            setIsCreateModalOpen(false);
            // You can add a success notification here
          }}
        />
      </SliderPanel>
    </ProtectedRoute>
  );
}
