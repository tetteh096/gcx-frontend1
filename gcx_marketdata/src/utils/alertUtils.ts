import { Alert, AlertRule, AlertCondition } from '@/types/alerts';

// Alert Severity Colors
export const getSeverityColor = (severity: Alert['severity']) => {
  switch (severity) {
    case 'critical':
      return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800';
    case 'high':
      return 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800';
    case 'low':
      return 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800';
  }
};

// Alert Type Icons and Colors
export const getAlertTypeInfo = (type: Alert['type']) => {
  switch (type) {
    case 'threshold':
      return {
        icon: '📊',
        color: 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800',
        label: 'Price Threshold'
      };
    case 'pattern':
      return {
        icon: '🔄',
        color: 'text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800',
        label: 'Pattern Detection'
      };
    case 'volume':
      return {
        icon: '📈',
        color: 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800',
        label: 'Volume Spike'
      };
    case 'price_change':
      return {
        icon: '💹',
        color: 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800',
        label: 'Price Change'
      };
    default:
      return {
        icon: '🔔',
        color: 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800',
        label: 'Alert'
      };
  }
};

// Alert Status Colors
export const getStatusColor = (status: Alert['status']) => {
  switch (status) {
    case 'sent':
      return 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800';
    case 'delivered':
      return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800';
    case 'failed':
      return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800';
    case 'read':
      return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800';
  }
};

// Format Alert Message
export const formatAlertMessage = (alert: Alert): string => {
  const { type, data, symbol, commodity } = alert;
  
  switch (type) {
    case 'threshold':
      if (data.currentPrice && data.threshold) {
        const direction = data.currentPrice > data.threshold ? 'above' : 'below';
        return `${symbol} (${commodity}) price is ${direction} threshold of ${data.threshold}`;
      }
      return `${symbol} (${commodity}) threshold alert triggered`;
      
    case 'pattern':
      if (data.tradeCount && data.timeframe) {
        return `${symbol} (${commodity}) detected ${data.tradeCount} trades in ${data.timeframe} minutes`;
      }
      return `${symbol} (${commodity}) pattern alert triggered`;
      
    case 'volume':
      if (data.volume) {
        return `${symbol} (${commodity}) volume spike detected: ${data.volume}`;
      }
      return `${symbol} (${commodity}) volume alert triggered`;
      
    case 'price_change':
      if (data.changePercent) {
        const direction = data.changePercent > 0 ? 'increased' : 'decreased';
        return `${symbol} (${commodity}) price ${direction} by ${Math.abs(data.changePercent).toFixed(2)}%`;
      }
      return `${symbol} (${commodity}) price change alert triggered`;
      
    default:
      return `${symbol} (${commodity}) alert triggered`;
  }
};

// Format Alert Time
export const formatAlertTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days}d ago`;
  }
};

// Validate Alert Rule
export const validateAlertRule = (rule: Partial<AlertRule>): string[] => {
  const errors: string[] = [];
  
  if (!rule.name?.trim()) {
    errors.push('Rule name is required');
  }
  
  if (!rule.type) {
    errors.push('Alert type is required');
  }
  
  if (!rule.conditions || rule.conditions.length === 0) {
    errors.push('At least one condition is required');
  }
  
  if (!rule.channels || rule.channels.length === 0) {
    errors.push('At least one delivery channel is required');
  }
  
  if (rule.cooldown !== undefined && rule.cooldown < 0) {
    errors.push('Cooldown must be a positive number');
  }
  
  return errors;
};

// Validate Alert Condition
export const validateAlertCondition = (condition: Partial<AlertCondition>): string[] => {
  const errors: string[] = [];
  
  if (!condition.field) {
    errors.push('Field is required');
  }
  
  if (!condition.operator) {
    errors.push('Operator is required');
  }
  
  if (condition.value === undefined || condition.value === null) {
    errors.push('Value is required');
  }
  
  if (condition.timeframe !== undefined && condition.timeframe < 1) {
    errors.push('Timeframe must be at least 1 minute');
  }
  
  return errors;
};

// Generate Alert Rule Description
export const generateRuleDescription = (rule: AlertRule): string => {
  const conditions = rule.conditions.map(condition => {
    const fieldMap: Record<string, string> = {
      price: 'Price',
      volume: 'Volume',
      change_percent: 'Price Change %',
      trade_count: 'Trade Count'
    };
    
    const operatorMap: Record<string, string> = {
      gt: '>',
      gte: '≥',
      lt: '<',
      lte: '≤',
      eq: '=',
      neq: '≠'
    };
    
    return `${fieldMap[condition.field]} ${operatorMap[condition.operator]} ${condition.value}`;
  }).join(' AND ');
  
  return `Alert when ${conditions}`;
};

// Calculate Alert Priority Score
export const calculateAlertPriority = (alert: Alert): number => {
  let score = 0;
  
  // Severity scoring
  switch (alert.severity) {
    case 'critical': score += 100; break;
    case 'high': score += 75; break;
    case 'medium': score += 50; break;
    case 'low': score += 25; break;
  }
  
  // Type scoring
  switch (alert.type) {
    case 'threshold': score += 20; break;
    case 'pattern': score += 15; break;
    case 'volume': score += 10; break;
    case 'price_change': score += 5; break;
  }
  
  // Status scoring (unread alerts get higher priority)
  if (alert.status === 'sent' || alert.status === 'delivered') {
    score += 30;
  }
  
  // Time-based scoring (newer alerts get higher priority)
  const ageInHours = (Date.now() - new Date(alert.createdAt).getTime()) / (1000 * 60 * 60);
  if (ageInHours < 1) score += 25;
  else if (ageInHours < 24) score += 15;
  else if (ageInHours < 168) score += 5; // 1 week
  
  return score;
};

// Sort Alerts by Priority
export const sortAlertsByPriority = (alerts: Alert[]): Alert[] => {
  return [...alerts].sort((a, b) => {
    const priorityA = calculateAlertPriority(a);
    const priorityB = calculateAlertPriority(b);
    return priorityB - priorityA; // Higher priority first
  });
};

// Filter Alerts by Search Term
export const filterAlertsBySearch = (alerts: Alert[], searchTerm: string): Alert[] => {
  if (!searchTerm.trim()) return alerts;
  
  const term = searchTerm.toLowerCase();
  return alerts.filter(alert => 
    alert.symbol.toLowerCase().includes(term) ||
    alert.commodity.toLowerCase().includes(term) ||
    alert.region.toLowerCase().includes(term) ||
    alert.message.toLowerCase().includes(term) ||
    alert.type.toLowerCase().includes(term)
  );
};

// Get Alert Summary Stats
export const getAlertSummary = (alerts: Alert[]) => {
  const total = alerts.length;
  const unread = alerts.filter(a => a.status !== 'read').length;
  const critical = alerts.filter(a => a.severity === 'critical').length;
  const high = alerts.filter(a => a.severity === 'high').length;
  
  return {
    total,
    unread,
    critical,
    high,
    readRate: total > 0 ? ((total - unread) / total * 100).toFixed(1) : '0'
  };
};


