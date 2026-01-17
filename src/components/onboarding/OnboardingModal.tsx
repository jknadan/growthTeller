"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
  tip?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "환영합니다! 🎉",
    description: "GrowthTeller는 당신의 첫 투자 여정을 함께합니다.",
    icon: "👋",
    tip: "이미 투자 경험이 있으시다면 '건너뛰기'를 눌러주세요"
  },
  {
    title: "간단한 시작",
    description: "월 급여의 20-30%를 투자하면, 10년 후 큰 자산을 만들 수 있어요.",
    icon: "💰",
    tip: "처음엔 작은 금액으로 시작해도 괜찮아요"
  },
  {
    title: "복리의 마법",
    description: "시간이 지날수록 투자 수익이 눈덩이처럼 불어납니다.",
    icon: "📈",
    tip: "일찍 시작할수록 더 큰 효과를 볼 수 있어요"
  },
  {
    title: "당신만의 목표",
    description: "첫 차, 내 집 마련, 또는 경제적 자유. 목표를 설정해보세요.",
    icon: "🎯",
    tip: "구체적인 목표가 있으면 동기부여가 됩니다"
  }
];

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 온보딩 완료 여부 확인
    const seen = localStorage.getItem("hasSeenOnboarding");
    if (!seen) {
      setIsOpen(true);
    } else {
      setHasSeenOnboarding(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setHasSeenOnboarding(true);
    setIsOpen(false);
  };

  const handleSkip = () => {
    handleComplete();
  };

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (hasSeenOnboarding || !isOpen) return null;

  const step = onboardingSteps[currentStep];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* 배경 오버레이 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleSkip}
        />

        {/* 모달 컨텐츠 */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        >
          {/* 닫기 버튼 */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* 진행 표시 */}
          <div className="flex justify-center gap-2 pt-6">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "w-8 bg-blue-500"
                    : index < currentStep
                    ? "w-2 bg-blue-300"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* 스텝 내용 */}
          <div className="p-8 text-center">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {step.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {step.description}
              </p>
              {step.tip && (
                <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg">
                  💡 {step.tip}
                </div>
              )}
            </motion.div>
          </div>

          {/* 네비게이션 버튼 */}
          <div className="flex justify-between items-center px-8 pb-8">
            <button
              onClick={prevStep}
              className={`p-2 rounded-full transition-all ${
                currentStep === 0
                  ? "invisible"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-3">
              <Button
                onClick={handleSkip}
                variant="ghost"
                className="text-gray-500"
              >
                건너뛰기
              </Button>
              <Button onClick={nextStep} variant="primary">
                {currentStep === onboardingSteps.length - 1
                  ? "시작하기"
                  : "다음"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="w-10" /> {/* 레이아웃 균형을 위한 빈 공간 */}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// 온보딩 재실행 버튼 (설정 페이지 등에서 사용)
export function ResetOnboardingButton() {
  const handleReset = () => {
    localStorage.removeItem("hasSeenOnboarding");
    window.location.reload();
  };

  return (
    <Button onClick={handleReset} variant="outline" size="sm">
      온보딩 다시 보기
    </Button>
  );
}




