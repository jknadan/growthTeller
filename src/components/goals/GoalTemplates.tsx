"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui";

export interface GoalTemplate {
  id: string;
  name: string;
  icon: string;
  targetAmount: number;
  suggestedPeriod: number;
  description: string;
  tips: string[];
  category: "short" | "medium" | "long";
}

export const goalTemplates: GoalTemplate[] = [
  // 단기 목표 (1-3년)
  {
    id: "emergency-fund",
    name: "비상금 마련",
    icon: "🛡️",
    targetAmount: 10000000,
    suggestedPeriod: 1,
    description: "월급 3-6개월분의 비상금을 마련해보세요",
    tips: [
      "갑작스러운 상황에 대비할 수 있어요",
      "마음의 안정을 가질 수 있어요"
    ],
    category: "short"
  },
  {
    id: "travel",
    name: "해외여행 자금",
    icon: "✈️",
    targetAmount: 5000000,
    suggestedPeriod: 1,
    description: "꿈꾸던 여행을 위한 자금을 모아보세요",
    tips: [
      "유럽 2주 여행 기준 예산이에요",
      "환율을 고려해 여유있게 준비하세요"
    ],
    category: "short"
  },
  {
    id: "gadget",
    name: "최신 기기 구매",
    icon: "💻",
    targetAmount: 3000000,
    suggestedPeriod: 0.5,
    description: "맥북, 아이폰 등 원하는 기기를 구매하세요",
    tips: [
      "할부보다 일시불이 이득이에요",
      "새 모델 출시 시기를 고려하세요"
    ],
    category: "short"
  },

  // 중기 목표 (3-7년)
  {
    id: "first-car",
    name: "첫 차 구매",
    icon: "🚗",
    targetAmount: 30000000,
    suggestedPeriod: 5,
    description: "나만의 첫 자동차를 마련해보세요",
    tips: [
      "준중형 신차 또는 중고 중형차 가능",
      "유지비도 함께 고려하세요"
    ],
    category: "medium"
  },
  {
    id: "wedding",
    name: "결혼 자금",
    icon: "💍",
    targetAmount: 50000000,
    suggestedPeriod: 5,
    description: "행복한 결혼식과 신혼생활을 준비하세요",
    tips: [
      "예식, 신혼여행, 혼수 포함 금액",
      "파트너와 함께 계획하면 절반만 준비"
    ],
    category: "medium"
  },
  {
    id: "startup",
    name: "창업 자금",
    icon: "🚀",
    targetAmount: 50000000,
    suggestedPeriod: 5,
    description: "나만의 사업을 시작할 자금을 모아보세요",
    tips: [
      "초기 운영자금 6개월분 포함",
      "작게 시작해서 크게 키우세요"
    ],
    category: "medium"
  },
  {
    id: "education",
    name: "대학원/유학",
    icon: "🎓",
    targetAmount: 40000000,
    suggestedPeriod: 3,
    description: "더 나은 미래를 위한 교육 투자",
    tips: [
      "등록금과 생활비 고려",
      "장학금도 함께 알아보세요"
    ],
    category: "medium"
  },

  // 장기 목표 (7년 이상)
  {
    id: "house-deposit",
    name: "내 집 마련",
    icon: "🏠",
    targetAmount: 200000000,
    suggestedPeriod: 10,
    description: "전세 또는 매매를 위한 목돈 마련",
    tips: [
      "수도권 전세 또는 지방 매매 가능",
      "청약통장도 함께 준비하세요"
    ],
    category: "long"
  },
  {
    id: "financial-freedom",
    name: "경제적 자유",
    icon: "💎",
    targetAmount: 500000000,
    suggestedPeriod: 15,
    description: "월 200만원 패시브 인컴을 위한 자산",
    tips: [
      "연 5% 수익률 기준",
      "조기 은퇴의 첫걸음"
    ],
    category: "long"
  },
  {
    id: "retirement",
    name: "조기 은퇴",
    icon: "🏖️",
    targetAmount: 1000000000,
    suggestedPeriod: 20,
    description: "40대에 은퇴하고 자유롭게 살기",
    tips: [
      "FIRE 운동의 목표",
      "생활비를 줄이면 목표가 가까워져요"
    ],
    category: "long"
  },
  {
    id: "children-education",
    name: "자녀 교육비",
    icon: "👶",
    targetAmount: 300000000,
    suggestedPeriod: 15,
    description: "자녀의 대학 교육까지 준비",
    tips: [
      "자녀 1명 기준",
      "교육보험과 병행하면 좋아요"
    ],
    category: "long"
  },
  {
    id: "custom",
    name: "나만의 목표",
    icon: "⭐",
    targetAmount: 0,
    suggestedPeriod: 0,
    description: "직접 목표를 설정해보세요",
    tips: [
      "구체적인 목표가 성공 확률을 높여요",
      "달성 가능한 목표로 시작하세요"
    ],
    category: "medium"
  }
];

interface GoalSelectorProps {
  onSelectGoal: (goal: GoalTemplate) => void;
  currentGoalId?: string;
}

export function GoalSelector({ onSelectGoal, currentGoalId }: GoalSelectorProps) {
  const categories = [
    { key: "short", label: "단기 (1-3년)", color: "bg-blue-50" },
    { key: "medium", label: "중기 (3-7년)", color: "bg-green-50" },
    { key: "long", label: "장기 (7년+)", color: "bg-purple-50" }
  ];

  return (
    <div className="space-y-6">
      {categories.map(({ key, label, color }) => (
        <div key={key}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{label}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goalTemplates
              .filter((goal) => goal.category === key)
              .map((goal) => (
                <motion.div
                  key={goal.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      currentGoalId === goal.id
                        ? "ring-2 ring-blue-500 bg-blue-50"
                        : `hover:shadow-lg ${color}`
                    }`}
                    onClick={() => {
                      // #region agent log
                      fetch('http://127.0.0.1:7242/ingest/fd82309c-61f9-4b84-9928-7208b4522866',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'GoalSelector:Card:onClick',message:'Card clicked',data:{goalId:goal.id,goalName:goal.name,goalTargetAmount:goal.targetAmount},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A',runId:'post-fix'})}).catch(()=>{});
                      // #endregion
                      onSelectGoal(goal);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-3xl">{goal.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {goal.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {goal.description}
                        </p>
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">목표 금액</span>
                            <span className="font-medium text-gray-900">
                              {goal.targetAmount > 0
                                ? `${(goal.targetAmount / 10000).toLocaleString()}만원`
                                : "직접 설정"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">권장 기간</span>
                            <span className="font-medium text-gray-900">
                              {goal.suggestedPeriod > 0
                                ? `${goal.suggestedPeriod}년`
                                : "직접 설정"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// 선택한 목표에 대한 상세 정보 표시
export function GoalDetails({ goal }: { goal: GoalTemplate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-5xl">{goal.icon}</div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{goal.name}</h3>
          <p className="text-gray-600">{goal.description}</p>
        </div>
      </div>
      
      {goal.tips.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-semibold text-gray-700">💡 알아두면 좋아요</h4>
          {goal.tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-blue-500">•</span>
              <span className="text-sm text-gray-600">{tip}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}



