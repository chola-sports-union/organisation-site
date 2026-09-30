import { CheckCircle2, Printer, ShieldAlert } from "lucide-react";
import { Button } from "../ui/button";
import { OrderSuccessData } from "./types";

interface JerseySuccessCardProps {
  orderSuccess: OrderSuccessData;
  printingName: string;
  printingNumber: string;
  kitSize: string;
  quantity: number;
  onOrderAnother: () => void;
}

export function JerseySuccessCard({
  orderSuccess,
  printingName,
  printingNumber,
  kitSize,
  quantity,
  onOrderAnother,
}: JerseySuccessCardProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={44} />
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">Order Submitted Successfully!</h2>
      <p className="text-gray-300 mb-6">
        Thank you for ordering your Chola FC Official Kit. Your order reference ID is{" "}
        <span className="font-mono text-[#FFB800] font-bold">{orderSuccess.orderId}</span>.
      </p>

      <div className="bg-[#121A42] border border-white/10 rounded-2xl p-6 text-left mb-6 space-y-3">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            Order & Customization Summary
          </h3>
          <button
            onClick={handlePrint}
            className="text-xs text-[#FFB800] hover:text-white flex items-center gap-1 font-semibold transition-colors print:hidden"
          >
            <Printer size={14} /> Print / Save PDF
          </button>
        </div>

        <div className="flex justify-between text-sm text-gray-300">
          <span>Player Name on Jersey:</span>
          <span className="font-bold text-white uppercase">{printingName}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-300">
          <span>Jersey Number:</span>
          <span className="font-bold text-[#FFB800]">#{printingNumber}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-300">
          <span>Kit Size & Qty:</span>
          <span className="text-white">
            {kitSize} ({quantity}x)
          </span>
        </div>
        <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
          <span>Total Amount:</span>
          <span className="text-[#FF6B35]">₹{orderSuccess.total}</span>
        </div>
      </div>

      {/* Printing & Customization Terms Box */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 mb-6 text-left space-y-1.5">
        <div className="font-bold text-white flex items-center gap-1.5 text-sm">
          <ShieldAlert size={16} className="text-[#FFB800]" /> Customization & Printing Policy
        </div>
        <p className="text-gray-300 leading-relaxed">
          Your jersey will be printed using the exact name (<strong>{printingName.toUpperCase()}</strong>) and number (<strong>#{printingNumber}</strong>) submitted above. Please save or print this summary for your records. Custom-printed kits cannot be modified once in production.
        </p>
      </div>

      <div className="p-4 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl text-xs text-[#FFB800] mb-8 text-left">
        💡 <strong>Note for Academy Players:</strong> Please verify your size with your head coach before final kit distribution. For assistance, contact our team at <strong>+91 89255 18891</strong>.
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center print:hidden">
        <Button
          onClick={handlePrint}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Printer size={16} /> Save / Print Order Receipt
        </Button>
        <Button
          onClick={onOrderAnother}
          className="bg-gradient-to-r from-[#FF6B35] to-[#FFB800] hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl"
        >
          Order Another Kit
        </Button>
      </div>
    </div>
  );
}
