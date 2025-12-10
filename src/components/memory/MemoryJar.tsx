'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUp } from 'lucide-react';

interface Memory {
  id: number;
  text: string;
  date: string;
}

// BackButton component matching Aura.build
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm transition-all active:scale-95"
  >
    <ArrowLeft size={20} />
  </button>
);

export function MemoryJar() {
  const router = useRouter();
  const [memories, setMemories] = useState<Memory[]>([
    { id: 1, text: "The way she laughed at her own jokes", date: "Oct 12" },
    { id: 2, text: "Baking cinnamon rolls on Sunday", date: "Oct 15" },
    { id: 3, text: "Her favorite blue sweater", date: "Nov 01" }
  ]);
  const [newMemory, setNewMemory] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addMemory = () => {
    if (!newMemory.trim()) return;
    setIsAdding(true);
    setTimeout(() => {
      setMemories([...memories, { id: Date.now(), text: newMemory, date: "Just now" }]);
      setNewMemory("");
      setIsAdding(false);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 relative overflow-hidden transition-colors duration-500">
      {/* Gradient glow at top */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#DE9C52]/5 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="px-6 flex items-center justify-between mb-6 relative z-10">
        <BackButton onClick={() => router.back()} />
        <h2 className="font-serif text-2xl text-[var(--text-main)]">Memory Jar</h2>
        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative px-6 pb-32">
        {/* Jar Visualization */}
        <div className="relative w-64 h-80 mb-8 group">
          {/* Jar Lid */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#D5C6B4] rounded-lg shadow-sm z-20 border border-white/50 flex items-center justify-center">
            <div className="w-40 h-1 bg-white/30 rounded-full" />
          </div>

          {/* Jar Body */}
          <div className="w-full h-full bg-gradient-to-b from-white/30 to-white/10 rounded-b-[60px] rounded-t-[20px] border-[3px] border-[var(--glass-border)] shadow-[0_20px_40px_-10px_rgba(168,88,70,0.15)] backdrop-blur-sm relative overflow-hidden z-10">
            {/* Glass reflection */}
            <div className="absolute top-4 left-4 w-4 h-60 bg-gradient-to-b from-white/50 to-transparent rounded-full blur-[2px]" />

            {/* Memory Papers inside jar */}
            <div className="absolute inset-0 p-6 flex flex-wrap content-end gap-2 overflow-hidden">
              {memories.map((m, i) => (
                <div
                  key={m.id}
                  className="memory-paper bg-[#FEF9F3] p-2 shadow-sm border border-[#D5C6B4]/30 rounded-[2px] max-w-[80px] text-[4px] leading-tight text-[#202030]/60 overflow-hidden h-10 rotate-[-2deg] transition-all hover:scale-110 hover:z-50 hover:text-[8px] hover:w-auto hover:h-auto hover:max-w-[150px] cursor-pointer"
                  style={{
                    animationDelay: `${i * 1.2}s`,
                    transform: `rotate(${Math.random() * 10 - 5}deg)`
                  }}
                >
                  {m.text}
                </div>
              ))}
              {isAdding && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#DE9C52] w-6 h-6 rounded-full animate-bounce" />
              )}
            </div>
          </div>

          {/* Inner glow */}
          <div className="absolute bottom-4 right-6 w-32 h-32 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Input Section */}
        <div className="w-full relative z-20 animate-enter delay-200">
          <div className="glass-thick rounded-[24px] p-2 flex items-center gap-2 shadow-lg shadow-[#A85846]/5">
            <input
              value={newMemory}
              onChange={(e) => setNewMemory(e.target.value)}
              placeholder="Store a memory..."
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-[var(--text-main)] placeholder:text-[var(--text-muted)] font-serif"
              onKeyDown={(e) => e.key === 'Enter' && addMemory()}
            />
            <button
              onClick={addMemory}
              className="w-12 h-12 rounded-[18px] bg-[#DE9C52] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              disabled={!newMemory.trim()}
            >
              <ArrowUp size={20} />
            </button>
          </div>
          <p className="text-center text-xs text-[var(--text-muted)] mt-4">Shake to shuffle memories</p>
        </div>
      </div>
    </div>
  );
}
