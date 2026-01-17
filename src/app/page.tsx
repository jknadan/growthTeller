"use client";

import { OnboardingModal } from "../components/onboarding/OnboardingModal";
import { FeatureCard } from "../components/cards/FeatureCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* 온보딩 모달 */}
      <OnboardingModal />
      {/* 페이지 헤더 */}
      <div className="apple-hero">
        <div className="apple-container">
          <div className="apple-fade-in">
            <h1 className="apple-text-large text-gray-900 mb-4">
              GrowthTeller
            </h1>
            <p className="apple-text-medium text-gray-600 mb-6">
              첫 월급부터 시작하는 가장 쉬운 투자 습관 만들기
            </p>
            <p className="apple-text-body text-gray-500 max-w-2xl mx-auto">
              한 달에 커피 한 잔 금액으로도 시작할 수 있어요.<br/>
              10년 후 당신의 모습을 미리 만나보세요. 투자는 생각보다 쉽고 단순합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="apple-section">
        <div className="apple-container">
          <div className="apple-grid">
            {/* 투자 시뮬레이션 */}
            <FeatureCard
              href="/simulation"
              icon="📊"
              title="투자 시뮬레이션"
              description="월 5만원부터 시작! 내 미래 자산이 어떻게 성장하는지 확인해보세요"
              features={[
                "• 초보자도 쉽게 이해할 수 있는 설명",
                "• 현실적인 수익률로 계산",
                "• 10년, 20년 후 미래 예측",
                "• 매달 바로 확인 가능",
              ]}
              color="blue"
            />

            {/* 목표 금액 역산 */}
            <FeatureCard
              href="/target"
              icon="🎯"
              title="목표 금액 역산"
              description="내 집 마련, 결혼자금, 첫 차... 목표를 위해 얼마나 모아야 할까요?"
              features={[
                "• 실생활 목표별 템플릿 제공",
                "• 현실적인 금액 역산",
                "• 단계별 달성 계획",
                "• 부담 없는 금액 제시",
              ]}
              color="green"
            />

            {/* 시나리오 비교 */}
            <FeatureCard
              href="/comparison"
              icon="⚖️"
              title="시나리오 비교"
              description="여러 투자 전략을 비교하여 최적의 투자 방안을 찾아보세요"
              features={[
                "• 저장된 시나리오 관리",
                "• 다중 차트 비교 분석",
                "• 수익률 및 리스크 비교",
                "• 최적 전략 선택 가이드",
              ]}
              color="purple"
            />
          </div>
        </div>
      </main>

      {/* 특징 소개 */}
      <div className="apple-section bg-gray-50">
        <div className="apple-container">
          <h2 className="apple-text-medium text-gray-900 text-center mb-12">
            왜 GrowthTeller를 선택해야 할까요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="apple-text-small font-semibold text-gray-900 mb-2">정확한 계산</h3>
              <p className="apple-text-body text-gray-600">
                복리 계산 공식을 기반으로 한 정확한 시뮬레이션
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="apple-text-small font-semibold text-gray-900 mb-2">시각적 분석</h3>
              <p className="apple-text-body text-gray-600">
                직관적인 차트로 투자 결과를 한눈에 파악
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="apple-text-small font-semibold text-gray-900 mb-2">목표 지향</h3>
              <p className="apple-text-body text-gray-600">
                목표 금액 달성을 위한 구체적인 로드맵 제시
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="apple-text-small font-semibold text-gray-900 mb-2">빠른 분석</h3>
              <p className="apple-text-body text-gray-600">
                실시간 계산으로 즉시 결과 확인 가능
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="apple-container">
          <div className="text-center">
            <p className="apple-text-body text-gray-400 mb-4">
              ⚠️ 이 서비스는 교육 목적으로만 제공되며, 실제 투자 조언이 아닙니다.
            </p>
            <p className="apple-text-body text-gray-400">
              투자 전 전문가와 상담하시기 바랍니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}