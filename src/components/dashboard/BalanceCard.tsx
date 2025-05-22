
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
  currency?: string;
}

const BalanceCard = ({ 
  balance, 
  income, 
  expenses, 
  currency = '$' 
}: BalanceCardProps) => {
  return (
    <Card className="w-full bg-financial-purple text-white overflow-hidden">
      <CardContent className="p-6">
        <h2 className="text-sm font-medium opacity-80">Total Balance</h2>
        <p className="text-3xl font-bold mt-1">{currency}{balance.toLocaleString()}</p>
        
        <div className="flex justify-between mt-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 flex items-center justify-center rounded-full mr-2">
              <ArrowUp className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs opacity-80">Income</p>
              <p className="font-medium">{currency}{income.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 flex items-center justify-center rounded-full mr-2">
              <ArrowDown className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs opacity-80">Expenses</p>
              <p className="font-medium">{currency}{expenses.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
