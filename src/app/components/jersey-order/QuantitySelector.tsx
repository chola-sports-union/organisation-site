import { Info } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (val: number) => void;
}

export function QuantitySelector({ quantity, setQuantity }: QuantitySelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="quantity-input" className="text-sm font-medium text-gray-200">
          9. Quantity (Select or specify sets) <span className="text-[#FF6B35]">*</span>
        </Label>
        <span className="text-xs font-semibold text-[#FFB800]">
          Total Sets: {quantity}
        </span>
      </div>

      {/* Quick Selection Preset Buttons */}
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((qty) => (
          <button
            type="button"
            key={qty}
            onClick={() => setQuantity(qty)}
            className={`py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
              quantity === qty
                ? "bg-gradient-to-r from-[#FF6B35] to-[#FFB800] border-transparent text-white shadow-lg"
                : "bg-[#0A0E27] border-white/15 text-gray-300 hover:border-white/30"
            }`}
          >
            {qty} {qty === 1 ? "Set" : "Sets"}
          </button>
        ))}
      </div>

      {/* Numeric Stepper & Custom Input for More Than 3 Sets */}
      <div className="p-3 bg-[#0A0E27] border border-white/15 rounded-xl flex items-center justify-between gap-4">
        <div className="text-xs text-gray-300">
          Need a custom quantity (e.g. 4, 5, 10+ sets)?
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center"
          >
            -
          </button>
          <Input
            id="quantity-input"
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setQuantity(isNaN(val) || val < 1 ? 1 : val);
            }}
            className="w-16 h-8 bg-[#121A42] border-white/20 text-white font-bold text-center p-1 text-sm focus:border-[#FF6B35]"
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {quantity >= 10 && (
        <div className="p-2.5 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl text-xs text-[#FFB800] flex items-center gap-2">
          <Info size={16} className="shrink-0" />
          <span>
            <strong>Bulk Team Order ({quantity} sets):</strong> Contact our academy coordinator at <strong>+91 89255 18891</strong> for roster name/number details for full team orders.
          </span>
        </div>
      )}
    </div>
  );
}
