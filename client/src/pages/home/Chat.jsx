import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BringToFront, ChevronDown, Zap, Mic, X, Key } from "lucide-react";
import styled from "styled-components";
import "./Chat.css";

const Chat = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Ask Anything...");
  const [inputValue, setInputValue] = useState("");
  const [workspacesExpanded, setWorkspacesExpanded] = useState(true);
  const [featuresExpanded, setFeaturesExpanded] = useState(true);
  const [modelDropdownExpanded, setModelDropdownExpanded] = useState(false);
  const [selectedModel, setSelectedModel] = useState("ChatGPT v4.0");
  const [showAIModels, setShowAIModels] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || 'temp-key-for-testing');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const aiModels = [
    "ChatGPT v4.0",
    "GPT-3.5 Turbo",
    "Claude 3 Opus",
    "Claude 3 Sonnet",
    "Gemini Pro",
    "Llama 2 70B",
    "Mistral 7B"
  ];

  const handleZapClick = () => {
    setShowAIModels(!showAIModels);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputValue };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: selectedModel.includes('gpt-4') ? 'gpt-4' : 'gpt-3.5-turbo',
          messages: updatedMessages,
          temperature: 0.7
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to get response from OpenAI');
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message;
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error.message}. Please check your API key and try again.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  useEffect(() => {
    const placeholders = [
      "Ask Anything...",
      "Imagine. Ask. Build.",
      "Speak. I'll think"
    ];
    let index = 0;

    
    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setPlaceholderText(placeholders[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const Loader = () => {
    return (
      <StyledWrapper>
        <div className="spinner">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </StyledWrapper>
    );
  }

  const StyledWrapper = styled.div`
    .spinner {
     width: 44px;
     height: 44px;
     animation: spinner-y0fdc1 2s infinite ease;
     transform-style: preserve-3d;
    }

    .spinner > div {
     background-color: rgba(0,77,255,0.2);
     height: 100%;
     position: absolute;
     width: 100%;
     border: 2px solid #004dff;
    }

    .spinner div:nth-of-type(1) {
     transform: translateZ(-22px) rotateY(180deg);
    }

    .spinner div:nth-of-type(2) {
     transform: rotateY(-270deg) translateX(50%);
     transform-origin: top right;
    }

    .spinner div:nth-of-type(3) {
     transform: rotateY(270deg) translateX(-50%);
     transform-origin: center left;
    }

    .spinner div:nth-of-type(4) {
     transform: rotateX(90deg) translateY(-50%);
     transform-origin: top center;
    }

    .spinner div:nth-of-type(5) {
     transform: rotateX(-90deg) translateY(50%);
     transform-origin: bottom center;
    }

    .spinner div:nth-of-type(6) {
     transform: translateZ(22px);
    }

    @keyframes spinner-y0fdc1 {
     0% {
      transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
     }

     50% {
      transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
     }

     100% {
      transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
     }
    }`;

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey);
      setShowApiKeyModal(false);
      setMessages([{ role: 'assistant', content: 'API key saved! How can I assist you today?' }]);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#05010A] via-[#050016] to-[#050018] text-gray-100 flex">
      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">OpenAI API Key</h3>
              <button 
                onClick={() => setShowApiKeyModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Using temporary key for testing. Replace with your own OpenAI API key when ready.
            </p>
            <form onSubmit={handleApiKeySubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="sk-..."
                  required
                />
                <p className="mt-2 text-xs text-gray-400">
                  Get your API key from{' '}
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    OpenAI's website
                  </a>
                </p>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('openai_api_key');
                    setApiKey('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
                >
                  Clear Key
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Save API Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Left sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-black/80 border-r border-white/5 flex flex-col justify-between p-4">
          {/* Logo / brand */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-400 flex items-center justify-center text-sm font-semibold">
                  D
                </div>
                <span className="text-lg font-semibold tracking-tight">Dev Ai</span>
              </div>
              <button 
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <button type="button" className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-black py-2.5 text-sm font-medium transition-all duration-300 hover:bg-gray-50 hover:shadow-lg hover:shadow-white/25 hover:scale-[1.02] hover:border hover:border-white/20">
              <span className="inline-block h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center transition-transform duration-300 hover:rotate-90">
                +
              </span>
              New Chat
            </button>

            {/* Primary navigation */}
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-2 cursor-pointer flex items-center justify-between" onClick={() => setFeaturesExpanded(!featuresExpanded)}>
                Features
                <ChevronDown className={`transform transition-transform ${featuresExpanded ? 'rotate-180' : ''}`} size={12} />
              </p>
              {featuresExpanded && (
                <nav className="space-y-1 text-sm">
                  <button type="button" className="w-full flex items-center justify-between rounded-lg px-2.5 py-2 bg-white/5 text-white">
                    <span>Chat</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </button>
                  <button type="button" className="w-full text-left rounded-lg px-2.5 py-2 text-gray-400 hover:bg-white/5 hover:text-gray-100">
                    Library
                  </button>
                </nav>
              )}
            </div>

            {/* Workspaces */}
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-2 cursor-pointer flex items-center justify-between" onClick={() => setWorkspacesExpanded(!workspacesExpanded)}>
                Workspaces
                <ChevronDown className={`transform transition-transform ${workspacesExpanded ? 'rotate-180' : ''}`} size={12} />
              </p>
              {workspacesExpanded && (
                <nav className="space-y-1 text-sm text-gray-300">
                  <button type="button" className="w-full text-left rounded-lg px-2.5 py-2 hover:bg-white/5">
                    New Project
                  </button>
                </nav>
              )}
            </div>
          </div>

          {/* Upgrade card */}
          <div className="mt-4">
            <div className="holographic-card">
              <button type="button" onClick={() => navigate('/plans')}>
                Upgrade
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main panel */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowApiKeyModal(true)}
              className="text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5"
            >
              <Key size={12} />
              {apiKey.startsWith('sk-') ? 'API Key Set' : 'Set API Key'}
            </button>
            {!sidebarOpen && (
              <button 
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            )}
            {/* Model Selector */}
            <div className="relative">
              <div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-xs text-gray-200 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setModelDropdownExpanded(!modelDropdownExpanded)}
              >
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1" />
                <span className="font-medium">{selectedModel}</span>
                <ChevronDown className={`transform transition-transform ${modelDropdownExpanded ? 'rotate-180' : ''} ml-1`} size={12} />
              </div>

              {modelDropdownExpanded && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 border border-white/10 rounded-lg shadow-lg z-50 min-w-48">
                  <div className="py-1">
                    {[
                      { name: "ChatGPT v4.0", status: "online" },
                      { name: "GPT-4 Turbo", status: "online" },
                      { name: "GPT-3.5 Turbo", status: "online" },
                      { name: "Claude 3.5 Sonnet", status: "online" },
                      { name: "Gemini Pro", status: "maintenance" },
                      { name: "Llama 3.1", status: "online" }
                    ].map((model) => (
                      <button
                        key={model.name}
                        type="button"
                        className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-200 hover:bg-white/10 transition-colors"
                        onClick={() => {
                          setSelectedModel(model.name);
                          setModelDropdownExpanded(false);
                        }}
                      >
                        <span>{model.name}</span>
                        <span className={`inline-flex h-1.5 w-1.5 rounded-full ${
                          model.status === 'online' ? 'bg-emerald-400' : 'bg-yellow-400'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </header>

        {/* Chat messages area */}
        <section className="flex-1 overflow-y-auto px-6 py-4">
          {messages.length === 1 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="relative mb-6">
                <Loader />
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-wide mb-1">
                Ready to Create Something New?
              </h1>
              <p className="text-sm text-gray-400 mb-8">
                Ask anything and we will help you build, design, or present it.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white' 
                        : 'bg-white/5 text-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 text-gray-200 rounded-2xl px-4 py-3 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Chat input */}
        <div className="p-4 border-t border-white/5">
          <form 
            onSubmit={handleSendMessage}
            className="w-full max-w-3xl mx-auto rounded-3xl bg-black/40 border border-white/10 shadow-[0_0_60px_rgba(15,23,42,0.8)] p-4"
          >
            <div className="rounded-2xl bg-white/5 px-4 py-3 relative">
              {!inputValue && (
                <div
                  key={placeholderText}
                  className="absolute top-3 left-4 text-sm text-gray-500 pointer-events-none animate-fade-in-up"
                >
                  {placeholderText}
                </div>
              )}
              <textarea
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent resize-none border-none outline-none text-sm text-gray-100 mb-2"
                style={{ minHeight: '24px' }}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <button type="button" onClick={() => setShowOptions(!showOptions)} className="flex items-center hover:text-white">
                      <BringToFront size={14} />
                    </button>
                    {showOptions && (
                      <>
                        <button type="button" className="hover:text-gray-200">Attach</button>
                        <button type="button" className="hover:text-gray-200">Settings</button>
                      </>
                    )}
                  </div>
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={handleZapClick} 
                      className="flex items-center hover:text-white transition-colors"
                    >
                      <Zap size={14} />
                    </button>
                    {showAIModels && (
                      <div className="absolute bottom-full left-0 mb-2 w-48 bg-black/90 border border-white/10 rounded-lg shadow-lg py-2">
                        {aiModels.map((model, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setSelectedModel(model);
                              setShowAIModels(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            {model}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center text-xs text-gray-200 hover:bg-white/10"
                    onClick={() => {
                      // Voice input functionality can be added here
                      alert('Voice input will be implemented here');
                    }}
                  >
                    <Mic size={14} />
                  </button>
                  <button 
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-lg shadow-[0_0_25px_rgba(236,72,153,0.7)] hover:brightness-110 ${
                      isLoading || !inputValue.trim()
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-tr from-fuchsia-500 to-purple-500'
                    }`}
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      '↑'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chat;