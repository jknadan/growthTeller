"use client";

import { TargetCalculator } from "../../components/forms/TargetCalculator";
import { TargetResults } from "../../components/results/TargetResults";
import { useSimulationStore } from "../../stores/simulationStore";

export default function TargetPage() {
  const { targetCalculation } = useSimulationStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 페이지 헤더 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              목표 금액 역산
            </h1>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              목표 금액을 달성하기 위해 필요한 월 불입액을 계산해보세요
            </p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* 입력 폼 */}
          <div>
            <TargetCalculator />
          </div>

          {/* 결과 */}
          <div>
            {targetCalculation ? (
              <TargetResults calculation={targetCalculation} />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 shadow-sm text-center">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-4">
                  🎯
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  목표를 설정해보세요
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  왼쪽 폼에 목표 금액과 기간을 입력하고 역산 계산하기 버튼을
                  눌러보세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
