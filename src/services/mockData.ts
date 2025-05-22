
import { Transaction } from "../components/dashboard/RecentTransactions";
import { CategoryData } from "../components/dashboard/SpendingChart";
import { Budget } from "../components/dashboard/BudgetProgress";

// Current date
const now = new Date();

// Helper function to get a date N days ago
const daysAgo = (days: number) => {
  const date = new Date(now);
  date.setDate(date.getDate() - days);
  return date;
};

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 85.75,
    category: 'Food',
    date: daysAgo(0),
    type: 'expense',
  },
  {
    id: '2',
    title: 'Monthly Salary',
    amount: 3200,
    category: 'Salary',
    date: daysAgo(5),
    type: 'income',
  },
  {
    id: '3',
    title: 'Amazon Purchase',
    amount: 34.99,
    category: 'Shopping',
    date: daysAgo(2),
    type: 'expense',
  },
  {
    id: '4',
    title: 'Gas Station',
    amount: 45.50,
    category: 'Transport',
    date: daysAgo(3),
    type: 'expense',
  },
  {
    id: '5',
    title: 'Netflix Subscription',
    amount: 15.99,
    category: 'Entertainment',
    date: daysAgo(1),
    type: 'expense',
  }
];

// Mock Spending Categories
export const mockSpendingData: CategoryData[] = [
  { name: 'Food', value: 420, color: '#F97316' },
  { name: 'Transport', value: 180, color: '#9b87f5' },
  { name: 'Shopping', value: 350, color: '#1EAEDB' },
  { name: 'Entertainment', value: 270, color: '#3DD598' },
  { name: 'Bills', value: 520, color: '#FC5A5A' },
];

// Mock Budgets
export const mockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Food',
    allocated: 500,
    spent: 420,
    period: 'monthly',
  },
  {
    id: '2',
    category: 'Transport',
    allocated: 200,
    spent: 180,
    period: 'monthly',
  },
  {
    id: '3',
    category: 'Shopping',
    allocated: 300,
    spent: 350,
    period: 'monthly',
  },
  {
    id: '4',
    category: 'Entertainment',
    allocated: 250,
    spent: 270,
    period: 'monthly',
  },
];

// Financial Summary
export const mockFinancialSummary = {
  balance: 4580.25,
  income: 3600,
  expenses: 1740.24,
};
