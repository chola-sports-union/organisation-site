import { ShoppingBag } from "lucide-react";
import { FeeDetails } from "./types";

interface OrderSummaryCardProps {
  feeDetails: FeeDetails;
  quantity: number;
}

export function OrderSummaryCard({ feeDetails, quantity }: OrderSummaryCardProps) {
  return (
    <div className="p-4 bg-gradient-to-br from-[#0A0E27] to-[#162156] border border-[#FFB800]/40 rounded-2xl space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FFB800] flex items-center gap-1.5">
          <ShoppingBag size={14} /> 10. Fee Details & Order Summary
        </span>
        <span className="text-xs text-gray-300 font-mono">
          Qty: {quantity} {quantity === 1 ? "Set" : "Sets"}
        </span>
      </div>

      <div className="space-y-1 text-xs text-gray-300">
        {feeDetails.itemsList.map((itemStr, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span>• {itemStr}</span>
          </div>
        ))}
        <div className="flex justify-between pt-1 text-gray-400">
          <span>Unit Rate per Set:</span>
          <span>₹{feeDetails.unitPrice}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        <span className="text-sm font-bold text-white">
          Total Amount Payable ({quantity}x):
        </span>
        <span className="text-xl font-extrabold text-[#FF6B35]">
          ₹{feeDetails.total}
        </span>
      </div>
    </div>
  );
}
