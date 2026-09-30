import { useState, useMemo, useEffect } from "react";
import { 
  Shirt, 
  Sparkles,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";

import { ENV } from "../config/env";
import { 
  OrderType, 
  PaymentMethod, 
  SelectedItems, 
  OrderSuccessData, 
  FULL_KIT_PRICE, 
  SEPARATE_PRICES 
} from "../components/jersey-order/types";
import { JerseyPreview } from "../components/jersey-order/JerseyPreview";
import { JerseyPrintingControls } from "../components/jersey-order/JerseyPrintingControls";
import { JerseySuccessCard } from "../components/jersey-order/JerseySuccessCard";
import { KitPricingCard } from "../components/jersey-order/KitPricingCard";
import { PlayerInfoFields } from "../components/jersey-order/PlayerInfoFields";
import { KitSizeField } from "../components/jersey-order/KitSizeField";
import { KitPackageSelector } from "../components/jersey-order/KitPackageSelector";
import { QuantitySelector } from "../components/jersey-order/QuantitySelector";
import { OrderSummaryCard } from "../components/jersey-order/OrderSummaryCard";
import { PaymentMethodSelector } from "../components/jersey-order/PaymentMethodSelector";

export function JerseyOrder() {
  // Form Field States
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [printingName, setPrintingName] = useState("");
  const [printingNumber, setPrintingNumber] = useState("");
  const [kitSize, setKitSize] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  // Kit Item Selection Mode: 'full' or 'custom'
  const [orderType, setOrderType] = useState<OrderType>("full");
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    jersey: true,
    shorts: false,
    shockings: false,
  });

  // Payment Mode & Confirmation
  const [paidConfirmed, setPaidConfirmed] = useState(false);
  const [upiRefNumber, setUpiRefNumber] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<OrderSuccessData | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (orderSuccess) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [orderSuccess]);

  // Dynamic Fee Details Calculation
  const feeDetails = useMemo(() => {
    let unitPrice = 0;
    const itemsList: string[] = [];

    if (orderType === "full") {
      unitPrice = FULL_KIT_PRICE;
      itemsList.push("Full Official Kit (Jersey + Shorts + Shockings)");
    } else {
      if (selectedItems.jersey) {
        unitPrice += SEPARATE_PRICES.jersey;
        itemsList.push("Chola FC Official Jersey (₹485)");
      }
      if (selectedItems.shorts) {
        unitPrice += SEPARATE_PRICES.shorts;
        itemsList.push("Chola FC Official Shorts (₹285)");
      }
      if (selectedItems.shockings) {
        unitPrice += SEPARATE_PRICES.shockings;
        itemsList.push("Chola FC Official Shockings (₹445)");
      }
    }

    const total = unitPrice * quantity;
    return { unitPrice, total, itemsList };
  }, [orderType, selectedItems, quantity]);

  // Birth Year options (1950 to current year)
  const yearsList = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 75 }, (_, i) => (currentYear - i).toString());
  }, []);

  const handleCustomItemToggle = (item: keyof SelectedItems) => {
    setSelectedItems((prev) => {
      const updated = { ...prev, [item]: !prev[item] };
      if (!updated.jersey && !updated.shorts && !updated.shockings) {
        return prev;
      }
      return updated;
    });
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Full Name is required";
    if (!gender) errors.gender = "Please select gender";
    if (!birthYear) errors.birthYear = "Year of birth is required";
    if (!phone.trim() || !/^\d{10}$/.test(phone.trim().replace(/\D/g, ""))) {
      errors.phone = "Valid 10-digit phone number is required";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Valid email address is required";
    }
    if (!printingName.trim()) errors.printingName = "Printing name for jersey is required";
    if (!printingNumber.trim()) errors.printingNumber = "Printing number for jersey is required";
    if (!kitSize) errors.kitSize = "Please select your kit size";

    if (orderType === "custom" && !selectedItems.jersey && !selectedItems.shorts && !selectedItems.shockings) {
      errors.items = "Please select at least one item to order";
    }

    if (!paidConfirmed) {
      errors.paidConfirmed = "Please confirm the payment checkbox to proceed";
    }

    if (!screenshotFile && !upiRefNumber.trim()) {
      errors.verification = "Please attach a payment screenshot OR enter your 12-digit UTR reference number.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const orderId = "CHOLA-KIT-" + Math.floor(100000 + Math.random() * 900000);

    let screenshotBase64 = "";
    let screenshotName = "";

    if (screenshotFile) {
      screenshotName = screenshotFile.name;
      try {
        screenshotBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              let width = img.width;
              let height = img.height;
              const maxDim = 1000;
              if (width > maxDim || height > maxDim) {
                if (width > height) {
                  height = Math.round((height * maxDim) / width);
                  width = maxDim;
                } else {
                  width = Math.round((width * maxDim) / height);
                  height = maxDim;
                }
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL("image/jpeg", 0.7));
              } else {
                resolve((e.target?.result as string) || "");
              }
            };
            img.onerror = () => resolve((e.target?.result as string) || "");
            img.src = e.target?.result as string;
          };
          reader.onerror = () => resolve("");
          reader.readAsDataURL(screenshotFile);
        });
      } catch {
        screenshotBase64 = "";
      }
    }

    const payload = {
      orderId,
      name: name.trim(),
      gender,
      birthYear,
      phone: phone.trim(),
      email: email.trim(),
      printingName: printingName.trim().toUpperCase(),
      printingNumber: printingNumber.trim(),
      kitSize,
      orderType,
      itemsList: feeDetails.itemsList,
      quantity,
      total: feeDetails.total,
      paymentMethod: "manual_upi",
      paidConfirmed,
      upiRefNumber: upiRefNumber.trim(),
      screenshotBase64,
      screenshotName,
    };

    const webhookUrl = ENV.JERSEY_ORDER_WEBHOOK_URL;
    console.log("Submitting order payload to webhook URL:", webhookUrl);

    if (!webhookUrl || !webhookUrl.startsWith("http")) {
      console.error("CRITICAL ERROR: VITE_JERSEY_ORDER_WEBHOOK_URL is missing or invalid in environment!", webhookUrl);
      setFormErrors({ 
        submit: "Configuration Error: VITE_JERSEY_ORDER_WEBHOOK_URL is missing in production. Please check Vercel Environment Variables." 
      });
      setSubmitting(false);
      return;
    }

    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      setOrderSuccess({ orderId, total: feeDetails.total });
    } catch (err) {
      console.error("Order submit fetch error:", err);
      setFormErrors({ submit: "Failed to process order. Please check your internet connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Order Chola FC Official Jersey & Kit | Chola Football Club"
        description="Customize and order your official Chola FC jersey, shorts, and shockings with your custom printing name and number. Quick online & UPI payment options available."
        canonicalUrl={`${ENV.SITE_URL}/jersey-order`}
      />

      <div className="min-h-screen bg-[#0A0E27] pt-24 pb-20 text-white">
        {/* Header Hero Section */}
        <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0F163D] to-[#0A0E27] py-12 px-4 sm:px-6 lg:px-8">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35]/30 text-[#FF6B35] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={14} /> Official Chola FC Store
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
              Order Your <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB800] bg-clip-text text-transparent">Chola FC Kit</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-300 text-base sm:text-lg">
              Wear the colors with pride. Get your official customized match jersey, shorts, and shockings with your custom name and number!
            </p>
          </div>
        </div>

        {orderSuccess ? (
          <JerseySuccessCard
            orderSuccess={orderSuccess}
            printingName={printingName}
            printingNumber={printingNumber}
            kitSize={kitSize}
            quantity={quantity}
            onOrderAnother={() => {
              setOrderSuccess(null);
              setPrintingName("");
              setPrintingNumber("");
            }}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* LEFT COLUMN: Live Jersey Visualizer & Printing Customization */}
              <div className="lg:col-span-5 space-y-6">
                <JerseyPreview printingName={printingName} printingNumber={printingNumber} />
                <JerseyPrintingControls
                  printingName={printingName}
                  setPrintingName={setPrintingName}
                  printingNumber={printingNumber}
                  setPrintingNumber={setPrintingNumber}
                  errors={formErrors}
                />
                <KitPricingCard />
              </div>

              {/* RIGHT COLUMN: The Order Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="bg-[#121A42] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                  
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Shirt className="text-[#FF6B35]" /> Kit Order Details
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Please fill out all player & order details accurately.
                    </p>
                  </div>

                  {formErrors.submit && (
                    <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle size={16} /> {formErrors.submit}
                    </div>
                  )}

                  <PlayerInfoFields
                    name={name}
                    setName={setName}
                    gender={gender}
                    setGender={setGender}
                    birthYear={birthYear}
                    setBirthYear={setBirthYear}
                    phone={phone}
                    setPhone={setPhone}
                    email={email}
                    setEmail={setEmail}
                    errors={formErrors}
                    yearsList={yearsList}
                  />

                  <KitSizeField
                    kitSize={kitSize}
                    setKitSize={setKitSize}
                    errors={formErrors}
                  />

                  <KitPackageSelector
                    orderType={orderType}
                    setOrderType={setOrderType}
                    selectedItems={selectedItems}
                    onCustomItemToggle={handleCustomItemToggle}
                    errors={formErrors}
                  />

                  <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

                  <OrderSummaryCard feeDetails={feeDetails} quantity={quantity} />

                  <PaymentMethodSelector
                    feeDetails={feeDetails}
                    paidConfirmed={paidConfirmed}
                    setPaidConfirmed={setPaidConfirmed}
                    upiRefNumber={upiRefNumber}
                    setUpiRefNumber={setUpiRefNumber}
                    screenshotFile={screenshotFile}
                    setScreenshotFile={setScreenshotFile}
                    screenshotPreview={screenshotPreview}
                    setScreenshotPreview={setScreenshotPreview}
                    errors={formErrors}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FFB800] hover:opacity-95 text-white font-bold h-13 rounded-2xl text-base shadow-xl shadow-[#FF6B35]/20 flex items-center justify-center gap-2 mt-4"
                  >
                    {submitting ? (
                      <>Processing Order...</>
                    ) : (
                      <>
                        Confirm & Place Kit Order
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}
