
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  type: 'income' | 'expense';
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  currency?: string;
}

const RecentTransactions = ({ 
  transactions, 
  currency = '$' 
}: RecentTransactionsProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    getCategoryColor(transaction.category)
                  }`}>
                    {getCategoryIcon(transaction.category)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`font-medium ${transaction.type === 'income' ? 'income-value' : 'expense-value'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{currency}{Math.abs(transaction.amount).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-6">No recent transactions</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

function getCategoryColor(category: string): string {
  const categoryColors: Record<string, string> = {
    food: 'bg-financial-orange/10 text-financial-orange',
    shopping: 'bg-financial-blue/10 text-financial-blue',
    transport: 'bg-financial-purple/10 text-financial-purple',
    entertainment: 'bg-financial-green/10 text-financial-green',
    bills: 'bg-financial-red/10 text-financial-red',
    salary: 'bg-financial-green/10 text-financial-green',
    investment: 'bg-financial-blue/10 text-financial-blue',
    other: 'bg-financial-gray/10 text-financial-gray',
  };
  
  return categoryColors[category.toLowerCase()] || categoryColors.other;
}

function getCategoryIcon(category: string): string {
  switch (category.toLowerCase()) {
    case 'food':
      return '🍔';
    case 'shopping':
      return '🛍️';
    case 'transport':
      return '🚗';
    case 'entertainment':
      return '🎬';
    case 'bills':
      return '📃';
    case 'salary':
      return '💼';
    case 'investment':
      return '📈';
    default:
      return '💰';
  }
}

export default RecentTransactions;
