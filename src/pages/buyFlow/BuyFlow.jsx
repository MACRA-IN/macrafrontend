import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import macraLogo from "../../assets/logo/Macra.png";

import Step1TierPlan from "../../components/buyFlow/Step1Tierplan";
import Step2Payment from "../../components/buyFlow/Step2Payment";
import Step3Confirm from "../../components/buyFlow/Step3Confirm";

const STEPS = ["Your Plan", "Payment", "Confirmed"];

export default function BuyFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState(null);
  const [plan, setPlan] = useState(null);
  const [slotChoice, setSlotChoice] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => {
    if (step === 1) navigate("/");
    else setStep((s) => s - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1TierPlan
            tier={tier}
            plan={plan}
            slotChoice={slotChoice}
            onSelectTier={setTier}
            onSelectPlan={setPlan}
            onSelectSlot={setSlotChoice}
            onContinue={goNext}
          />
        );
      case 2:
        return (
          <Step2Payment
            tier={tier}
            plan={plan}
            slotChoice={slotChoice}
            onSuccess={(data) => { setOrderData(data); goNext(); }}
          />
        );
      case 3:
        return <Step3Confirm tier={tier} plan={plan} orderData={orderData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-lg px-4 pb-12 pt-6">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          {step < 3 ? (
            <button
              onClick={goBack}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sage bg-white shadow-sm transition-colors hover:bg-sage/30"
            >
              <ChevronLeft size={18} className="text-forest" />
            </button>
          ) : (
            <div className="w-10" />
          )}
          <img src={macraLogo} alt="Macra" className="h-8 w-auto" />
          <span className="min-w-[40px] text-right text-sm font-medium text-text-muted">
            {step < 3 ? `${step} / 2` : ""}
          </span>
        </div>

        {/* Step progress */}
        {step < 3 && (
          <div className="mb-6">
            <div className="flex gap-1.5">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    n <= step ? "bg-emerald" : "bg-sage"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-xs font-medium text-text-muted">
              Step {step} of 2 · {STEPS[step - 1]}
            </p>
          </div>
        )}

        {/* Card */}
        <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
          {renderStep()}
        </div>

      </div>
    </div>
  );
}
