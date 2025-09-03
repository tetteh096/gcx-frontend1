import api from './api';
import { 
  AlertRule, 
  Alert, 
  AlertTemplate, 
  AlertStats, 
  CreateAlertRuleRequest, 
  UpdateAlertRuleRequest,
  AlertPreferences 
} from '@/types/alerts';

export class AlertService {
  // Alert Rules Management
  static async getAlertRules(): Promise<AlertRule[]> {
    const response = await api.get<AlertRule[]>('/api/alerts/rules');
    return response.data;
  }

  static async getAlertRule(id: string): Promise<AlertRule> {
    const response = await api.get<AlertRule>(`/api/alerts/rules/${id}`);
    return response.data;
  }

  static async createAlertRule(rule: CreateAlertRuleRequest): Promise<AlertRule> {
    const response = await api.post<AlertRule>('/api/alerts/rules', rule);
    return response.data;
  }

  static async updateAlertRule(id: string, updates: UpdateAlertRuleRequest): Promise<AlertRule> {
    const response = await api.put<AlertRule>(`/api/alerts/rules/${id}`, updates);
    return response.data;
  }

  static async deleteAlertRule(id: string): Promise<void> {
    await api.delete(`/api/alerts/rules/${id}`);
  }

  static async toggleAlertRule(id: string, status: 'active' | 'inactive'): Promise<AlertRule> {
    const response = await api.patch<AlertRule>(`/api/alerts/rules/${id}/toggle`, { status });
    return response.data;
  }

  // Alerts Management
  static async getAlerts(filters?: {
    status?: string;
    type?: string;
    symbol?: string;
    region?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }): Promise<{ alerts: Alert[]; total: number; page: number; totalPages: number }> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    const response = await api.get<{ alerts: Alert[]; total: number; page: number; totalPages: number }>(`/api/alerts?${params}`);
    return response.data;
  }

  static async getAlert(id: string): Promise<Alert> {
    const response = await api.get<Alert>(`/api/alerts/${id}`);
    return response.data;
  }

  static async markAlertAsRead(id: string): Promise<Alert> {
    const response = await api.patch<Alert>(`/api/alerts/${id}/read`);
    return response.data;
  }

  static async markAllAlertsAsRead(): Promise<void> {
    await api.patch('/api/alerts/read-all');
  }

  static async deleteAlert(id: string): Promise<void> {
    await api.delete(`/api/alerts/${id}`);
  }

  // Alert Templates
  static async getAlertTemplates(): Promise<AlertTemplate[]> {
    const response = await api.get<AlertTemplate[]>('/api/alerts/templates');
    return response.data;
  }

  static async createAlertFromTemplate(templateId: string, customizations?: Partial<CreateAlertRuleRequest>): Promise<AlertRule> {
    const response = await api.post<AlertRule>(`/api/alerts/templates/${templateId}/create`, customizations);
    return response.data;
  }

  // Alert Statistics
  static async getAlertStats(): Promise<AlertStats> {
    const response = await api.get<AlertStats>('/api/alerts/stats');
    return response.data;
  }

  // Alert Preferences
  static async getAlertPreferences(): Promise<AlertPreferences> {
    const response = await api.get<AlertPreferences>('/api/alerts/preferences');
    return response.data;
  }

  static async updateAlertPreferences(preferences: Partial<AlertPreferences>): Promise<AlertPreferences> {
    const response = await api.put<AlertPreferences>('/api/alerts/preferences', preferences);
    return response.data;
  }

  // Test Alert
  static async testAlert(ruleId: string): Promise<void> {
    await api.post(`/api/alerts/rules/${ruleId}/test`);
  }

  // Bulk Operations
  static async bulkUpdateAlerts(alertIds: string[], updates: Partial<Alert>): Promise<void> {
    await api.patch('/api/alerts/bulk-update', { alertIds, updates });
  }

  static async bulkDeleteAlerts(alertIds: string[]): Promise<void> {
    await api.delete('/api/alerts/bulk-delete', { data: { alertIds } });
  }
}

export default AlertService;


