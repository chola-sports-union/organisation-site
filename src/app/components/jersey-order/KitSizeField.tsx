import { AlertCircle } from "lucide-react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface KitSizeFieldProps {
  kitSize: string;
  setKitSize: (val: string) => void;
  errors: Record<string, string>;
}

export function KitSizeField({ kitSize, setKitSize, errors }: KitSizeFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-200">
          Kit Size <span className="text-[#FF6B35]">*</span>
        </Label>
      </div>
      <Select value={kitSize} onValueChange={setKitSize}>
        <SelectTrigger className="bg-[#0A0E27] border-white/15 text-white h-11">
          <SelectValue placeholder="Select Kit Size" />
        </SelectTrigger>
        <SelectContent className="bg-[#121A42] border-white/20 text-white">
          <SelectItem value="Kids 24 (Age 4-5 Yrs)">Kids 24 (Age 4-5 Yrs)</SelectItem>
          <SelectItem value="Kids 26 (Age 6-7 Yrs)">Kids 26 (Age 6-7 Yrs)</SelectItem>
          <SelectItem value="Kids 28 (Age 8-9 Yrs)">Kids 28 (Age 8-9 Yrs)</SelectItem>
          <SelectItem value="Kids 30 (Age 10-11 Yrs)">Kids 30 (Age 10-11 Yrs)</SelectItem>
          <SelectItem value="Kids 32 (Age 12-13 Yrs)">Kids 32 (Age 12-13 Yrs)</SelectItem>
          <SelectItem value="XS (34) (Age 14-15 Yrs)">Extra Small - XS (34" / Age 14-15 Yrs)</SelectItem>
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
  );
}
