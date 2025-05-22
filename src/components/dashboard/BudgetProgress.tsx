
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  period: string;
}

interface BudgetProgressProps {
  budgets: Budget[];
  currency?: string;
}

const BudgetProgress = ({ budgets, currency = '$' }: BudgetProgressProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Budget Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgets.length > 0 ? (
            budgets.map((budget) => {
              const percentage = Math.min(Math.round((budget.spent / budget.allocated) * 100), 100);
              const isOverBudget = budget.spent > budget.allocated;
              
              return (
                <div key={budget.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm">{budget.category}</div>
                    <div className="text-sm">
                      <span className={isOverBudget ? 'text-financial-red' : ''}>
                        {currency}{budget.spent.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground"> / {currency}{budget.allocated.toLocaleString()}</span>
                    </div>
                  </div>
                  <Progress 
                    value={percentage}
                    className={isOverBudget ? 'text-financial-red' : ''}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground py-6">No budgets set</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
