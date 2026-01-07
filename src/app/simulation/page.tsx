"use client";

import { SimulationForm } from "../../components/forms/SimulationForm";
import { SimulationResults } from "../../components/results/SimulationResults";
import { SimulationChart } from "../../components/charts/SimulationChart";
import { useSimulationStore } from "../../stores/simulationStore";

export default function SimulationPage() {
  const { currentResult, scenarios } = useSimulationStore();

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* 페이지 헤더 */}
      <div className="apple-section">
        <div className="apple-container">
          <div className="text-center">
            <h1 className="apple-text-medium text-gray-900 mb-4">
              투자 시뮬레이션
            </h1>
            <p className="apple-text-body text-gray-600">
              월 불입액과 투자 전략을 설정하여 미래 자산을 시뮬레이션해보세요
            </p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* 입력 폼 */}
          <div className="flex justify-center">
            <SimulationForm />
          </div>

          {/* 결과 및 차트 */}
          <div className="space-y-4 sm:space-y-6">
            {currentResult ? (
              <>
                <SimulationResults result={currentResult} />
                <SimulationChart result={currentResult} scenarios={scenarios} />
              </>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 shadow-sm text-center">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-4">
                  📊
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  시뮬레이션을 시작해보세요
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  위 폼에 투자 정보를 입력하고 계산하기 버튼을 눌러보세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
