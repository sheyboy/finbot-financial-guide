
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  id: string;
  message: string;
  is_bot: boolean;
  created_at: string;
};

const FinBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load previous messages
  useEffect(() => {
    const loadMessages = async () => {
      if (!user) return;
      
      try {
        setIsInitialLoad(true);
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });
          
        if (error) throw error;
        
        if (data) {
          setMessages(data as Message[]);
          // If no messages, send a welcome message
          if (data.length === 0) {
            setTimeout(() => sendWelcomeMessage(), 500);
          }
        }
      } catch (error: any) {
        console.error('Error loading messages:', error);
        toast({
          title: 'Error',
          description: 'Failed to load chat history',
          variant: 'destructive',
        });
      } finally {
        setIsInitialLoad(false);
      }
    };

    if (user) {
      loadMessages();
    }
  }, [user, toast]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendWelcomeMessage = async () => {
    if (!user) return;
    
    try {
      const welcomeMessage = {
        user_id: user.id,
        message: "Hi there! I'm your SpendWise AI assistant. I can help you understand your spending habits, track your budget, and provide financial advice. What financial question can I help you with today?",
        is_bot: true,
      };
      
      const { data, error } = await supabase
        .from('chat_messages')
        .insert(welcomeMessage)
        .select('*')
        .single();
        
      if (error) throw error;
      
      if (data) {
        setMessages([data as Message]);
      }
    } catch (error: any) {
      console.error('Error sending welcome message:', error);
    }
  };

  // Handle sending a new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user) return;
    setIsLoading(true);
    
    try {
      // Insert user message
      const userMessage = {
        user_id: user.id,
        message: newMessage.trim(),
        is_bot: false,
      };
      
      const { data: userMessageData, error: userMessageError } = await supabase
        .from('chat_messages')
        .insert(userMessage)
        .select('*')
        .single();
        
      if (userMessageError) throw userMessageError;
      
      if (userMessageData) {
        setMessages(prev => [...prev, userMessageData as Message]);
      }
      
      // Clear input
      setNewMessage('');
      
      // Generate bot response
      setTimeout(async () => {
        const botResponse = await generateBotResponse(newMessage.trim());
        
        const botMessage = {
          user_id: user.id,
          message: botResponse,
          is_bot: true,
        };
        
        const { data: botMessageData, error: botMessageError } = await supabase
          .from('chat_messages')
          .insert(botMessage)
          .select('*')
          .single();
          
        if (botMessageError) throw botMessageError;
        
        if (botMessageData) {
          setMessages(prev => [...prev, botMessageData as Message]);
        }
        
        setIsLoading(false);
      }, 1000);
      
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  // Function to generate intelligent finance-related responses
  const generateBotResponse = async (message: string): Promise<string> => {
    // More intelligent financial assistant responses
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm your personal financial assistant. How can I help with your finances today?";
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('spending limit')) {
      return "Based on your income and spending patterns, I recommend allocating 50% to essentials, 30% to wants, and 20% to savings and debt repayment. Would you like me to help set up specific budget categories?";
    } else if (lowerMessage.includes('spend') || lowerMessage.includes('spending')) {
      return "Looking at your recent spending, I notice you've spent most in the 'Dining Out' category. This is 15% higher than last month. Would you like some tips on reducing restaurant expenses while still enjoying meals out?";
    } else if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
      return "Great goal! To boost your savings, consider the 50/30/20 rule: 50% of income for needs, 30% for wants, and 20% for savings. Based on your current habits, you could increase your savings rate by setting up automatic transfers on payday and cutting back on subscription services you rarely use.";
    } else if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
      return "For beginning investors, I recommend starting with low-cost index funds that provide broad market exposure. Before investing, ensure you have an emergency fund covering 3-6 months of expenses and have paid off high-interest debt.";
    } else if (lowerMessage.includes('debt') || lowerMessage.includes('loan')) {
      return "When tackling debt, consider either the avalanche method (focusing on highest interest rates first) or the snowball method (paying off smallest debts first). Based on your situation, the avalanche method would save you approximately $300 in interest over the next year.";
    } else if (lowerMessage.includes('expense') || lowerMessage.includes('transaction')) {
      return "Your top three expense categories this month are housing (35%), transportation (15%), and dining out (12%). Your dining expenses have increased by 12% compared to your three-month average.";
    } else if (lowerMessage.includes('goal') || lowerMessage.includes('target')) {
      return "Setting specific financial goals is important! Based on your current savings rate, you could reach a $10,000 emergency fund in approximately 8 months. Would you like me to help create a step-by-step plan to achieve this faster?";
    } else if (lowerMessage.includes('tip') || lowerMessage.includes('advice')) {
      const tips = [
        "Consider using the 24-hour rule before making non-essential purchases over $50 to reduce impulse buying.",
        "Review your subscriptions monthly - most people save over $100 by cutting unused services.",
        "When grocery shopping, studies show making a list can reduce your bill by up to 23%.",
        "Negotiate your bills annually - a 10-minute phone call can often save hundreds on insurance and services.",
        "Use the 50/30/20 budget rule as a starting point: 50% for needs, 30% for wants, and 20% for savings."
      ];
      return tips[Math.floor(Math.random() * tips.length)];
    } else {
      return "As your financial assistant, I'm here to help with budgeting, expense tracking, saving strategies, and personalized financial advice. Could you share more specific details about what financial information you're looking for?";
    }
  };

  if (isInitialLoad) {
    return (
      <div className="flex flex-col h-[70vh] bg-white rounded-lg shadow-md items-center justify-center">
        <Loader2 className="h-8 w-8 text-financial-purple animate-spin" />
        <p className="mt-2 text-sm text-gray-500">Loading your conversation...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[70vh] bg-white rounded-lg shadow-md">
      <div className="bg-financial-purple text-white p-4 rounded-t-lg flex items-center">
        <Bot className="mr-2 h-5 w-5" />
        <h2 className="font-semibold">SpendWise AI Assistant</h2>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 my-8">
              <Bot className="mx-auto h-12 w-12 mb-2 text-financial-purple" />
              <p>Hi there! I'm your financial assistant.</p>
              <p className="text-sm">Ask me anything about your finances!</p>
            </div>
          )}
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.is_bot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.is_bot
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-financial-purple text-white'
                }`}
              >
                <div className="flex items-center mb-1">
                  {msg.is_bot ? (
                    <Bot className="h-4 w-4 mr-1" />
                  ) : (
                    <User className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-xs opacity-70">
                    {msg.is_bot ? 'FinBot' : 'You'}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                <span className="block text-xs opacity-50 mt-1 text-right">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <form 
        onSubmit={handleSendMessage} 
        className="border-t p-3 flex gap-2"
      >
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ask about your finances..."
          disabled={isLoading || !user}
          className="flex-grow"
        />
        <Button 
          type="submit" 
          disabled={isLoading || !newMessage.trim() || !user}
          size="icon"
          className="bg-financial-purple hover:bg-financial-purple/90"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
};

export default FinBot;
