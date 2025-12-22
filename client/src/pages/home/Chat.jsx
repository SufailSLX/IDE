import React, { useState, useEffect } from "react";
import { BringToFront, ChevronDown, Zap, Mic } from "lucide-react";

const Chat = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Ask Anything...");
  const [inputValue, setInputValue] = useState("");
  const [workspacesExpanded, setWorkspacesExpanded] = useState(true);
  const [featuresExpanded, setFeaturesExpanded] = useState(true);
  const [modelDropdownExpanded, setModelDropdownExpanded] = useState(false);
  const [selectedModel, setSelectedModel] = useState("ChatGPT v4.0");
  const [showAIModels, setShowAIModels] = useState(false);

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

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#05010A] via-[#050016] to-[#050018] text-gray-100 flex">
      {/* Left sidebar */}
      <aside className="w-64 bg-black/80 border-r border-white/5 flex flex-col justify-between p-4">
        {/* Logo / brand */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-400 flex items-center justify-center text-sm font-semibold">
              D
            </div>
            <span className="text-lg font-semibold tracking-tight">Dev Ai</span>
          </div>

          <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-black py-2.5 text-sm font-medium hover:bg-gray-100 transition">
            <span className="inline-block h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
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
                <button className="w-full flex items-center justify-between rounded-lg px-2.5 py-2 bg-white/5 text-white">
                  <span>Chat</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </button>
                <button className="w-full text-left rounded-lg px-2.5 py-2 text-gray-400 hover:bg-white/5 hover:text-gray-100">
                  Archived
                </button>
                <button className="w-full text-left rounded-lg px-2.5 py-2 text-gray-400 hover:bg-white/5 hover:text-gray-100">
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
                <button className="w-full text-left rounded-lg px-2.5 py-2 hover:bg-white/5">
                  New Project
                </button>
               
              </nav>
            )}
          </div>
        </div>

        {/* Upgrade card */}
        <div className="mt-4 rounded-2xl bg-white/5 border border-white/10 p-4">

          <button className="w-full rounded-xl bg-white/10 py-2 text-xs font-medium hover:bg-white/20 transition">
            Upgrade
          </button>
        </div>
      </aside>

      {/* Main panel */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur">
          <div className="w-48" />

          {/* <div className="relative">
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-xs text-gray-200 cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => setModelDropdownExpanded(!modelDropdownExpanded)}
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1" />
              <span className="font-medium">{selectedModel}</span>
              <ChevronDown className={`transform transition-transform ${modelDropdownExpanded ? 'rotate-180' : ''} ml-1`} size={12} />
            </div>

            {modelDropdownExpanded && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-black/90 border border-white/10 rounded-lg shadow-lg z-50">
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
          </div> */}

          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 rounded-full text-xs bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10">
              Configuration
            </button>
            <button className="px-3 py-1.5 rounded-full text-xs bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10">
              Export
            </button>
          </div>
        </header>

        {/* Hero + input area */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 pb-6 pt-4">
          {/* Orb */}
          <div className="relative mb-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-indigo-400 shadow-[0_0_80px_rgba(168,85,247,0.8)]" />
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide mb-1">
            Ready to Create Something New?
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Ask anything and we will help you build, design, or present it.
          </p>

          {/* Chat input card */}
          <div className="w-full max-w-3xl rounded-3xl bg-black/40 border border-white/10 shadow-[0_0_60px_rgba(15,23,42,0.8)] p-4">
            {/* Input row */}
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
                className="w-full bg-transparent resize-none border-none outline-none text-sm text-gray-100 mb-2"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <button onClick={() => setShowOptions(!showOptions)} className="flex items-center hover:text-white">
                      <BringToFront size={14} />
                    </button>
                    {showOptions && (
                      <>
                        <button className="hover:text-gray-200">Attach</button>
                        <button className="hover:text-gray-200">Settings</button>
                      </>
                    )}
                  </div>
                  <div className="relative">
                    <button 
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
                  <button className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center text-xs text-gray-200 hover:bg-white/10">
                    <Mic size={14} />
                  </button>
                  <button className="h-9 w-9 rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-500 flex items-center justify-center text-white text-lg shadow-[0_0_25px_rgba(236,72,153,0.7)] hover:brightness-110">
                    ↑
                  </button>
                </div>
              </div>
            </div>
          </div>


        </section>
      </main>
    </div>
  );
};

export default Chat;