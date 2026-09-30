import { QrCode, ShieldCheck, CheckCircle2, Upload, FileCheck, X, Image as ImageIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { FeeDetails } from "./types";

interface PaymentMethodSelectorProps {
  feeDetails: FeeDetails;
  paidConfirmed: boolean;
  setPaidConfirmed: (val: boolean) => void;
  upiRefNumber: string;
  setUpiRefNumber: (val: string) => void;
  screenshotFile: File | null;
  setScreenshotFile: (file: File | null) => void;
  screenshotPreview: string | null;
  setScreenshotPreview: (url: string | null) => void;
  errors: Record<string, string>;
}

export function PaymentMethodSelector({
  feeDetails,
  paidConfirmed,
  setPaidConfirmed,
  upiRefNumber,
  setUpiRefNumber,
  screenshotFile,
  setScreenshotFile,
  screenshotPreview,
  setScreenshotPreview,
  errors,
}: PaymentMethodSelectorProps) {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotFile(file);
      const url = URL.createObjectURL(file);
      setScreenshotPreview(url);
    }
  };

  const removeFile = () => {
    setScreenshotFile(null);
    if (screenshotPreview) {
      URL.revokeObjectURL(screenshotPreview);
      setScreenshotPreview(null);
    }
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="border-t border-white/10 pt-4">
        <Label className="text-base font-bold text-white flex items-center gap-2">
          <QrCode size={18} className="text-[#FFB800]" /> Direct UPI Payment Details
        </Label>
        <p className="text-xs text-gray-400 mt-0.5">
          Pay your total kit fee directly using GPay, PhonePe, Paytm, or any UPI App to the club account.
        </p>
      </div>

      {/* Main UPI Payment Card */}
      <div className="p-5 bg-gradient-to-b from-[#0A0E27] to-[#121A42] border border-[#FF6B35]/40 rounded-2xl space-y-4 shadow-xl">
        
        {/* Account Details Box */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
            <span className="text-gray-300">UPI Number / GPay / PhonePe:</span>
            <strong className="text-[#FFB800] text-base font-mono">8925518891</strong>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-300">
            <span>Account Holder:</span>
            <strong className="text-white">Chola Football Club</strong>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-300">
            <span>Amount Payable:</span>
            <strong className="text-[#FF6B35] font-extrabold text-sm">₹{feeDetails.total}</strong>
          </div>
        </div>

        {/* Accepted Apps Badge */}
        <div className="flex items-center justify-between text-[11px] text-gray-400 bg-white/5 p-2.5 rounded-lg border border-white/5">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <ShieldCheck size={14} /> Direct Bank Transfer
          </span>
          <span>Supports: GPay • PhonePe • Paytm • BHIM</span>
        </div>

        {/* Checkbox 1: Confirmation */}
        <div className="space-y-1">
          <div className="flex items-start gap-3 p-3 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-xl">
            <Checkbox
              id="fee-paid-check"
              checked={paidConfirmed}
              onCheckedChange={(val) => setPaidConfirmed(!!val)}
              className="mt-0.5 border-white/40 data-[state=checked]:bg-[#FF6B35]"
            />
            <label htmlFor="fee-paid-check" className="text-xs text-gray-200 cursor-pointer leading-snug">
              <strong>11. Payment Confirmation:</strong> I confirm that I have transferred{" "}
              <span className="text-[#FFB800] font-bold">₹{feeDetails.total}</span> to Chola Football Club (8925518891) via UPI. <span className="text-[#FF6B35]">*</span>
            </label>
          </div>
          {errors.paidConfirmed && <p className="text-xs text-red-400 pl-1">{errors.paidConfirmed}</p>}
        </div>

        {/* Payment Proof Section: Attachment OR Ref Number */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <Label className="text-xs font-semibold text-gray-200 flex items-center justify-between">
            <span>12. Payment Proof Verification <span className="text-[#FF6B35]">*</span></span>
            <span className="text-[10px] text-[#FFB800] font-normal">Provide Screenshot OR UTR Number</span>
          </Label>

          {/* Option A: Upload Payment Screenshot */}
          <div className="p-3 bg-[#0A0E27] border border-white/15 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Upload size={14} className="text-[#FF6B35]" /> Option A: Attach Payment Screenshot
              </span>
              <span className="text-[10px] text-gray-400">GPay / PhonePe / Paytm receipt</span>
            </div>

            {screenshotFile ? (
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  {screenshotPreview ? (
                    <img src={screenshotPreview} alt="Payment Screenshot" className="w-10 h-10 object-cover rounded border border-white/20 shrink-0" />
                  ) : (
                    <FileCheck size={20} className="text-emerald-400 shrink-0" />
                  )}
                  <div className="truncate text-xs">
                    <div className="font-semibold text-emerald-300 truncate">{screenshotFile.name}</div>
                    <div className="text-[10px] text-gray-400">{(screenshotFile.size / 1024).toFixed(1)} KB</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors ml-2"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label htmlFor="screenshot-upload" className="cursor-pointer border-2 border-dashed border-white/20 hover:border-[#FF6B35]/60 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all bg-white/5">
                <ImageIcon size={20} className="text-gray-400 mb-1" />
                <span className="text-xs font-semibold text-gray-300">Tap to upload payment screenshot</span>
                <span className="text-[10px] text-gray-500">JPG, PNG, WEBP (Max 5MB)</span>
                <input
                  id="screenshot-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="text-center text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
            — OR —
          </div>

          {/* Option B: UTR / Ref Number Field */}
          <div className="space-y-1">
            <Label htmlFor="utr" className="text-xs text-gray-300">
              Option B: Enter 12-Digit UTR / Transaction Reference Number
            </Label>
            <Input
              id="utr"
              type="text"
              placeholder="e.g. 328402948102"
              value={upiRefNumber}
              onChange={(e) => setUpiRefNumber(e.target.value)}
              className="bg-[#0A0E27] border-white/20 text-white placeholder:text-gray-600 h-10 font-mono text-sm focus:border-[#FF6B35]"
            />
          </div>

          {errors.verification && (
            <p className="text-xs text-red-400 font-medium p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              {errors.verification}
            </p>
          )}

        </div>

      </div>
    </div>
  );
}
