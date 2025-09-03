import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { AlertService } from '@/services/alertService';
import { 
  AlertRule, 
  Alert, 
  AlertTemplate, 
  AlertStats, 
  CreateAlertRuleRequest, 
  UpdateAlertRuleRequest,
  AlertPreferences 
} from '@/types/alerts';

export function useAlerts() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Alert Rules
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [selectedRule, setSelectedRule] = useState<AlertRule | null>(null);
  
  // Alerts
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertStats, setAlertStats] = useState<AlertStats | null>(null);
  const [alertsPagination, setAlertsPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
    limit: 20
  });
  
  // Templates & Preferences
  const [templates, setTemplates] = useState<AlertTemplate[]>([]);
  const [preferences, setPreferences] = useState<AlertPreferences | null>(null);
  
  // Filters
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    symbol: '',
    region: '',
    dateFrom: '',
    dateTo: ''
  });

  // Load Alert Rules
  const loadAlertRules = useCallback(async () => {
    if (!session) return;
    
    try {
      setLoading(true);
      setError(null);
      const rules = await AlertService.getAlertRules();
      setAlertRules(rules);
    } catch (err) {
      setError('Failed to load alert rules');
      console.error('Error loading alert rules:', err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Load Alerts
  const loadAlerts = useCallback(async (page = 1) => {
    if (!session) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await AlertService.getAlerts({
        ...filters,
        page,
        limit: alertsPagination.limit
      });
      setAlerts(result.alerts);
      setAlertsPagination({
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
        limit: alertsPagination.limit
      });
    } catch (err) {
      setError('Failed to load alerts');
      console.error('Error loading alerts:', err);
    } finally {
      setLoading(false);
    }
  }, [session, filters, alertsPagination.limit]);

  // Load Alert Stats
  const loadAlertStats = useCallback(async () => {
    if (!session) return;
    
    try {
      const stats = await AlertService.getAlertStats();
      setAlertStats(stats);
    } catch (err) {
      console.error('Error loading alert stats:', err);
    }
  }, [session]);

  // Load Templates
  const loadTemplates = useCallback(async () => {
    if (!session) return;
    
    try {
      const templateList = await AlertService.getAlertTemplates();
      setTemplates(templateList);
    } catch (err) {
      console.error('Error loading templates:', err);
    }
  }, [session]);

  // Load Preferences
  const loadPreferences = useCallback(async () => {
    if (!session) return;
    
    try {
      const prefs = await AlertService.getAlertPreferences();
      setPreferences(prefs);
    } catch (err) {
      console.error('Error loading preferences:', err);
    }
  }, [session]);

  // Create Alert Rule
  const createAlertRule = useCallback(async (rule: CreateAlertRuleRequest) => {
    if (!session) throw new Error('Not authenticated');
    
    try {
      setLoading(true);
      setError(null);
      const newRule = await AlertService.createAlertRule(rule);
      setAlertRules(prev => [...prev, newRule]);
      return newRule;
    } catch (err) {
      setError('Failed to create alert rule');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Update Alert Rule
  const updateAlertRule = useCallback(async (id: string, updates: UpdateAlertRuleRequest) => {
    if (!session) throw new Error('Not authenticated');
    
    try {
      setLoading(true);
      setError(null);
      const updatedRule = await AlertService.updateAlertRule(id, updates);
      setAlertRules(prev => prev.map(rule => rule.id === id ? updatedRule : rule));
      if (selectedRule?.id === id) {
        setSelectedRule(updatedRule);
      }
      return updatedRule;
    } catch (err) {
      setError('Failed to update alert rule');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session, selectedRule]);

  // Delete Alert Rule
  const deleteAlertRule = useCallback(async (id: string) => {
    if (!session) throw new Error('Not authenticated');
    
    try {
      setLoading(true);
      setError(null);
      await AlertService.deleteAlertRule(id);
      setAlertRules(prev => prev.filter(rule => rule.id !== id));
      if (selectedRule?.id === id) {
        setSelectedRule(null);
      }
    } catch (err) {
      setError('Failed to delete alert rule');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session, selectedRule]);

  // Toggle Alert Rule
  const toggleAlertRule = useCallback(async (id: string, status: 'active' | 'inactive') => {
    if (!session) throw new Error('Not authenticated');
    
    try {
      const updatedRule = await AlertService.toggleAlertRule(id, status);
      setAlertRules(prev => prev.map(rule => rule.id === id ? updatedRule : rule));
      if (selectedRule?.id === id) {
        setSelectedRule(updatedRule);
      }
      return updatedRule;
    } catch (err) {
      setError('Failed to toggle alert rule');
      throw err;
    }
  }, [session, selectedRule]);

  // Mark Alert as Read
  const markAlertAsRead = useCallback(async (id: string) => {
    if (!session) return;
    
    try {
      const updatedAlert = await AlertService.markAlertAsRead(id);
      setAlerts(prev => prev.map(alert => alert.id === id ? updatedAlert : alert));
      // Refresh stats after marking as read
      loadAlertStats();
    } catch (err) {
      console.error('Error marking alert as read:', err);
    }
  }, [session, loadAlertStats]);

  // Mark All Alerts as Read
  const markAllAlertsAsRead = useCallback(async () => {
    if (!session) return;
    
    try {
      await AlertService.markAllAlertsAsRead();
      setAlerts(prev => prev.map(alert => ({ ...alert, status: 'read' as const })));
      loadAlertStats();
    } catch (err) {
      console.error('Error marking all alerts as read:', err);
    }
  }, [session, loadAlertStats]);

  // Update Preferences
  const updatePreferences = useCallback(async (updates: Partial<AlertPreferences>) => {
    if (!session) throw new Error('Not authenticated');
    
    try {
      const updatedPrefs = await AlertService.updateAlertPreferences(updates);
      setPreferences(updatedPrefs);
      return updatedPrefs;
    } catch (err) {
      setError('Failed to update preferences');
      throw err;
    }
  }, [session]);

  // Test Alert Rule
  const testAlertRule = useCallback(async (id: string) => {
    if (!session) throw new Error('Not authenticated');
    
    try {
      await AlertService.testAlert(id);
    } catch (err) {
      setError('Failed to test alert rule');
      throw err;
    }
  }, [session]);

  // Update Filters
  const updateFilters = useCallback((newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear Filters
  const clearFilters = useCallback(() => {
    setFilters({
      status: '',
      type: '',
      symbol: '',
      region: '',
      dateFrom: '',
      dateTo: ''
    });
  }, []);

  // Load initial data
  useEffect(() => {
    if (session) {
      loadAlertRules();
      loadAlerts();
      loadAlertStats();
      loadTemplates();
      loadPreferences();
    }
  }, [session, loadAlertRules, loadAlerts, loadAlertStats, loadTemplates, loadPreferences]);

  // Reload alerts when filters change
  useEffect(() => {
    if (session) {
      loadAlerts(1);
    }
  }, [filters, session, loadAlerts]);

  return {
    // State
    loading,
    error,
    alertRules,
    selectedRule,
    alerts,
    alertStats,
    alertsPagination,
    templates,
    preferences,
    filters,
    
    // Actions
    loadAlertRules,
    loadAlerts,
    loadAlertStats,
    loadTemplates,
    loadPreferences,
    createAlertRule,
    updateAlertRule,
    deleteAlertRule,
    toggleAlertRule,
    markAlertAsRead,
    markAllAlertsAsRead,
    updatePreferences,
    testAlertRule,
    updateFilters,
    clearFilters,
    setSelectedRule,
    setError
  };
}


