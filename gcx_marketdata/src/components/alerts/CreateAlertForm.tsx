'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, DollarSign, BarChart3, TrendingUp, AlertTriangle, Bell } from 'lucide-react';

interface CreateAlertFormProps {
  onSuccess?: () => void;
  initialData?: any;
}

export default function CreateAlertForm({ onSuccess, initialData }: CreateAlertFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || 'price_threshold',
    commodity: initialData?.commodity?.toLowerCase() || '',
    regions: initialData?.region ? [initialData.region.toLowerCase().replace(' ', '-')] : [],
    orderType: initialData?.orderType || 'buy',
    condition: initialData?.condition || 'above',
    value: initialData?.value || '',
    quality: initialData?.quality || '1',
    quantity: initialData?.quantity || '',
    cooldown: initialData?.cooldown?.toString() || '30',
    channels: initialData?.channels || ['email', 'sms']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const alertTypes = [
    {
      id: 'price_threshold',
      name: 'Price Threshold',
      description: 'Get notified when price goes above or below a certain level',
      icon: DollarSign,
      color: 'bg-blue-500'
    },
    {
      id: 'volume_spike',
      name: 'Volume Spike',
      description: 'Alert when trading volume increases significantly',
      icon: BarChart3,
      color: 'bg-green-500'
    },
    {
      id: 'price_change',
      name: 'Price Change',
      description: 'Notify when price changes by a certain percentage',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      id: 'order_alert',
      name: 'Order Alert',
      description: 'Get notified when buy/sell orders are placed for commodities',
      icon: Bell,
      color: 'bg-orange-500'
    }
  ];

  const commodities = [
    { value: 'maize', label: 'Maize' },
    { value: 'rice', label: 'Rice' },
    { value: 'soybeans', label: 'Soybeans' },
    { value: 'sorghum', label: 'Sorghum' }
  ];

  const regions = [
    { value: 'greater-accra', label: 'Greater Accra' },
    { value: 'ashanti', label: 'Ashanti' },
    { value: 'western', label: 'Western' },
    { value: 'central', label: 'Central' },
    { value: 'eastern', label: 'Eastern' },
    { value: 'volta', label: 'Volta' },
    { value: 'northern', label: 'Northern' },
    { value: 'upper-east', label: 'Upper East' },
    { value: 'upper-west', label: 'Upper West' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to create alert:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChannelChange = (channel: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        channels: [...prev.channels, channel]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        channels: prev.channels.filter(c => c !== channel)
      }));
    }
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        regions: [...prev.regions, region]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        regions: prev.regions.filter(r => r !== region)
      }));
    }
  };

  const handleSelectAllRegions = () => {
    const allRegions = regions.map(r => r.value);
    setFormData(prev => ({
      ...prev,
      regions: prev.regions.length === allRegions.length ? [] : allRegions
    }));
  };

  return (
    <div className="p-6">
      {/* Alert Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Choose Alert Type
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {alertTypes.map((type) => (
            <label
              key={type.id}
              className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all ${
                formData.type === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <input
                type="radio"
                name="type"
                value={type.id}
                checked={formData.type === type.id}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="sr-only"
              />
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${type.color} text-white`}>
                  <type.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {type.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {type.description}
                  </div>
                </div>
                {formData.type === type.id && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Alert Configuration Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {initialData ? 'Edit Alert Rule' : 'Configure Your Alert'}
        </h3>

        <div className="space-y-6">
          {/* Alert Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alert Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Maize Price Alert"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Commodity Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commodity
            </label>
            <select
              value={formData.commodity}
              onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a commodity</option>
              {commodities.map((commodity) => (
                <option key={commodity.value} value={commodity.value}>
                  {commodity.label}
                </option>
              ))}
            </select>
          </div>

          {/* Region Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Regions
              </label>
              <button
                type="button"
                onClick={handleSelectAllRegions}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {formData.regions.length === regions.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 border border-gray-300 rounded-lg bg-gray-50">
              {regions.map((region) => (
                <label key={region.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.regions.includes(region.value)}
                    onChange={(e) => handleRegionChange(region.value, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900">{region.label}</span>
                </label>
              ))}
            </div>
            {formData.regions.length === 0 && (
              <p className="text-sm text-red-600 mt-1">Please select at least one region</p>
            )}
          </div>

          {/* Condition Configuration */}
          {formData.type === 'price_threshold' && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Price Condition
              </h4>
              <div className="flex items-center gap-3">
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="above">Above</option>
                  <option value="below">Below</option>
                  <option value="above_or_equal">Above or Equal</option>
                  <option value="below_or_equal">Below or Equal</option>
                </select>
                <span className="text-gray-600">GH₵</span>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          {formData.type === 'price_change' && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Price Change Condition
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-gray-600">Alert when price changes by</span>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="5"
                  step="0.1"
                  min="0"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <span className="text-gray-600">%</span>
              </div>
            </div>
          )}

          {formData.type === 'volume_spike' && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Volume Spike Condition
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-gray-600">Alert when volume increases by</span>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="100"
                  step="1"
                  min="0"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <span className="text-gray-600">%</span>
              </div>
            </div>
          )}

          {formData.type === 'order_alert' && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Order Alert Configuration
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Type
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="orderType"
                        value="buy"
                        checked={formData.orderType === 'buy'}
                        onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-900">Buy Orders</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="orderType"
                        value="sell"
                        checked={formData.orderType === 'sell'}
                        onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-900">Sell Orders</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="orderType"
                        value="both"
                        checked={formData.orderType === 'both'}
                        onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-900">Both</span>
                    </label>
                  </div>
                </div>
                              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Order Size (MT)
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="1000"
                  step="1"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Only alert for orders above this size in metric tons</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality Grade
                </label>
                <select
                  value={formData.quality}
                  onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">Grade 1 (Premium)</option>
                  <option value="2">Grade 2 (Good)</option>
                  <option value="3">Grade 3 (Standard)</option>
                  <option value="4">Grade 4 (Fair)</option>
                  <option value="5">Grade 5 (Basic)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Select the quality grade for the commodity</p>
              </div>
              </div>
            </div>
          )}

          {/* Cooldown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cooldown Period
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={formData.cooldown}
                onChange={(e) => setFormData({ ...formData, cooldown: e.target.value })}
                min="1"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <span className="text-gray-600">minutes</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Minimum time between alerts to avoid spam
            </p>
          </div>

          {/* Notification Channels */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Notification Channels
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.channels.includes('email')}
                  onChange={(e) => handleChannelChange('email', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-gray-900">Email notifications</span>
                </div>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.channels.includes('sms')}
                  onChange={(e) => handleChannelChange('sms', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="text-gray-900">SMS notifications</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {initialData ? 'Updating Alert...' : 'Creating Alert...'}
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {initialData ? 'Update Alert Rule' : 'Create Alert Rule'}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Example Alert */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">
              Example Alerts
            </h4>
            <div className="text-sm text-blue-700 mt-1 space-y-1">
              <p>• "Alert me when Maize price in Greater Accra goes above GH₵1,800"</p>
              <p>• "Notify me when buy orders for Rice above 1000MT (Grade 3) are placed in Ashanti"</p>
              <p>• "Alert when Maize volume increases by 150% in Western region"</p>
            </div>
            <p className="text-sm text-blue-600 mt-2">
              These alerts help traders stay informed about market movements and trading opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
