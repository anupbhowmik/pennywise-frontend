export const mockTransactions = [
  { id: 'tx-1', merchant: 'Whole Foods Market', amount: 142.50, date: '2023-10-24', category: 'Groceries', status: 'Processed' },
  { id: 'tx-2', merchant: 'Uber Rides', amount: 24.10, date: '2023-10-23', category: 'Transport', status: 'Processed' },
  { id: 'tx-3', merchant: 'Amazon.com', amount: 89.99, date: '2023-10-21', category: 'Shopping', status: 'Processed' },
  { id: 'tx-4', merchant: 'Starbucks', amount: 4.50, date: '2023-10-20', category: 'Dining', status: 'Processed' },
  { id: 'tx-5', merchant: 'Netflix', amount: 15.99, date: '2023-10-18', category: 'Entertainment', status: 'Processed' },
  { id: 'tx-6', merchant: 'Chevron Gas', amount: 45.00, date: '2023-10-15', category: 'Transport', status: 'Processed' },
  { id: 'tx-7', merchant: 'Target', amount: 120.40, date: '2023-10-12', category: 'Shopping', status: 'Processed' },
];

export const mockMonthlySpending = [
  { name: 'May', spent: 2400 },
  { name: 'Jun', spent: 1398 },
  { name: 'Jul', spent: 3800 },
  { name: 'Aug', spent: 3908 },
  { name: 'Sep', spent: 2800 },
  { name: 'Oct', spent: 3400 },
];

export const mockCategoryBreakdown = [
  { name: 'Groceries', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Dining', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'Transport', value: 200, fill: 'hsl(var(--chart-3))' },
  { name: 'Shopping', value: 250, fill: 'hsl(var(--chart-4))' },
  { name: 'Bills', value: 800, fill: 'hsl(var(--chart-5))' },
];

export const mockInsights = [
  {
    id: 'in-1',
    title: 'High Dining Spend Detected',
    description: 'You spent 25% more on dining this month compared to last month. Consider cooking at home this week to stay on budget.',
    type: 'warning',
    actionText: 'Set Dining Budget'
  },
  {
    id: 'in-2',
    title: 'Subscription Price Increase',
    description: 'Your Netflix subscription increased from $15.49 to $15.99. We noticed this pattern across your entertainment category.',
    type: 'info',
    actionText: 'Review Subscriptions'
  },
  {
    id: 'in-3',
    title: 'Great Job on Groceries',
    description: 'You are currently 12% below your grocery budget for October. Keep up the good work!',
    type: 'success',
    actionText: 'View Budget'
  }
];