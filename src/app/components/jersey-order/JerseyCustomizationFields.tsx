import { Sparkles, AlertCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface JerseyCustomizationFieldsProps {
  printingName: string;
  setPrintingName: (val: string) => void;
  printingNumber: string;
  setPrintingNumber: (val: string) => void;
  kitSize: string;
  setKitSize: (val: string) => void;
  errors: Record<string, string>;
}

export function JerseyCustomizationFields({
  printingName,
  setPrintingName,
  printingNumber,
  setPrintingNumber,
  kitSize,
  setKitSize,
  errors,
}: JerseyCustomizationFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Printing Customization Box */}
      <div className="p-4 bg-[#0A0E27] border border-white/15 rounded-2xl space-y-4">
        <div className="text-xs font-semibold text-[#FFB800] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={14} /> Jersey Printing Customization
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Field 6: Printing Name */}
          <div className="space-y-1.5">
            <Label htmlFor="printingName" className="text-xs font-medium text-gray-300">
              6. Printing Name (Appears on Jersey) <span className="text-[#FF6B35]">*</span>
            </Label>
            <Input
              id="printingName"
              type="text"
              maxLength={16}
              placeholder="e.g. SURYA"
              value={printingName}
              onChange={(e) => setPrintingName(e.target.value.toUpperCase())}
              className="bg-[#121A42] border-white/20 text-white uppercase placeholder:text-gray-600 h-10 font-bold focus:border-[#FF6B35]"
            />
            {errors.printingName && <p className="text-xs text-red-400">{errors.printingName}</p>}
          </div>

          {/* Field 7: Printing Number */}
          <div className="space-y-1.5">
            <Label htmlFor="printingNumber" className="text-xs font-medium text-gray-300">
              7. Printing Number (Appears on Jersey) <span className="text-[#FF6B35]">*</span>
            </Label>
            <Input
              id="printingNumber"
              type="number"
              min="0"
              max="99"
              placeholder="e.g. 10"
              value={printingNumber}
              onChange={(e) => setPrintingNumber(e.target.value.slice(0, 2))}
              className="bg-[#121A42] border-white/20 text-white placeholder:text-gray-600 h-10 font-bold focus:border-[#FF6B35]"
            />
            {errors.printingNumber && <p className="text-xs text-red-400">{errors.printingNumber}</p>}
          </div>
        </div>
      </div>

      {/* Field 8: Kit Size */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-200">
            8. Kit Size <span className="text-[#FF6B35]">*</span>
          </Label>
        </div>
        <Select value={kitSize} onValueChange={setKitSize}>
          <SelectTrigger className="bg-[#0A0E27] border-white/15 text-white h-11">
            <SelectValue placeholder="Select Kit Size" />
          </SelectTrigger>
          <SelectContent className="bg-[#121A42] border-white/20 text-white">
            <SelectItem value="Kids 26 (Age 6-8)">Kids 26 (Age 6-8)</SelectItem>
            <SelectItem value="Kids 28 (Age 8-10)">Kids 28 (Age 8-10)</SelectItem>
            <SelectItem value="Kids 30 (Age 10-12)">Kids 30 (Age 10-12)</SelectItem>
            <SelectItem value="Kids 32 (Age 12-14)">Kids 32 (Age 12-14)</SelectItem>
            <SelectItem value="XS (34)">Extra Small - XS (34")</SelectItem>
            <SelectItem value="S (36)">Small - S (36")</SelectItem>
            <SelectItem value="M (38)">Medium - M (38")</SelectItem>
            <SelectItem value="L (40)">Large - L (40")</SelectItem>
            <SelectItem value="XL (42)">Extra Large - XL (42")</SelectItem>
            <SelectItem value="XXL (44)">Double XL - XXL (44")</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="p-2.5 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-xl text-xs text-[#FF6B35] font-medium flex items-center gap-2">
          <AlertCircle size={14} className="shrink-0" />
          <span>Academy Players please order kit after Trial Kit Checked with Coach</span>
        </div>
        {errors.kitSize && <p className="text-xs text-red-400">{errors.kitSize}</p>}
      </div>
    </div>
  );
}
