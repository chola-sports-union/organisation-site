import { Shirt } from "lucide-react";

interface JerseyPreviewProps {
  printingName: string;
  printingNumber: string;
}

export function JerseyPreview({ printingName, printingNumber }: JerseyPreviewProps) {
  return (
    <div className="bg-[#121A42] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <Shirt size={16} className="text-[#FF6B35]" /> Dynamic Back Preview
        </span>
        <span className="text-xs px-2.5 py-1 bg-white/10 text-gray-300 rounded-full">
          Customized Live
        </span>
      </div>

      {/* Jersey SVG Mockup */}
      <div className="relative aspect-[4/5] bg-gradient-to-b from-[#080C21] to-[#121A42] rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6 shadow-inner overflow-hidden">
        <div className="absolute inset-0 opacity-15 flex justify-around">
          <div className="w-1/5 bg-[#FF6B35] h-full transform -skew-x-12" />
          <div className="w-1/5 bg-[#FFB800] h-full transform -skew-x-12" />
          <div className="w-1/5 bg-[#FF6B35] h-full transform -skew-x-12" />
        </div>

        <div className="relative z-10 w-full max-w-[280px] h-[320px] flex flex-col items-center justify-center">
          <svg viewBox="0 0 300 350" className="w-full h-full filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]">
            <defs>
              <linearGradient id="jerseyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B1335" />
                <stop offset="50%" stopColor="#152156" />
                <stop offset="100%" stopColor="#0B1335" />
              </linearGradient>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#FFB800" />
              </linearGradient>
            </defs>

            {/* Jersey Back Shape */}
            <path 
              d="M 90 40 Q 150 65 210 40 L 275 85 L 245 140 L 220 120 L 220 320 L 80 320 L 80 120 L 55 140 L 25 85 Z" 
              fill="url(#jerseyGrad)" 
              stroke="rgba(255, 255, 255, 0.2)" 
              strokeWidth="3"
            />

            <path d="M 90 40 Q 150 65 210 40" fill="none" stroke="url(#goldGrad)" strokeWidth="6" />
            <line x1="25" y1="85" x2="55" y2="140" stroke="url(#goldGrad)" strokeWidth="4" />
            <line x1="275" y1="85" x2="245" y2="140" stroke="url(#goldGrad)" strokeWidth="4" />
            <path d="M 80 140 L 80 320" stroke="#FF6B35" strokeWidth="4" />
            <path d="M 220 140 L 220 320" stroke="#FF6B35" strokeWidth="4" />

            <text x="150" y="95" textAnchor="middle" fill="#FFB800" fontSize="11" fontWeight="bold" letterSpacing="3">
              CHOLA FC
            </text>

            <text 
              x="150" 
              y="145" 
              textAnchor="middle" 
              fill="#FFFFFF" 
              fontSize="22" 
              fontWeight="900" 
              letterSpacing="2"
              fontFamily="sans-serif"
            >
              {printingName ? printingName.toUpperCase() : "YOUR NAME"}
            </text>

            <text 
              x="150" 
              y="245" 
              textAnchor="middle" 
              fill="url(#goldGrad)" 
              fontSize="95" 
              fontWeight="900"
              fontFamily="sans-serif"
              stroke="#000000"
              strokeWidth="2"
            >
              {printingNumber ? printingNumber : "10"}
            </text>
          </svg>
        </div>
      </div>

      <p className="text-xs text-center text-gray-400 mt-3">
        Preview updates live as you enter printing name and number.
      </p>
    </div>
  );
}
