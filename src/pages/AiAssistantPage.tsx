import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, MessagesSquare, ChevronDown, ChevronUp, Copy, Check, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AiAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What's the difference between leasing and financing a car?",
    "How do I know if a used car has been in an accident?",
    "What questions should I ask when buying a used car?",
    "How much should I budget for car maintenance?",
    "Which cars have the best resale value?",
    "What's a good interest rate for an auto loan?"
  ];

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateResponse = async (question: string) => {
    // Simulate AI thinking time
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);
    
    // Hard-coded responses for demo purposes
    let response = '';
    
    if (question.toLowerCase().includes('lease') || question.toLowerCase().includes('finance')) {
      response = "Leasing vs. financing comes down to your priorities. With leasing, you'll typically have lower monthly payments but won't own the car at the end of the term. Financing means higher monthly payments, but you'll build equity and own the vehicle once it's paid off. Leasing is good for people who want a new car every few years with warranty coverage, while financing makes more sense if you plan to keep the car long-term.";
    }
    else if (question.toLowerCase().includes('accident')) {
      response = "To check if a used car has been in an accident, you should: 1) Get a vehicle history report (Carfax or AutoCheck), 2) Look for inconsistent panel gaps or paint differences, 3) Check for frame damage, 4) Have a mechanic inspect it, 5) Ask the seller directly. Even minor accidents can affect a car's value, so it's important to know the full history before purchasing.";
    }
    else if (question.toLowerCase().includes('question')) {
      response = "When buying a used car, ask these key questions: 1) Why is the owner selling? 2) Has the car been in any accidents? 3) Are there service records available? 4) How many previous owners? 5) Are there any known issues or needed repairs? 6) Is the price negotiable? 7) Can I take it for a pre-purchase inspection? 8) Is there any remaining warranty? These questions will help you understand the car's history and condition better.";
    }
    else if (question.toLowerCase().includes('maintenance') || question.toLowerCase().includes('budget')) {
      response = "For car maintenance budgeting, a good rule of thumb is to set aside $100-150 per month for a used car. Annual maintenance costs typically range from $500-700 for a reliable used sedan, while SUVs and luxury vehicles can cost $800-1,500+ annually. Regular maintenance includes oil changes ($30-80), tire rotations ($20-50), and brake services ($150-300). Don't forget to budget for unexpected repairs by keeping an emergency fund of at least $1,000-1,500.";
    }
    else if (question.toLowerCase().includes('resale')) {
      response = "Cars with the best resale value typically include Toyota, Honda, Subaru, and Lexus models. Specifically, the Toyota Tacoma, Toyota 4Runner, Jeep Wrangler, Honda CR-V, and Subaru Outback consistently maintain strong resale values. These vehicles typically retain 50-60% of their value after five years. Factors that positively affect resale value include reliability reputation, fuel efficiency, popular features, and neutral colors like silver, white, or black.";
    }
    else if (question.toLowerCase().includes('interest')) {
      response = "A good interest rate for an auto loan depends on your credit score and market conditions. As of 2025, with excellent credit (750+), you might qualify for 3-4.5%. Good credit (700-749) might get you 4.5-6%. Average credit (650-699) typically sees 6-9%, while below 650 could mean 9-15% or higher. New cars generally have lower rates than used cars. Always shop around at credit unions, banks, and online lenders to find the best rate before visiting a dealership.";
    }
    else {
      response = "I understand you're asking about " + question.toLowerCase() + ". As your car buying assistant, I can help with questions about car financing, features comparisons, maintenance costs, and more. Could you provide a bit more detail about what specific information you're looking for regarding this topic?";
    }
    
    return response;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    const response = await generateResponse(input);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearConversation = () => {
    setMessages([]);
    setShowSuggestions(true);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Car Buying AI Assistant</h1>
          <p className="text-gray-600">
            Ask me anything about cars, financing, or the buying process. I'm here to help!
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md flex-grow flex flex-col overflow-hidden">
          <div className="flex-grow overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center flex-col">
                <MessagesSquare size={48} className="text-blue-900 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Start a Conversation</h3>
                <p className="text-gray-600 text-center max-w-md mb-6">
                  Ask me anything about car features, financing options, or the car buying process.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        {message.sender === 'user' ? (
                          <User size={18} className="mr-2" />
                        ) : (
                          <Bot size={18} className="mr-2" />
                        )}
                        <span className="font-medium">
                          {message.sender === 'user' ? 'You' : 'AI Assistant'}
                        </span>
                        <span className="text-xs ml-auto opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      {message.sender === 'ai' && (
                        <button
                          onClick={() => copyToClipboard(message.id, message.text)}
                          className="mt-2 text-xs flex items-center opacity-70 hover:opacity-100"
                        >
                          {copiedId === message.id ? (
                            <>
                              <Check size={14} className="mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={14} className="mr-1" />
                              Copy
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-4 bg-gray-100 text-gray-800">
                      <div className="flex items-center mb-2">
                        <Bot size={18} className="mr-2" />
                        <span className="font-medium">AI Assistant</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {messages.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200">
              <button
                onClick={clearConversation}
                className="text-gray-500 hover:text-red-500 text-sm flex items-center mx-auto"
              >
                <Trash2 size={14} className="mr-1" />
                Clear conversation
              </button>
            </div>
          )}
          
          {showSuggestions && messages.length === 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Suggested Questions</h3>
                <button
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showSuggestions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left text-sm px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about cars..."
                className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800 text-white rounded-md px-4 py-2 flex items-center transition-colors"
                disabled={!input.trim()}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantPage;