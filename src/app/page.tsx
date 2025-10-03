"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* 페이지 헤더 */}
      <div className="apple-hero">
        <div className="apple-container">
          <div className="apple-fade-in">
            <h1 className="apple-text-large text-gray-900 mb-4">
              GrowthTeller
            </h1>
            <p className="apple-text-medium text-gray-600 mb-6">
              20대 사회초년생을 위한 투자 시뮬레이션 서비스
            </p>
            <p className="apple-text-body text-gray-500 max-w-2xl mx-auto">
              복리 효과를 활용한 투자 계획을 세우고, 목표 금액 달성을 위한
              구체적인 로드맵을 만들어보세요. 데이터 기반의 투자 전략으로 미래를
              설계하세요.
            </p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="apple-section">
        <div className="apple-container">
          <div className="apple-grid">
            {/* 투자 시뮬레이션 */}
            <Link href="/simulation">
              <div className="apple-card p-8 cursor-pointer">
                <div className="text-center">
                  <div className="text-5xl mb-6">📊</div>
                  <h3 className="apple-text-small font-semibold text-gray-900 mb-4">
                    투자 시뮬레이션
                  </h3>
                  <p className="apple-text-body text-gray-600 mb-6">
                    월 불입액과 투자 전략을 설정하여 미래 자산을 시뮬레이션해보세요
                  </p>
                  <div className="space-y-2 text-left">
                    <div className="apple-text-caption text-gray-500">• 다양한 투자 전략 비교</div>
                    <div className="apple-text-caption text-gray-500">• 연도별 상세 결과 분석</div>
                    <div className="apple-text-caption text-gray-500">• 시각적 차트로 결과 확인</div>
                    <div className="apple-text-caption text-gray-500">• 시나리오 저장 및 비교</div>
                  </div>
                </div>
              </div>
            </Link>

            {/* 목표 금액 역산 */}
            <Link href="/target">
              <div className="apple-card p-8 cursor-pointer">
                <div className="text-center">
                  <div className="text-5xl mb-6">🎯</div>
                  <h3 className="apple-text-small font-semibold text-gray-900 mb-4">
                    목표 금액 역산
                  </h3>
                  <p className="apple-text-body text-gray-600 mb-6">
                    목표 금액을 달성하기 위해 필요한 월 불입액을 계산해보세요
                  </p>
                  <div className="space-y-2 text-left">
                    <div className="apple-text-caption text-gray-500">• 목표 금액과 기간 설정</div>
                    <div className="apple-text-caption text-gray-500">• 필요한 월 불입액 계산</div>
                    <div className="apple-text-caption text-gray-500">• 연도별 투자 계획 수립</div>
                    <div className="apple-text-caption text-gray-500">• 투자 전략별 비교</div>
                  </div>
                </div>
              </div>
            </Link>

            {/* 시나리오 비교 */}
            <Link href="/comparison">
              <div className="apple-card p-8 cursor-pointer">
                <div className="text-center">
                  <div className="text-5xl mb-6">⚖️</div>
                  <h3 className="apple-text-small font-semibold text-gray-900 mb-4">
                    시나리오 비교
                  </h3>
                  <p className="apple-text-body text-gray-600 mb-6">
                    여러 투자 전략을 비교하여 최적의 투자 방안을 찾아보세요
                  </p>
                  <div className="space-y-2 text-left">
                    <div className="apple-text-caption text-gray-500">• 저장된 시나리오 관리</div>
                    <div className="apple-text-caption text-gray-500">• 다중 차트 비교 분석</div>
                    <div className="apple-text-caption text-gray-500">• 수익률 및 리스크 비교</div>
                    <div className="apple-text-caption text-gray-500">• 최적 전략 선택 가이드</div>
                  </div>
                </div>
              </div>
            </Link>
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