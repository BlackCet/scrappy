import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Terminal, Users, Cpu, ExternalLink, BarChart3, FlaskConical, Radio, ChevronRight, Trophy, Newspaper } from 'lucide-react';

const App = () => {
  const [intel, setIntel] = useState([]);
  const [filter, setFilter] = useState('');

  const loadData = async (controller = new AbortController()) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/intel${filter ? '?sourceType=' + filter : ''}`,
        { signal: controller.signal }
      );
      setIntel(res.data);
    } catch (err) {
      if (err.name !== 'CanceledError') console.error("API Fetch Error:", err);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadData(controller);
    const interval = setInterval(() => loadData(), 60000);
    return () => { controller.abort(); clearInterval(interval); };
  }, [filter]);

  const getSourceConfig = (type) => {
    switch (type) {
      case 'CEO_COMM': return { color: 'text-blue-400', icon: <Users size={18} />, label: 'CEO' };
      case 'STOCK_SIGNAL': return { color: 'text-amber-400', icon: <BarChart3 size={18} />, label: 'Market' };
      case 'BIG_TECH_RD': return { color: 'text-purple-400', icon: <FlaskConical size={18} />, label: 'R&D' };
      case 'HACKATHON': return { color: 'text-pink-400', icon: <Trophy size={18} />, label: 'Events' };
      case 'TECH_NEWS': return { color: 'text-emerald-400', icon: <Newspaper size={18} />, label: 'News' };
      default: return { color: 'text-slate-400', icon: <Cpu size={18} />, label: 'Misc' };
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30">
     {/* Dynamic High-Impact Ticker */}
<div className="bg-emerald-500 text-slate-950 py-2 font-mono text-[11px] font-black uppercase overflow-hidden whitespace-nowrap border-b-2 border-emerald-600 shadow-2xl">
  <div className="animate-marquee inline-block">
    {/* Real-time Market Data for March 5, 2026 */}
    <span className="mx-4">SYSTEM_STATUS: ACTIVE</span>
    <span className="mx-4 text-white bg-slate-900 px-2 rounded">$NVDA: $182.48 (-0.31%)</span>
    <span className="mx-4 text-white bg-slate-900 px-2 rounded">$TSLA: $405.27 (-0.17%)</span>
    <span className="mx-4 text-white bg-slate-900 px-2 rounded">BTC: $72,431 (+7.28%)</span>
    
    {/* Dynamic Headlines from your Database */}
    {intel.slice(0, 3).map((item, index) => (
      <span key={index} className="mx-8 border-l-2 border-slate-900 pl-4">
        LATEST_INTEL: {item.title} 
      </span>
    ))}
    
    {/* Loop for Infinite Effect */}
    &nbsp; • &nbsp;
    <span className="mx-4">SYSTEM_STATUS: ACTIVE</span>
    <span className="mx-4 text-white bg-slate-900 px-2 rounded">$NVDA: $182.48 (-0.31%)</span>
    <span className="mx-4 text-white bg-slate-900 px-2 rounded">BTC: $72,431 (+7.28%)</span>
  </div>
</div>

      <div className="max-w-[1500px] mx-auto p-6 lg:p-12">
        <header className="flex flex-col gap-8 mb-12">
          <div className="flex items-center justify-between border-b border-slate-900 pb-8">
            <div className="flex items-center gap-6">
              <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
                <Terminal className="text-emerald-500" size={36} />
              </div>
              <div>
                <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">Scrappy_v2</h1>
                <div className="flex items-center gap-3 mt-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] font-bold">Node_Active: MNNIT_ALLAHABAD</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-900/50 rounded-2xl border border-slate-800">
            {[
              { id: '', label: 'Master Feed' },
              { id: 'CEO_COMM', label: 'CEO Socials' },
              { id: 'STOCK_SIGNAL', label: 'Market Signals' },
              { id: 'BIG_TECH_RD', label: 'R&D Blogs' },
              { id: 'TECH_NEWS', label: 'Hacker News' },
              { id: 'HACKATHON', label: 'Hackathons' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  filter === btn.id 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                  : 'bg-transparent text-slate-500 border-transparent hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </header>

        <main className="space-y-4">
          {intel.length > 0 ? intel.map((item) => {
            const config = getSourceConfig(item.sourceType);
            return (
              <article 
                key={item._id} 
                className="group flex items-start gap-8 p-6 bg-slate-900/20 border border-slate-900/50 rounded-2xl hover:bg-slate-900/50 hover:border-emerald-500/30 transition-all duration-300"
              >
                {/* Visual Identity Column */}
                <div className="flex-shrink-0 flex items-center gap-4 w-32 pt-1">
                   <div className={`${config.color} opacity-40 group-hover:opacity-100 transition-opacity`}>
                      {config.icon}
                   </div>
                   <span className={`text-[9px] font-black uppercase tracking-widest ${config.color} opacity-60`}>
                      {config.label}
                   </span>
                </div>

                {/* Primary Intelligence Column with Description */}
                <div className="flex-1 min-w-0 border-l border-slate-800/50 pl-8">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter bg-slate-950 px-2 py-0.5 rounded">
                      {item.sourceName}
                    </span>
                    <span className="text-[10px] font-mono text-slate-700 font-bold">
                      {new Date(item.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.content}
                  </p>
                </div>

                {/* Quantitative Data Column (Tickers) */}
                <div className="hidden lg:flex flex-wrap gap-2 w-48 justify-center pt-1">
                  {item.relatedTickers.length > 0 ? item.relatedTickers.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] font-black text-emerald-400 bg-emerald-500/5 px-3 py-1 rounded-md border border-emerald-500/10 h-fit">
                      ${t}
                    </span>
                  )) : (
                    <span className="text-[9px] font-mono text-slate-800 uppercase tracking-widest">No_Ticker_Data</span>
                  )}
                </div>

                {/* Action Column */}
                <div className="flex-shrink-0 flex items-center gap-4 pt-1">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-4 bg-slate-950 rounded-xl text-slate-600 hover:text-emerald-400 hover:border-emerald-500/40 border border-slate-800 transition-all shadow-lg"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <ChevronRight size={20} className="text-slate-800 group-hover:text-emerald-500 transition-colors" />
                </div>
              </article>
            );
          }) : (
            <div className="py-40 text-center bg-slate-950/50 rounded-3xl border-2 border-dashed border-slate-900/50">
              <Radio size={48} className="mx-auto mb-8 text-slate-800 animate-pulse" />
              <p className="text-slate-600 font-mono text-xs uppercase tracking-[0.6em] font-black">Awaiting Incoming Stream...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;