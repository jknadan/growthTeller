"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle } from "../components/ui";

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* 페이지 헤더 */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 float-animation">
              📈 GrowthTeller
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8">
              20대 사회초년생을 위한 투자 시뮬레이션 서비스
            </p>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto px-4">
              복리 효과를 활용한 투자 계획을 세우고, 목표 금액 달성을 위한
              구체적인 로드맵을 만들어보세요. 데이터 기반의 투자 전략으로 미래를
              설계하세요.
            </p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* 투자 시뮬레이션 */}
          <Link href="/simulation">
            <Card className="h-full glass-card card-hover cursor-pointer">
              <CardHeader>
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <CardTitle>투자 시뮬레이션</CardTitle>
                </div>
              </CardHeader>
              <div className="p-6 pt-0">
                <p className="text-gray-600 text-center mb-4">
                  월 불입액과 투자 전략을 설정하여 미래 자산을
                  시뮬레이션해보세요
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 다양한 투자 전략 비교</li>
                  <li>• 연도별 상세 결과 분석</li>
                  <li>• 시각적 차트로 결과 확인</li>
                  <li>• 시나리오 저장 및 비교</li>
                </ul>
              </div>
            </Card>
          </Link>

          {/* 목표 금액 역산 */}
          <Link href="/target">
            <Card className="h-full glass-card card-hover cursor-pointer">
              <CardHeader>
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <CardTitle>목표 금액 역산</CardTitle>
                </div>
              </CardHeader>
              <div className="p-6 pt-0">
                <p className="text-gray-600 text-center mb-4">
                  목표 금액을 달성하기 위해 필요한 월 불입액을 계산해보세요
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 목표 금액과 기간 설정</li>
                  <li>• 필요한 월 불입액 계산</li>
                  <li>• 연도별 투자 계획 수립</li>
                  <li>• 투자 전략별 비교</li>
                </ul>
              </div>
            </Card>
          </Link>

          {/* 시나리오 비교 */}
          <Link href="/comparison">
            <Card className="h-full glass-card card-hover cursor-pointer">
              <CardHeader>
                <div className="text-center">
                  <div className="text-4xl mb-4">⚖️</div>
                  <CardTitle>시나리오 비교</CardTitle>
                </div>
              </CardHeader>
              <div className="p-6 pt-0">
                <p className="text-gray-600 text-center mb-4">
                  여러 투자 전략을 비교하여 최적의 투자 방안을 찾아보세요
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 저장된 시나리오 관리</li>
                  <li>• 다중 차트 비교 분석</li>
                  <li>• 수익률 및 리스크 비교</li>
                  <li>• 최적 전략 선택 가이드</li>
                </ul>
              </div>
            </Card>
          </Link>
        </div>

        {/* 특징 소개 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            왜 GrowthTeller를 선택해야 할까요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="font-semibold text-gray-900 mb-2">정확한 계산</h3>
              <p className="text-sm text-gray-600">
                복리 계산 공식을 기반으로 한 정확한 시뮬레이션
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-semibold text-gray-900 mb-2">시각적 분석</h3>
              <p className="text-sm text-gray-600">
                직관적인 차트로 투자 결과를 한눈에 파악
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">목표 지향</h3>
              <p className="text-sm text-gray-600">
                목표 금액 달성을 위한 구체적인 로드맵 제시
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">빠른 분석</h3>
              <p className="text-sm text-gray-600">
                실시간 계산으로 즉시 결과 확인 가능
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              ⚠️ 이 서비스는 교육 목적으로만 제공되며, 실제 투자 조언이
              아닙니다.
            </p>
            <p className="text-sm mt-2">
              투자 전 전문가와 상담하시기 바랍니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
