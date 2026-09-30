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
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-6 print:hidden">
        <CheckCircle2 size={44} />
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 print:text-black print:text-2xl">
        Order Submitted Successfully!
      </h2>
      <p className="text-gray-300 mb-6 print:text-gray-700">
        Thank you for ordering your Chola FC Official Kit. Your order reference ID is{" "}
        <span className="font-mono text-[#FFB800] font-bold print:text-black">{orderSuccess.orderId}</span>.
      </p>

      {/* Main Printable Receipt Card */}
      <div className="bg-[#121A42] border border-white/10 rounded-2xl p-6 text-left mb-6 space-y-3 print-receipt-card shadow-2xl">
        <div className="border-b border-white/10 print-border-light pb-3 mb-3">
          <div className="font-extrabold text-lg text-white print-text-dark flex justify-between items-center">
            <span>CHOLA FC OFFICIAL KIT RECEIPT</span>
            <span className="text-xs font-mono text-[#FFB800] print-text-dark font-normal">
              {orderSuccess.orderId}
            </span>
          </div>
          <p className="text-xs text-gray-400 print-text-muted mt-0.5">
            Official Match Kit & Customization Receipt
          </p>
        </div>

        <div className="flex justify-between text-sm text-gray-300 print-text-dark">
          <span className="text-gray-400 print-text-muted">Player Name on Jersey:</span>
          <span className="font-bold text-white print-text-dark uppercase">{printingName}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-300 print-text-dark">
          <span className="text-gray-400 print-text-muted">Jersey Number:</span>
          <span className="font-bold text-[#FFB800] print-text-dark">#{printingNumber}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-300 print-text-dark">
          <span className="text-gray-400 print-text-muted">Kit Size & Quantity:</span>
          <span className="text-white print-text-dark font-semibold">
            {kitSize} ({quantity}x)
          </span>
        </div>
        <div className="flex justify-between text-base font-bold text-white print-text-dark pt-3 border-t border-white/10 print-border-light">
          <span>Total Amount Paid:</span>
          <span className="text-[#FF6B35] print-text-dark">₹{orderSuccess.total}</span>
        </div>
      </div>

      {/* Printing & Customization Terms Box */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 mb-6 text-left space-y-1.5 print-receipt-card">
        <div className="font-bold text-white print-text-dark flex items-center gap-1.5 text-sm">
          <ShieldAlert size={16} className="text-[#FFB800] print:hidden" /> Customization & Printing Policy
        </div>
        <p className="text-gray-300 print-text-muted leading-relaxed">
          Your kit will be printed using the exact name (<strong>{printingName.toUpperCase()}</strong>) and number (<strong>#{printingNumber}</strong>) submitted above. Please save or print this summary for your records. Custom-printed items cannot be modified once in production.
        </p>
      </div>

      <div className="p-4 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl text-xs text-[#FFB800] mb-8 text-left print-receipt-card">
        💡 <strong>Note for Academy Players:</strong> Please verify your size with your head coach before final kit distribution. For assistance, contact our team at <strong>+91 89255 18891</strong>.
      </div>

      {/* Single Action Row */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center print:hidden">
        <Button
          onClick={handlePrint}
          variant="outline"
          className="border-white/20 bg-white/5 hover:bg-white/15 hover:text-white text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <Printer size={18} className="text-[#FFB800]" /> Print Order Receipt
        </Button>
        <Button
          onClick={onOrderAnother}
          className="bg-gradient-to-r from-[#FF6B35] to-[#FFB800] hover:opacity-95 text-white font-bold px-8 py-3 rounded-xl cursor-pointer shadow-lg shadow-[#FF6B35]/20"
        >
          Order Another Kit
        </Button>
      </div>
    </div>
  );
}
