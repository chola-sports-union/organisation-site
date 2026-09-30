import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { OrderType, SelectedItems } from "./types";

interface KitPackageSelectorProps {
  orderType: OrderType;
  setOrderType: (val: OrderType) => void;
  selectedItems: SelectedItems;
  onCustomItemToggle: (item: keyof SelectedItems) => void;
  errors: Record<string, string>;
}

export function KitPackageSelector({
  orderType,
  setOrderType,
  selectedItems,
  onCustomItemToggle,
  errors,
}: KitPackageSelectorProps) {
  return (
    <div className="space-y-3 pt-2">
      <Label className="text-sm font-medium text-gray-200">
        Kit Selection Type <span className="text-[#FF6B35]">*</span>
      </Label>

      <RadioGroup 
        value={orderType} 
        onValueChange={(val: OrderType) => setOrderType(val)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        <label 
          htmlFor="full-kit"
          className={`cursor-pointer p-3.5 rounded-xl border transition-all block ${
            orderType === "full" 
              ? "bg-[#FF6B35]/15 border-[#FF6B35] text-white" 
              : "bg-[#0A0E27] border-white/15 text-gray-400 hover:border-white/30"
          }`}
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="full" id="full-kit" />
            <span className="font-bold text-white text-sm">
              Full Kit Package (₹1,199)
            </span>
          </div>
          <p className="text-xs text-gray-300 mt-1 pl-6">
            Includes Jersey + Shorts + Shockings
          </p>
        </label>

        <label 
          htmlFor="custom-kit"
          className={`cursor-pointer p-3.5 rounded-xl border transition-all block ${
            orderType === "custom" 
              ? "bg-[#FF6B35]/15 border-[#FF6B35] text-white" 
              : "bg-[#0A0E27] border-white/15 text-gray-400 hover:border-white/30"
          }`}
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="custom" id="custom-kit" />
            <span className="font-bold text-white text-sm">
              Order Items Separately
            </span>
          </div>
          <p className="text-xs text-gray-300 mt-1 pl-6">
            Select individual items needed
          </p>
        </label>
      </RadioGroup>

      {/* Custom Separate Items Checklist */}
      {orderType === "custom" && (
        <div className="p-3 bg-[#0A0E27] border border-white/15 rounded-xl space-y-2 mt-2">
          <div className="text-xs font-semibold text-gray-300 mb-1">Select Items:</div>
          
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
              <Checkbox 
                checked={selectedItems.jersey} 
                onCheckedChange={() => onCustomItemToggle("jersey")}
                className="border-white/40"
              />
              Jersey
            </label>
            <span className="text-xs font-bold text-[#FFB800]">₹485</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
              <Checkbox 
                checked={selectedItems.shorts} 
                onCheckedChange={() => onCustomItemToggle("shorts")}
                className="border-white/40"
              />
              Shorts
            </label>
            <span className="text-xs font-bold text-[#FFB800]">₹445</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
              <Checkbox 
                checked={selectedItems.shockings} 
                onCheckedChange={() => onCustomItemToggle("shockings")}
                className="border-white/40"
              />
              Shockings
            </label>
            <span className="text-xs font-bold text-[#FFB800]">₹285</span>
          </div>
          {errors.items && <p className="text-xs text-red-400">{errors.items}</p>}
        </div>
      )}
    </div>
  );
}
