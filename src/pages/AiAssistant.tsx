import React, { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I am your FinFlow AI Assistant. Ask me anything about your finances, budgets, or general financial advice." }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal;
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInputVal("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { role: "assistant", text: "I've analyzed your request. Looking at your recent transactions, you have $450 left in your discretionary budget this month. Would you like me to allocate it towards your Vacuum Savings Goal?" }
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col gap-1 mb-6 shrink-0">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F1729] flex items-center gap-3">
          <Bot className="h-8 w-8 text-[#1565C0] p-1 bg-[#F5F9FF] rounded-lg border border-[#E8EEF8]" /> 
          Financial AI Assistant
        </h1>
        <p className="text-sm text-[#5A6A8A]">Ask questions about your data in plain English.</p>
      </div>

      <div className="flex-1 bg-white border border-[#E8EEF8] rounded-[24px] overflow-hidden flex flex-col shadow-sm relative">
        {/* Chat window */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center border ${
                msg.role === "user" 
                  ? "bg-[#1565C0] text-white border-[#1565C0]" 
                  : "bg-[#F5F9FF] text-[#1565C0] border-[#E8EEF8]"
              }`}>
                {msg.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div className={`max-w-[80%] rounded-[20px] px-5 py-3.5 text-[15px] font-medium leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#1565C0] text-white rounded-tr-sm"
                  : "bg-[#F5F9FF] border border-[#E8EEF8] text-[#0F1729] rounded-tl-sm"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="p-4 bg-white border-t border-[#E8EEF8]">
          <form onSubmit={handleSend} className="relative flex items-center gap-2">
            <Input 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about your spending habits..." 
              className="h-14 rounded-2xl bg-[#F5F9FF] border-[#E8EEF8] font-medium px-6 pr-14 focus-visible:ring-2 focus-visible:ring-[#1565C0]/20"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-2 h-10 w-10 bg-[#1565C0] hover:bg-[#1976D2] rounded-xl text-white shadow-md active:scale-95 transition-all"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
