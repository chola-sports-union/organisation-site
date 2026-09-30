import { CreditCard, QrCode } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { PaymentMethod, FeeDetails } from "./types";

interface PaymentMethodSelectorProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (val: PaymentMethod) => void;
  feeDetails: FeeDetails;
  paidConfirmed: boolean;
  setPaidConfirmed: (val: boolean) => void;
  upiRefNumber: string;
  setUpiRefNumber: (val: string) => void;
  errors: Record<string, string>;
}

export function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
  feeDetails,
  paidConfirmed,
  setPaidConfirmed,
  upiRefNumber,
  setUpiRefNumber,
  errors,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4 pt-2">
      <Label className="text-sm font-medium text-gray-200">
        Payment Method <span className="text-[#FF6B35]">*</span>
      </Label>

      <RadioGroup 
        value={paymentMethod} 
        onValueChange={(val: PaymentMethod) => setPaymentMethod(val)}
        className="space-y-3"
      >
        {/* Online Payment Option */}
        <label 
          htmlFor="pay-cashfree"
          className={`cursor-pointer p-4 rounded-2xl border transition-all block ${
            paymentMethod === "cashfree"
              ? "bg-[#FF6B35]/10 border-[#FF6B35]"
              : "bg-[#0A0E27] border-white/15 hover:border-white/30"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="cashfree" id="pay-cashfree" className="mt-1" />
              <div>
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <CreditCard size={16} className="text-[#FF6B35]" /> Pay Online (UPI, Cards, NetBanking)
                </span>
                <p className="text-xs text-gray-400 mt-0.5">
                  Instant checkout via GPay, PhonePe, Paytm, Cards & NetBanking
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              Instant
            </span>
          </div>
        </label>

        {/* Manual UPI Option */}
        <div 
          className={`p-4 rounded-2xl border transition-all ${
            paymentMethod === "manual_upi"
              ? "bg-[#FF6B35]/10 border-[#FF6B35]"
              : "bg-[#0A0E27] border-white/15 hover:border-white/30"
          }`}
        >
          <label htmlFor="pay-upi" className="cursor-pointer flex items-start justify-between">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="manual_upi" id="pay-upi" className="mt-1" />
              <div>
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <QrCode size={16} className="text-[#FFB800]" /> Direct UPI Payment (8925518891)
                </span>
                <p className="text-xs text-gray-400 mt-0.5">
                  Send ₹{feeDetails.total} via GPay/PhonePe to <strong>8925518891</strong> (Chola Football Club)
                </p>
              </div>
            </div>
          </label>

          {paymentMethod === "manual_upi" && (
            <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
              <div className="p-3 bg-white/5 rounded-xl text-xs space-y-1 text-gray-300">
                <div className="flex justify-between">
                  <span>UPI Mobile/ID:</span>
                  <strong className="text-[#FFB800]">8925518891</strong>
                </div>
                <div className="flex justify-between">
                  <span>Account Name:</span>
                  <strong className="text-white">Chola Football Club</strong>
                </div>
              </div>

              {/* Field 11 Checkbox */}
              <div className="flex items-start gap-3 p-3 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-xl">
                <Checkbox
                  id="fee-paid-check"
                  checked={paidConfirmed}
                  onCheckedChange={(val) => setPaidConfirmed(!!val)}
                  className="mt-0.5 border-white/40 data-[state=checked]:bg-[#FF6B35]"
                />
                <label htmlFor="fee-paid-check" className="text-xs text-gray-200 cursor-pointer leading-snug">
                  <strong>11. Payment Confirmation:</strong> Ensure you paid your kit fee 
                  <span className="text-[#FFB800] font-bold"> ₹{feeDetails.total} </span> 
                  to Chola Football Club (8925518891)
                </label>
              </div>
              {errors.paidConfirmed && <p className="text-xs text-red-400">{errors.paidConfirmed}</p>}

              <div className="space-y-1">
                <Label htmlFor="utr" className="text-xs text-gray-300">
                  UPI Transaction Reference / UTR Number (Optional):
                </Label>
                <Input
                  id="utr"
                  type="text"
                  placeholder="e.g. 328402948102"
                  value={upiRefNumber}
                  onChange={(e) => setUpiRefNumber(e.target.value)}
                  className="bg-[#0A0E27] border-white/15 text-white text-xs h-9"
                />
              </div>
            </div>
          )}
        </div>
      </RadioGroup>
    </div>
  );
}
