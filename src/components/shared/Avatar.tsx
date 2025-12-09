'use client';

interface AvatarProps {
  src?: string;
  initial?: string;
}

export default function Avatar({ src, initial }: AvatarProps) {
  return (
    <div className="w-8 h-8 rounded-full bg-[#D5C6B4] border-[3px] border-[var(--bg-main)] flex items-center justify-center text-[10px] font-bold text-[#202030] relative -ml-3 first:ml-0 transition-colors duration-500">
      {src ? (
        <img src={src} className="w-full h-full rounded-full object-cover" alt="" />
      ) : (
        initial
      )}
    </div>
  );
}
