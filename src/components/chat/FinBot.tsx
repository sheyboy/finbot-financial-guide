
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  // Load previous messages
  useEffect(() => {
    const loadMessages = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });
          
        if (error) throw error;
        
        if (data) {
          setMessages(data as Message[]);
        }
      } catch (error: any) {
        console.error('Error loading messages:', error);
        toast({
          title: 'Error',
          description: 'Failed to load chat history',
          variant: 'destructive',
        });
      }
    };

    loadMessages();
  }, [user, toast]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        setMessages([...messages, userMessageData as Message]);
      }
      
      // Clear input
      setNewMessage('');
      
      // Generate bot response (mock response for now)
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

  // Mock function to generate bot responses
  const generateBotResponse = async (message: string): Promise<string> => {
    // Simple mock responses based on keywords
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm your FinBot assistant. How can I help with your finances today?";
    } else if (lowerMessage.includes('budget')) {
      return "Managing your budget is important! You can set category budgets and I'll help you track your spending against them.";
    } else if (lowerMessage.includes('spend') || lowerMessage.includes('spending')) {
      return "Based on your recent spending, you've been doing well staying under budget in most categories!";
    } else if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
      return "I have some savings tips for you: Consider automating your savings with regular transfers to a high-yield account.";
    } else {
      return "I'm here to help with your financial questions. You can ask about your spending, budgets, or savings goals!";
    }
  };

  return (
    <div className="flex flex-col h-[70vh] bg-white rounded-lg shadow-md">
      <div className="bg-financial-purple text-white p-4 rounded-t-lg flex items-center">
        <Bot className="mr-2 h-5 w-5" />
        <h2 className="font-semibold">SpendWise Assistant</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
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
              <p className="text-sm">{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form 
        onSubmit={handleSendMessage} 
        className="border-t p-2 flex gap-2"
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
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default FinBot;
