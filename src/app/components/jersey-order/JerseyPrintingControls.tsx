import { Sparkles } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface JerseyPrintingControlsProps {
  printingName: string;
  setPrintingName: (val: string) => void;
  printingNumber: string;
  setPrintingNumber: (val: string) => void;
  errors: Record<string, string>;
}

export function JerseyPrintingControls({
  printingName,
  setPrintingName,
  printingNumber,
  setPrintingNumber,
  errors,
}: JerseyPrintingControlsProps) {
  return (
    <div className="bg-[#121A42] border border-[#FF6B35]/30 rounded-3xl p-5 space-y-4 shadow-xl">
      <div className="text-xs font-bold text-[#FFB800] uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
        <Sparkles size={16} className="text-[#FF6B35]" /> Jersey Printing Customization
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Printing Name */}
        <div className="space-y-1.5">
          <Label htmlFor="printingName" className="text-xs font-medium text-gray-200">
            Printing Name (on Jersey) <span className="text-[#FF6B35]">*</span>
          </Label>
          <Input
            id="printingName"
            type="text"
            maxLength={16}
            placeholder="e.g. SURYA"
            value={printingName}
            onChange={(e) => setPrintingName(e.target.value.toUpperCase())}
            className="bg-[#0A0E27] border-white/20 text-white uppercase placeholder:text-gray-600 h-10 font-bold focus:border-[#FF6B35]"
          />
          {errors.printingName && <p className="text-xs text-red-400">{errors.printingName}</p>}
        </div>

        {/* Printing Number */}
        <div className="space-y-1.5">
          <Label htmlFor="printingNumber" className="text-xs font-medium text-gray-200">
            Printing Number (on Jersey) <span className="text-[#FF6B35]">*</span>
          </Label>
          <Input
            id="printingNumber"
            type="number"
            min="0"
            max="99"
            placeholder="e.g. 10"
            value={printingNumber}
            onChange={(e) => setPrintingNumber(e.target.value.slice(0, 2))}
            className="bg-[#0A0E27] border-white/20 text-white placeholder:text-gray-600 h-10 font-bold focus:border-[#FF6B35]"
          />
          {errors.printingNumber && <p className="text-xs text-red-400">{errors.printingNumber}</p>}
        </div>
      </div>
      <p className="text-[11px] text-gray-400 text-center">
        ⚡ Type your name & number above to customize the jersey preview live.
      </p>
    </div>
  );
}
