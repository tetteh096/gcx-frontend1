'use client';

import { useState } from 'react';
import { Bell, Plus, Edit, Trash2, Play, Pause, Search, Filter, RefreshCw, DollarSign, BarChart3, TrendingUp, AlertCircle, Eye } from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import SliderPanel from '@/components/ui/SliderPanel';
import CreateAlertForm from '@/components/alerts/CreateAlertForm';

// Mock data for demonstration
const mockRules = [
  {
    id: '1',
    name: 'Maize Price Alert',
    type: 'price_threshold',
    commodity: 'Maize',
    region: 'Greater Accra',
    condition: 'above',
    value: '1800',
    status: 'active',
    cooldown: 30,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    triggered: 3,
    lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '2',
    name: 'Rice Volume Spike',
    type: 'volume_spike',
    commodity: 'Rice',
    region: 'Ashanti',
    condition: 'above',
    value: '150',
    status: 'active',
    cooldown: 60,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    triggered: 1,
    lastTriggered: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
  },
  {
    id: '3',
    name: 'Soybeans Price Drop',
    type: 'price_change',
    commodity: 'Soybeans',
    region: 'Western',
    condition: 'below',
    value: '8',
    status: 'paused',
    cooldown: 15,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    triggered: 2,
    lastTriggered: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  }
];

export default function AlertRulesPage() {
  const { isCollapsed } = useSidebar();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<any>(null);
  const [rules, setRules] = useState(mockRules);

  const filteredRules = rules.filter(rule => 
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'price_threshold': return <DollarSign className="w-5 h-5" />;
      case 'volume_spike': return <BarChart3 className="w-5 h-5" />;
      case 'price_change': return <TrendingUp className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
    }
  };

  const handleToggleRule = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, status: newStatus } : rule
    ));
    console.log(`Toggled rule ${id} from ${currentStatus} to ${newStatus}`);
  };

  const handleDeleteRule = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
    setDeleteConfirm(null);
    console.log(`Deleted rule ${id}`);
  };

  const handleEditRule = (rule: any) => {
    setEditingRule(rule);
    setIsEditModalOpen(true);
  };

  const handleBulkAction = (action: 'activate' | 'pause' | 'delete') => {
    if (action === 'delete') {
      setRules(prev => prev.filter(rule => !selectedRules.includes(rule.id)));
    } else {
      const newStatus = action === 'activate' ? 'active' : 'paused';
      setRules(prev => prev.map(rule => 
        selectedRules.includes(rule.id) ? { ...rule, status: newStatus } : rule
      ));
    }
    setSelectedRules([]);
    console.log(`Bulk ${action} on rules:`, selectedRules);
  };

  const handleSelectRule = (ruleId: string) => {
    setSelectedRules(prev => 
      prev.includes(ruleId) 
        ? prev.filter(id => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRules.length === filteredRules.length) {
      setSelectedRules([]);
    } else {
      setSelectedRules(filteredRules.map(rule => rule.id));
    }
  };

  const generateRuleDescription = (rule: any) => {
    switch (rule.type) {
      case 'price_threshold':
        return `Alert when ${rule.commodity} price goes ${rule.condition} GH₵${rule.value}`;
      case 'volume_spike':
        return `Alert when ${rule.commodity} volume increases by ${rule.value}%`;
      case 'price_change':
        return `Alert when ${rule.commodity} price changes by ${rule.value}%`;
      default:
        return `Alert for ${rule.commodity} in ${rule.region}`;
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
                    Alert Rules
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Manage your market alert rules and settings
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-all duration-200 font-medium text-sm">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all duration-200 font-medium text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Alert
                  </button>
                </div>
              </div>
            </div>
            {/* Bulk Actions */}
            {selectedRules.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <p className="text-blue-800 font-medium">
                    {selectedRules.length} rule{selectedRules.length !== 1 ? 's' : ''} selected
                  </p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleBulkAction('activate')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-md transition-all duration-200"
                    >
                      <Play className="w-3 h-3" />
                      Activate All
                    </button>
                    <button 
                      onClick={() => handleBulkAction('pause')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded-md transition-all duration-200"
                    >
                      <Pause className="w-3 h-3" />
                      Pause All
                    </button>
                    <button 
                      onClick={() => handleBulkAction('delete')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-md transition-all duration-200"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete All
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
                placeholder="Search rules by name, type, commodity, or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-all duration-200 font-medium text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md transition-all duration-200 font-medium text-sm">
              Clear
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900">
                <option value="">All Types</option>
                <option value="price_threshold">Price Threshold</option>
                <option value="volume_spike">Volume Spike</option>
                <option value="price_change">Price Change</option>
              </select>

              <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="inactive">Inactive</option>
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

        {/* Rules List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Alert Rules ({filteredRules.length})
              </h2>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedRules.length === filteredRules.length && filteredRules.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  Select All
                </label>
              </div>
            </div>
          </div>

          {filteredRules.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No alert rules yet
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You haven't created any alert rules yet. Create your first rule to start monitoring the market!
              </p>
              <Link
                href="/alerts/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Your First Rule
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredRules.map((rule) => (
                <div key={rule.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <input
                          type="checkbox"
                          checked={selectedRules.includes(rule.id)}
                          onChange={() => handleSelectRule(rule.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(rule.type)}
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          {getTypeLabel(rule.type)}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(rule.status)}`}>
                          {rule.status === 'active' ? '🟢 Active' : rule.status === 'paused' ? '🟡 Paused' : '⚫ Inactive'}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {rule.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-3">
                        {generateRuleDescription(rule)}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Created: {rule.createdAt.toLocaleDateString()}</span>
                        <span>Cooldown: {rule.cooldown} minutes</span>
                        <span>Triggered: {rule.triggered} times</span>
                        {rule.lastTriggered && (
                          <span>Last: {rule.lastTriggered.toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleRule(rule.id, rule.status)}
                        className={`p-2 rounded-md text-xs font-medium transition-all duration-200 ${
                          rule.status === 'active'
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                        title={rule.status === 'active' ? 'Pause Rule' : 'Activate Rule'}
                      >
                        {rule.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      </button>
                      <button
                        onClick={() => handleEditRule(rule)}
                        className="p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md text-xs font-medium transition-all duration-200"
                        title="Edit Rule"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(rule.id)}
                        className="p-2 bg-red-500 text-white hover:bg-red-600 rounded-md text-xs font-medium transition-all duration-200"
                        title="Delete Rule"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 backdrop-blur-[1px] z-50 transition-opacity duration-300">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 border border-gray-200 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delete Alert Rule
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this alert rule? This action cannot be undone.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-all duration-200 font-medium border border-gray-300 shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteRule(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-semibold border border-red-600 shadow-sm shadow-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Edit Alert Slider Panel */}
      <SliderPanel
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRule(null);
        }}
        title="Edit Alert Rule"
        size="lg"
      >
        <CreateAlertForm
          initialData={editingRule}
          onSuccess={() => {
            setIsEditModalOpen(false);
            setEditingRule(null);
            // You can add a success notification here
          }}
        />
      </SliderPanel>
        </div>
      </div>
    </ProtectedRoute>
  );
}
