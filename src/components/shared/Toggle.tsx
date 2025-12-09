'use client';

interface ToggleProps {
  active: boolean;
  onToggle: () => void;
}

export default function Toggle({ active, onToggle }: ToggleProps) {
  return (
    <div
      onClick={onToggle}
      className={`w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${
        active ? 'bg-[#DE9C52]' : 'bg-[#D5C6B4]'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
          active ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </div>
  );
}
