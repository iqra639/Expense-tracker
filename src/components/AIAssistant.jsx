import React, { useState, useEffect, useRef } from 'react';
import '../styles/ai-assistant.css';

const AIAssistant = ({ expenses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your AI financial assistant. How can I help you today?", 
      sender: 'ai' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Predefined queries for quick access
  const quickQueries = [
    "How much did I spend this month?",
    "What's my biggest expense category?",
    "How can I save more money?",
    "Show me my spending trends"
  ];

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a message
  const handleSendMessage = (text = input) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = { id: messages.length + 1, text, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Process the query and generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text, expenses);
      setMessages(prev => [...prev, { id: prev.length + 1, text: aiResponse, sender: 'ai' }]);
      setIsTyping(false);
    }, 1000);
  };

  // Generate AI response based on user query and expense data
  const generateAIResponse = (query, expenses) => {
    const lowerQuery = query.toLowerCase();
    
    // Calculate total expenses
    const totalExpenses = expenses
      .filter(expense => expense.amount < 0)
      .reduce((acc, expense) => acc + Math.abs(expense.amount), 0);
    
    // Calculate total income
    const totalIncome = expenses
      .filter(expense => expense.amount > 0)
      .reduce((acc, expense) => acc + expense.amount, 0);
    
    // Get expense categories and their totals
    const categories = {};
    expenses
      .filter(expense => expense.amount < 0)
      .forEach(expense => {
        const category = expense.category || 'Uncategorized';
        if (categories[category]) {
          categories[category] += Math.abs(expense.amount);
        } else {
          categories[category] = Math.abs(expense.amount);
        }
      });
    
    // Sort categories by amount
    const sortedCategories = Object.entries(categories)
      .sort((a, b) => b[1] - a[1]);
    
    // Get current month expenses
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const currentMonthExpenses = expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date || expense.createdAt);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear &&
               expense.amount < 0;
      })
      .reduce((acc, expense) => acc + Math.abs(expense.amount), 0);

    // Handle different types of queries
    if (lowerQuery.includes('spend') && lowerQuery.includes('month')) {
      return `You've spent $${currentMonthExpenses.toFixed(2)} this month.`;
    } 
    else if (lowerQuery.includes('biggest') && lowerQuery.includes('category')) {
      if (sortedCategories.length === 0) {
        return "You don't have any expense categories yet.";
      }
      const [topCategory, amount] = sortedCategories[0];
      const percentage = ((amount / totalExpenses) * 100).toFixed(1);
      return `Your biggest expense category is ${topCategory} at $${amount.toFixed(2)}, which is ${percentage}% of your total expenses.`;
    }
    else if (lowerQuery.includes('save') && lowerQuery.includes('money')) {
      // Provide personalized saving tips based on spending patterns
      let tips = "Here are some ways you could save money:\n\n";
      
      if (sortedCategories.length > 0) {
        const [topCategory] = sortedCategories[0];
        tips += `1. Your highest spending category is ${topCategory}. Try to reduce spending in this area.\n`;
      }
      
      tips += "2. Set up a budget for each category and stick to it.\n";
      tips += "3. Consider using the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.\n";
      tips += "4. Track all your expenses to identify areas where you can cut back.";
      
      return tips;
    }
    else if (lowerQuery.includes('spending') && lowerQuery.includes('trend')) {
      return "I've analyzed your spending trends. Check the Analytics page for detailed charts and visualizations of your spending patterns over time.";
    }
    else if (lowerQuery.includes('total') && lowerQuery.includes('income')) {
      return `Your total income is $${totalIncome.toFixed(2)}.`;
    }
    else if (lowerQuery.includes('total') && lowerQuery.includes('expense')) {
      return `Your total expenses are $${totalExpenses.toFixed(2)}.`;
    }
    else if (lowerQuery.includes('help') || lowerQuery.includes('what can you do')) {
      return "I can help you analyze your finances! You can ask me questions like:\n\n" +
             "- How much did I spend this month?\n" +
             "- What's my biggest expense category?\n" +
             "- How can I save more money?\n" +
             "- Show me my spending trends\n" +
             "- What's my total income/expenses?\n\n" +
             "Feel free to ask anything about your financial data!";
    }
    else {
      return "I'm not sure how to answer that question yet. Try asking about your spending, income, or expense categories.";
    }
  };

  return (
    <div className="ai-assistant-container">
      {/* Toggle button */}
      <button 
        className={`ai-assistant-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'}`}></i>
      </button>

      {/* Assistant panel */}
      <div className={`ai-assistant-panel ${isOpen ? 'open' : ''}`}>
        <div className="ai-assistant-header">
          <div className="ai-assistant-title">
            <i className="fas fa-robot"></i>
            <h3>Financial AI Assistant</h3>
          </div>
        </div>

        <div className="ai-assistant-messages">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`ai-message ${message.sender === 'ai' ? 'ai' : 'user'}`}
            >
              {message.sender === 'ai' && (
                <div className="ai-avatar">
                  <i className="fas fa-robot"></i>
                </div>
              )}
              <div className="ai-message-content">
                {message.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="ai-message ai">
              <div className="ai-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div className="ai-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-quick-queries">
          {quickQueries.map((query, index) => (
            <button 
              key={index} 
              className="ai-quick-query"
              onClick={() => handleSendMessage(query)}
            >
              {query}
            </button>
          ))}
        </div>

        <div className="ai-assistant-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your finances..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isTyping}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
