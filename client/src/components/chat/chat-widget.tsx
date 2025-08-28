import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI shopping assistant. How can I help you today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        role: 'assistant',
        content: "Thank you for your message. I'm processing your request and will respond shortly.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="chat-widget">
      {/* Chat Widget Trigger */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg"
        data-testid="chat-trigger"
      >
        <i className="fas fa-comments text-xl"></i>
      </Button>

      {/* Chat Widget Window */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 h-96 overflow-hidden shadow-xl" data-testid="chat-window">
          {/* Chat Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between" data-testid="chat-header">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary-foreground rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-primary text-xs"></i>
              </div>
              <span className="font-medium" data-testid="chat-title">Nudge Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:text-primary-foreground/80"
              data-testid="chat-close"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto h-64" data-testid="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start space-x-2 ${message.role === 'user' ? 'justify-end' : ''}`} data-testid={`message-${index}`}>
                {message.role === 'assistant' && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-robot text-primary-foreground text-xs"></i>
                  </div>
                )}
                <div className={`rounded-lg p-2 max-w-xs ${message.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`} data-testid={`message-content-${index}`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border" data-testid="chat-input-area">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Ask about products, orders, or policies..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 text-sm"
                data-testid="chat-input"
              />
              <Button onClick={sendMessage} size="sm" data-testid="chat-send">
                <i className="fas fa-paper-plane text-sm"></i>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
