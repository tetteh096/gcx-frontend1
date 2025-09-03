export interface AlertRule {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: 'threshold' | 'pattern' | 'volume' | 'price_change';
  status: 'active' | 'inactive' | 'paused';
  conditions: AlertCondition[];
  channels: AlertChannel[];
  cooldown: number; // minutes
  createdAt: string;
  updatedAt: string;
}

export interface AlertCondition {
  id: string;
  field: 'price' | 'volume' | 'change_percent' | 'trade_count';
  operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq';
  value: number;
  symbol?: string; // specific commodity
  region?: string; // specific region
  timeframe?: number; // minutes for pattern alerts
}

export interface AlertChannel {
  id: string;
  type: 'in_app' | 'email' | 'sms' | 'push';
  enabled: boolean;
  config?: {
    email?: string;
    phone?: string;
    push_token?: string;
  };
}

export interface Alert {
  id: string;
  ruleId: string;
  ruleName: string;
  userId: string;
  symbol: string;
  commodity: string;
  region: string;
  type: 'threshold' | 'pattern' | 'volume' | 'price_change';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  data: {
    currentPrice?: number;
    previousPrice?: number;
    changePercent?: number;
    volume?: number;
    tradeCount?: number;
    threshold?: number;
  };
  status: 'sent' | 'delivered' | 'failed' | 'read';
  channels: string[];
  createdAt: string;
  readAt?: string;
  deliveredAt?: string;
}

export interface AlertTemplate {
  id: string;
  name: string;
  description: string;
  type: 'threshold' | 'pattern' | 'volume' | 'price_change';
  conditions: AlertCondition[];
  channels: AlertChannel[];
  cooldown: number;
  isDefault: boolean;
}

export interface AlertStats {
  totalAlerts: number;
  unreadAlerts: number;
  activeRules: number;
  todayAlerts: number;
  deliveryRate: number;
}

export interface CreateAlertRuleRequest {
  name: string;
  description?: string;
  type: AlertRule['type'];
  conditions: Omit<AlertCondition, 'id'>[];
  channels: Omit<AlertChannel, 'id'>[];
  cooldown: number;
}

export interface UpdateAlertRuleRequest extends Partial<CreateAlertRuleRequest> {
  status?: AlertRule['status'];
}

export interface AlertPreferences {
  userId: string;
  globalEnabled: boolean;
  defaultChannels: AlertChannel[];
  quietHours: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string; // HH:mm format
    timezone: string;
  };
  notificationSettings: {
    sound: boolean;
    vibration: boolean;
    desktop: boolean;
  };
}


