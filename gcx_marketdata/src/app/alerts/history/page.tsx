'use client';

import { useState } from 'react';
import { Bell, Search, Filter, RefreshCw, Calendar, Download, Eye, CheckCircle, AlertTriangle, DollarSign, BarChart3, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';

// Mock data for demonstration
const mockAlertHistory = [
  {
    id: '1',
    type: 'price_threshold',
    commodity: 'Maize',
    region: 'Greater Accra',
    message: 'Maize price exceeded GH₵1,800 threshold',
    severity: 'high',
    status: 'delivered',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    deliveredAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30 * 1000), // 30 seconds later
    readAt: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
  },
  {
    id: '2',
    type: 'volume_spike',
    commodity: 'Rice',
    region: 'Ashanti',
    message: 'Trading volume increased by 150%',
    severity: 'medium',
    status: 'delivered',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    deliveredAt: new Date(Date.now() - 4 * 60 * 60 * 1000 + 15 * 1000), // 15 seconds later
    readAt: null
  },
  {
    id: '3',
    type: 'price_change',
    commodity: 'Soybeans',
    region: 'Western',
    message: 'Price dropped by 8% in the last hour',
    severity: 'critical',
    status: 'failed',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    deliveredAt: null,
    readAt: null
  },
  {
    id: '4',
    type: 'price_threshold',
    commodity: 'Sorghum',
    region: 'Northern',
    message: 'Sorghum price fell below GH₵1,200 threshold',
    severity: 'medium',
    status: 'delivered',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    deliveredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 45 * 1000), // 45 seconds later
    readAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 1000) // 2 minutes later
  }
];

export default function AlertHistoryPage() {
  const { isCollapsed } = useSidebar();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAlerts = mockAlertHistory.filter(alert => 
    alert.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      case 'read': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
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

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const handleSelectAlert = (alertId: string) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAlerts.length === paginatedAlerts.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(paginatedAlerts.map(alert => alert.id));
    }
  };

  const handleMarkAsRead = (alertId: string) => {
    // Simulate API call
    console.log(`Marking alert ${alertId} as read`);
  };

  const handleExport = () => {
    // Simulate export functionality
    console.log('Exporting alerts:', selectedAlerts.length > 0 ? selectedAlerts : 'all');
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
                    Alert History
                  </h1>
                  <p className="text-gray-600 mt-2">
                    View and manage your alert history and notifications
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                  <button
                    onClick={handleExport}
                    disabled={selectedAlerts.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>
            {/* Bulk Actions */}
            {selectedAlerts.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <p className="text-blue-800 font-medium">
                    {selectedAlerts.length} alert{selectedAlerts.length !== 1 ? 's' : ''} selected
                  </p>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      Mark as Read
                    </button>
                    <button
                      onClick={handleExport}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export Selected
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts by commodity, region, message, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
              Clear
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900">
                <option value="">All Types</option>
                <option value="price_threshold">Price Threshold</option>
                <option value="volume_spike">Volume Spike</option>
                <option value="price_change">Price Change</option>
              </select>

              <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900">
                <option value="">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="sent">Sent</option>
                <option value="failed">Failed</option>
                <option value="read">Read</option>
              </select>

              <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900">
                <option value="">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900">
                <option value="">All Regions</option>
                <option value="greater-accra">Greater Accra</option>
                <option value="ashanti">Ashanti</option>
                <option value="western">Western</option>
                <option value="central">Central</option>
              </select>
            </div>
          )}
        </div>

        {/* Alerts Table */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Alert History ({filteredAlerts.length})
              </h2>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedAlerts.length === paginatedAlerts.length && paginatedAlerts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  Select All
                </label>
              </div>
            </div>
          </div>

          {paginatedAlerts.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No alerts found
              </h3>
              <p className="text-gray-600">
                No alerts match your current search criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedAlerts.length === paginatedAlerts.length && paginatedAlerts.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Alert
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type & Severity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedAlerts.map((alert) => (
                      <tr key={alert.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedAlerts.includes(alert.id)}
                            onChange={() => handleSelectAlert(alert.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {alert.commodity} - {alert.region}
                            </div>
                            <div className="text-sm text-gray-600">
                              {alert.message}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                              <span className="mr-1">{getTypeIcon(alert.type)}</span>
                              {getTypeLabel(alert.type)}
                            </span>
                            <br />
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatTime(alert.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {alert.status === 'delivered' && !alert.readAt && (
                              <button
                                onClick={() => handleMarkAsRead(alert.id)}
                                className="px-2 py-1 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 rounded text-xs transition-colors"
                                title="Mark as read"
                              >
                                <CheckCircle className="w-3 h-3" />
                              </button>
                            )}
                            <Link
                              href={`/alerts/${alert.id}`}
                              className="px-2 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded text-xs transition-colors"
                              title="View details"
                            >
                              <Eye className="w-3 h-3" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAlerts.length)} of {filteredAlerts.length} results
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 text-sm rounded transition-colors ${
                            page === currentPage
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
