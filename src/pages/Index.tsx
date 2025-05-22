
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import BalanceCard from "@/components/dashboard/BalanceCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import SpendingChart from "@/components/dashboard/SpendingChart";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import { 
  mockFinancialSummary, 
  mockTransactions, 
  mockSpendingData, 
  mockBudgets 
} from "@/services/mockData";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();

  // Redirect to login if not authenticated
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Header />
      
      <main className="flex-1 container max-w-md mx-auto px-4 py-6 space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <BalanceCard
          balance={mockFinancialSummary.balance}
          income={mockFinancialSummary.income}
          expenses={mockFinancialSummary.expenses}
        />
        
        <div className="grid grid-cols-1 gap-6">
          <RecentTransactions transactions={mockTransactions.slice(0, 3)} />
          <SpendingChart data={mockSpendingData} />
          <BudgetProgress budgets={mockBudgets} />
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default Index;
