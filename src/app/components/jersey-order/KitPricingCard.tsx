import { ShoppingBag, Info } from "lucide-react";

export function KitPricingCard() {
  return (
    <div className="space-y-6">
      {/* Pricing Breakdown Card */}
      <div className="bg-[#121A42] border border-white/10 rounded-3xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShoppingBag size={18} className="text-[#FFB800]" /> Kit Pricing Breakdown
        </h3>

        <div className="space-y-3 text-sm">
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">Full Kit Package</div>
              <div className="text-xs text-gray-400">Jersey + Shorts + Shockings</div>
            </div>
            <div className="text-[#FFB800] font-bold text-base">₹1,199</div>
          </div>

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">
            Individual Item Prices
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg">
              <div className="text-gray-300">Jersey</div>
              <div className="text-white font-bold mt-1">₹485</div>
            </div>
            <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg">
              <div className="text-gray-300">Shorts</div>
              <div className="text-white font-bold mt-1">₹285</div>
            </div>
            <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg">
              <div className="text-gray-300">Shockings</div>
              <div className="text-white font-bold mt-1">₹445</div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Assistance Notice */}
      <div className="bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-2xl p-4 text-xs text-gray-300 flex items-start gap-3">
        <Info size={20} className="text-[#FFB800] shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Need Coach Assistance for Sizing?</strong>
          <p className="mt-1 text-gray-400">
            Academy players can try on trial kits at the ground with coaches before selecting size.
          </p>
        </div>
      </div>
    </div>
  );
}
