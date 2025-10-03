"use client";

import { Card, CardHeader, CardTitle, Button } from "../../components/ui";
import { SimulationChart } from "../../components/charts/SimulationChart";
import { useSimulationStore } from "../../stores/simulationStore";
import { formatCurrency } from "../../utils/calculations";

export default function ComparisonPage() {
  const { scenarios, currentResult, clearScenarios } = useSimulationStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 페이지 헤더 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              시나리오 비교
            </h1>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              여러 투자 전략을 비교하여 최적의 투자 방안을 찾아보세요
            </p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-4 sm:space-y-6">
          {/* 시나리오 관리 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>저장된 시나리오</CardTitle>
                {scenarios.length > 0 && (
                  <Button onClick={clearScenarios} variant="outline" size="sm">
                    전체 삭제
                  </Button>
                )}
              </div>
            </CardHeader>

            {scenarios.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {scenarios.map((scenario, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: scenario.color }}
                        />
                        <span className="font-medium">{scenario.name}</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>최종 가치:</span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(scenario.finalValue)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>총 수익:</span>
                          <span className="font-medium text-blue-600">
                            {formatCurrency(scenario.totalProfit)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-2">📊</div>
                <p className="text-gray-600">
                  아직 저장된 시나리오가 없습니다.
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  투자 시뮬레이션 페이지에서 시나리오를 추가해보세요.
                </p>
              </div>
            )}
          </Card>

          {/* 비교 차트 */}
          {scenarios.length > 0 && currentResult && (
            <SimulationChart result={currentResult} scenarios={scenarios} />
          )}

          {/* 사용 안내 */}
          {scenarios.length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>사용 방법</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">1️⃣</div>
                    <h4 className="font-medium text-blue-900 mb-1">
                      시뮬레이션 실행
                    </h4>
                    <p className="text-sm text-blue-700">
                      투자 시뮬레이션 페이지에서 첫 번째 시나리오를 계산하세요
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">2️⃣</div>
                    <h4 className="font-medium text-green-900 mb-1">
                      시나리오 저장
                    </h4>
                    <p className="text-sm text-green-700">
                      "현재 시나리오 추가" 버튼으로 결과를 저장하세요
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">3️⃣</div>
                    <h4 className="font-medium text-purple-900 mb-1">
                      비교 분석
                    </h4>
                    <p className="text-sm text-purple-700">
                      여러 시나리오를 저장한 후 이 페이지에서 비교하세요
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
