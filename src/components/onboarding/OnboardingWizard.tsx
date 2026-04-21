import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store/useAppStore";

const stepVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 25, stiffness: 200 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

const GOALS = [
  { id: "save", title: "Save for a life goal", desc: "House, car, or tropical vacation", icon: "fa-solid fa-house" },
  { id: "debt", title: "Crush my debt", desc: "Credit cards, student loans, or mortgage", icon: "fa-solid fa-hammer" },
  { id: "track", title: "Track spending", desc: "Know exactly where every penny goes", icon: "fa-solid fa-chart-column" },
  { id: "business", title: "Manage side hustle", desc: "Separate business from personal life", icon: "fa-solid fa-briefcase" },
];

export const OnboardingWizard = () => {
  const { isOnboardingComplete, setOnboardingComplete } = useAppStore();
  const [isOpen, setIsOpen] = useState(!isOnboardingComplete);
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState("");

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => (s > 1 ? s - 1 : s));
  
  const handleComplete = () => {
    setOnboardingComplete(true);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[600px] p-0 border-none shadow-premium-lg bg-card/95 backdrop-blur-2xl rounded-[32px] sm:rounded-[40px] flex flex-col max-h-[90vh]">
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-secondary/30 shrink-0">
          <motion.div 
            className="h-full bg-primary shadow-[0_0_10px_rgba(21,101,192,0.4)]" 
            initial={{ width: "25%" }}
            animate={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 sm:py-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6 sm:space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter leading-tight">Welcome to FinFlow!</h2>
                  <p className="text-muted-foreground font-medium text-base sm:text-lg">What is your primary financial mission?</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {GOALS.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`flex items-center gap-4 p-4 sm:p-5 rounded-[24px] text-left transition-all border-2 ${
                        selectedGoal === goal.id 
                        ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                        : "border-secondary/20 bg-background/50 hover:border-primary/30 hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl"><i className={goal.icon} /></span>
                      <div className="flex-1">
                        <p className="font-black text-xs sm:text-sm uppercase tracking-tight">{goal.title}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{goal.desc}</p>
                      </div>
                      {selectedGoal === goal.id && (
                        <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary flex items-center justify-center text-white">
                          <i className="fa-solid fa-check text-[10px]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6 sm:space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter leading-tight">The Foundation</h2>
                  <p className="text-muted-foreground font-medium text-base sm:text-lg">Let's set up your primary cash account.</p>
                </div>
                
                <div className="space-y-5 sm:space-y-6">
                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Account Name</Label>
                    <Input placeholder="e.g. Chase Checkings" className="h-12 sm:h-14 rounded-2xl bg-secondary/10 border-none font-bold text-base sm:text-lg px-4 sm:px-5 focus-visible:ring-2 focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Current Balance</Label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-lg sm:text-xl text-primary opacity-40">$</span>
                      <Input type="number" placeholder="0.00" className="h-12 sm:h-14 rounded-2xl bg-secondary/10 border-none font-black text-xl sm:text-2xl pl-10 pr-5 focus-visible:ring-2 focus-visible:ring-primary/20" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6 sm:space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter leading-tight">Give every dollar a job</h2>
                  <p className="text-muted-foreground font-medium text-base sm:text-lg">What's your monthly target for Food & Dining?</p>
                </div>
                
                <div className="p-6 sm:p-10 rounded-[32px] bg-primary/5 border-2 border-primary/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10 space-y-6 text-center">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto shadow-inner">
                      <i className="fa-solid fa-utensils text-3xl sm:text-4xl" />
                    </div>
                    <div className="relative max-w-[160px] sm:max-w-[200px] mx-auto">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-black text-lg sm:text-xl opacity-40">$</span>
                      <Input type="number" placeholder="500" className="h-10 sm:h-12 bg-transparent border-b-2 border-primary/20 border-t-0 border-x-0 rounded-none font-black text-2xl sm:text-4xl text-center focus-visible:ring-0 px-8" />
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Monthly Category Target</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-center text-muted-foreground font-medium italic mb-2">
                  Success starts with a plan. You can add more categories soon!
                </p>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6 sm:space-y-8 text-center"
              >
                <div className="space-y-2">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full finflow-gradient flex items-center justify-center text-primary-foreground mx-auto text-3xl sm:text-4xl shadow-2xl shadow-primary/30 mb-6">
                    <i className="fa-solid fa-check" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter leading-tight">You're all set!</h2>
                  <p className="text-muted-foreground font-medium text-base sm:text-lg">Your financial journey begins now.</p>
                </div>
                
                <div className="space-y-3 sm:space-y-4 text-left p-5 sm:p-6 rounded-2xl bg-secondary/10 border border-white/5 sm:mb-2">
                    {[
                        { icon: "fa-solid fa-chart-line", text: "Dashboard is initialized with your goals" },
                        { icon: "fa-solid fa-shield", text: "Your first account is connected" },
                        { icon: "fa-solid fa-bullseye", text: "Budget targets are ready to track" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <i className={`${item.icon} text-primary text-[10px] sm:text-xs`} />
                            <span className="text-xs sm:text-sm font-bold text-foreground/80">{item.text}</span>
                        </div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 sm:p-12 pt-0 flex items-center justify-between gap-4 shrink-0">
          <Button 
            variant="ghost" 
            onClick={prevStep} 
            className={`font-black uppercase tracking-widest text-[10px] sm:text-[11px] h-10 sm:h-12 rounded-xl transition-all ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
          >
            Previous
          </Button>
          
          <Button 
            onClick={step === 4 ? handleComplete : nextStep} 
            disabled={step === 1 && !selectedGoal}
            className="finflow-gradient text-primary-foreground font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-full px-6 sm:px-10 h-10 sm:h-14 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            {step === 4 ? "Enter Dashboard" : step === 1 ? "Let's Go" : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
