import { Monitor } from '@/hooks/useMonitors.hook';

export const mockMonitors: Monitor[] = [
  {
    id: '1',
    name: 'price',
    item: {
      title: 'The Complete Guide to Machine Learning',
      id: 'ITM-A7B9C3',
      image: 'https://i.ibb.co/XZwpwsqp/product1.webp',
    },
    country: {
      code: 'US',
      flag: 'https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/us.svg',
      site: 'Amazon.com',
    },
    interval: '5 min',
    lastCheck: '21 min',
    lastCheckTooltip: 'Last: Fri, Dec 25, 2025 4:33:16 PM\nCreated: Sun, Dec 20, 2025 4:39:16 PM\nModified: Wed, Dec 23, 2025 2:33:11 PM',
    fields: ['Price', 'Stock', 'Title', 'Rating', 'Reviews'],
    usage: {
      used: 1200,
      total: 2000,
      percentage: 65,
    },
    isActive: true,
    alerts: ['Email', 'Slack', 'Web', 'Webhook'],
    unreadCount: 6,
    details: [
      {
        field: 'price',
        triggers: ['If Price decreases', 'Or Price increases'],
        type: 'decreases by 10%',
        currentValue: '$29.99',
        currentValueFull: '$29.99 (was $39.99) - 25% discount applied',
        previousValue: '$39.99',
        previousValueFull: '$39.99',
        magnitude: 25,
        modified: '5 hours ago',
        unreadCount: 1,
      },
      {
        field: 'stock',
        triggers: ['If Stock becomes unavailable'],
        type: 'contains',
        currentValue: 'In Stock',
        currentValueFull: 'In Stock - 47 units available, fast shipping',
        previousValue: 'In Stock',
        previousValueFull: 'In Stock - 52 units available',
        magnitude: 10,
        modified: '3 hours ago',
        unreadCount: 5,
      },
    ],
  },
  {
    id: '2',
    name: 'Inventory Watch',
    item: {
      title: 'Advanced Analytics Dashboard',
      id: 'ITM-B8C4D5',
      image: 'https://i.ibb.co/BHcDXgQt/product5.webp',
    },
    country: {
      code: 'CA',
      flag: 'https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/ca.svg',
      site: 'Amazon.ca',
    },
    interval: '1 hour',
    lastCheck: '3 hours',
    lastCheckTooltip: 'Last: Fri, Dec 25, 2025 1:33:16 PM\nCreated: Mon, Dec 18, 2025 2:15:30 PM\nModified: Thu, Dec 22, 2025 9:45:22 AM',
    fields: ['Stock', 'Rating', 'Reviews', 'Price', 'Availability', 'Shipping', 'Category', 'Brand', 'Model', 'Features'],
    usage: {
      used: 230,
      total: 1000,
      percentage: 23,
    },
    isActive: false,
    alerts: ['Email'],
    unreadCount: 3,
    details: [
      {
        field: 'stock',
        triggers: ['If Stock becomes unavailable'],
        type: 'equals',
        currentValue: 'Out of Stock',
        currentValueFull: 'Out of Stock - Expected restocking on January 5th, 2025',
        previousValue: 'In Stock',
        previousValueFull: 'In Stock - 15 units available',
        magnitude: 100,
        modified: '2 hours ago',
        unreadCount: 3,
      },
    ],
  },
];

export const mockStats = {
  total: 2847,
  active: 2563,
  unreadChanges: 1284,
  issues: 23,
};

// Mock history data for mobile drawers
export const mockPageHistoryData: Record<string, {
  changes: Array<{
    id: string;
    date: string;
    field: string;
    prev: string;
    new: string;
    mag: string;
    alert: boolean;
    fullDate?: string;
  }>;
  stats: Array<{
    label: string;
    value: string;
  }>;
}> = {
  '1': {
    changes: [
      { id: 'CHG-PCP9RSQ', date: '5 min ago', field: 'price', prev: '$39.99', new: '$29.99', mag: '-$10.00', alert: true, fullDate: 'Fri, Dec 25, 2025 4:33:16 PM' },
      { id: 'CHG-T06DBYB', date: '2 hours ago', field: 'title', prev: 'The Complete Guide...', new: 'The Complete Guide to Machine Learning (2025 Ed.)', mag: '+12 chars', alert: false, fullDate: 'Fri, Dec 25, 2025 2:41:05 PM' },
      { id: 'CHG-SV1R0G4', date: '3 hours ago', field: 'stock', prev: '52 units', new: '47 units', mag: '-5 units', alert: true, fullDate: 'Fri, Dec 25, 2025 1:12:44 PM' },
      { id: 'CHG-RNDBKNU', date: '1 day ago', field: 'rating', prev: '4.8', new: '4.9', mag: '+0.1', alert: false, fullDate: 'Thu, Dec 24, 2025 3:05:18 PM' },
      { id: 'CHG-SRDRY3MX', date: '1 day ago', field: 'salesRank', prev: '2,105', new: '1,899', mag: '-206', alert: true, fullDate: 'Thu, Dec 24, 2025 1:15:00 PM' },
    ],
    stats: [
      { label: 'Total Changes', value: '285' },
      { label: 'Alerts Triggered', value: '42' },
      { label: 'Most Active Field', value: 'price' },
      { label: 'Last Alert', value: '5 min ago' }
    ]
  },
  '2': {
    changes: [
      { id: 'CHG-STK001', date: '2 hours ago', field: 'stock', prev: 'In Stock (15 units)', new: 'Out of Stock', mag: '100% change', alert: true, fullDate: 'Fri, Dec 25, 2025 2:33:16 PM' }
    ],
    stats: [
      { label: 'Total Changes', value: '47' },
      { label: 'Alerts Triggered', value: '8' },
      { label: 'Most Active Field', value: 'Inventory Watch' },
      { label: 'Last Alert', value: '2 hours ago' }
    ]
  }
};

export const mockItemHistoryData: Record<string, {
  changes: Array<{
    id: string;
    date: string;
    field: string;
    prev: string;
    new: string;
    mag: string;
    alert: boolean;
  }>;
  stats: Array<{
    label: string;
    value: string;
  }>;
}> = {
  '1': {
    changes: [
      { id: 'CHG-PCP9RSQ', date: '5 min ago', field: 'price', prev: '$39.99', new: '$29.99', mag: '-$10.00', alert: true },
      { id: 'CHG-T06DBYB', date: '2 hours ago', field: 'title', prev: 'The Complete Guide...', new: 'The Complete Guide to Machine Learning (2025 Ed.)', mag: '+12 chars', alert: false },
      { id: 'CHG-SV1R0G4', date: '3 hours ago', field: 'stock', prev: '52 units', new: '47 units', mag: '-5 units', alert: true },
    ],
    stats: [
      { label: 'Total Changes', value: '285' },
      { label: 'Alerts Triggered', value: '42' },
      { label: 'Most Active', value: 'Price Tracker Pro' },
      { label: 'Last Alert', value: '5 min ago' }
    ]
  },
  '2': {
    changes: [
      { id: 'CHG-STK001', date: '2 hours ago', field: 'stock', prev: 'In Stock (15 units)', new: 'Out of Stock', mag: '100% change', alert: true }
    ],
    stats: [
      { label: 'Total Changes', value: '47' },
      { label: 'Alerts Triggered', value: '8' },
      { label: 'Most Active', value: 'Inventory Watch' },
      { label: 'Last Alert', value: '2 hours ago' }
    ]
  }
};

export const mockFieldHistoryData: Record<string, Record<string, {
  changes: Array<{
    id: string;
    date: string;
    prev: string;
    new: string;
    mag: string;
    alert: boolean;
  }>;
  stats: Array<{
    label: string;
    value: string;
  }>;
}>> = {
  '1': {
    'price': {
      changes: [
        { id: 'CHG-49182Z', date: '5 min ago', prev: '$39.99', new: '$29.99', mag: '-$10.00 (25%)', alert: true },
        { id: 'CHG-49033X', date: '1 day ago', prev: '$39.50', new: '$39.99', mag: '+$0.49 (1.2%)', alert: false },
        { id: 'CHG-48945B', date: '2 days ago', prev: '$41.99', new: '$39.50', mag: '-$2.49 (5.9%)', alert: true },
      ],
      stats: [
        { label: 'Total Changes', value: '128' },
        { label: 'Net Change', value: '-$10.00' },
        { label: 'Alerts Triggered', value: '15' },
        { label: 'Last Alert', value: '5 min ago' }
      ]
    },
    'stock': {
      changes: [
        { id: 'CHG-STK123', date: '3 hours ago', prev: '52 units', new: '47 units', mag: '-5 units (10%)', alert: true },
        { id: 'CHG-STK122', date: '1 day ago', prev: '55 units', new: '52 units', mag: '-3 units (5%)', alert: false }
      ],
      stats: [
        { label: 'Total Changes', value: '45' },
        { label: 'Net Change', value: '-8 units' },
        { label: 'Alerts Triggered', value: '8' },
        { label: 'Last Alert', value: '3 hours ago' }
      ]
    }
  },
  '2': {
    'stock': {
      changes: [
        { id: 'CHG-STK001', date: '2 hours ago', prev: 'In Stock (15 units)', new: 'Out of Stock', mag: '100% change', alert: true }
      ],
      stats: [
        { label: 'Total Changes', value: '12' },
        { label: 'Net Change', value: '-15 units' },
        { label: 'Alerts Triggered', value: '3' },
        { label: 'Last Alert', value: '2 hours ago' }
      ]
    }
  }
};

