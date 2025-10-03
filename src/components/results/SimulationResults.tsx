import React from "react";
import { Card, CardHeader, CardTitle, Button } from "../ui";
import { SimulationResult } from "../../types";
import { formatCurrency, formatPercentage } from "../../utils/calculations";
import { useSimulationStore } from "../../stores/simulationStore";

interface SimulationResultsProps {
  result: SimulationResult;
}

export function SimulationResults({ result }: SimulationResultsProps) {
  const { addScenario, scenarios } = useSimulationStore();

  const handleAddScenario = () => {
    const scenarioName = prompt("시나리오 이름을 입력해주세요:");
    if (scenarioName) {
      const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"];
      const color = colors[scenarios.length % colors.length];
      addScenario(scenarioName, color);
    }
  };

  return (
    <div className="space-y-6">
      {/* 요약 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>시뮬레이션 결과 요약</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-blue-600">
              {formatCurrency(result.totalInvestment)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">총 투자금액</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-green-600">
              {formatCurrency(result.finalValue)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              최종 자산가치
            </div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-purple-600">
              {formatCurrency(result.totalProfit)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">총 수익</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
            <div className="text-lg sm:text-2xl font-bold text-orange-600">
              {formatPercentage(result.totalProfitRate)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">총 수익률</div>
          </div>
        </div>
      </Card>

      {/* 연도별 상세 결과 */}
      <Card>
        <CardHeader>
          <CardTitle>연도별 상세 결과</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">연도</th>
                <th className="text-right p-2">누적 투자금</th>
                <th className="text-right p-2">포트폴리오 가치</th>
                <th className="text-right p-2">수익</th>
                <th className="text-right p-2">수익률</th>
              </tr>
            </thead>
            <tbody>
              {result.yearlyResults.map((year) => (
                <tr key={year.year} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">{year.year}년</td>
                  <td className="p-2 text-right">
                    {formatCurrency(year.cumulativeInvestment)}
                  </td>
                  <td className="p-2 text-right font-medium text-green-600">
                    {formatCurrency(year.portfolioValue)}
                  </td>
                  <td className="p-2 text-right font-medium text-blue-600">
                    {formatCurrency(year.profit)}
                  </td>
                  <td className="p-2 text-right font-medium text-purple-600">
                    {formatPercentage(year.profitRate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 시나리오 관리 */}
      <Card>
        <CardHeader>
          <CardTitle>시나리오 비교</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <Button onClick={handleAddScenario} variant="outline">
            현재 시나리오 추가
          </Button>

          {scenarios.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">저장된 시나리오:</h4>
              {scenarios.map((scenario, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: scenario.color }}
                    />
                    <span className="font-medium">{scenario.name}</span>
                    <span className="text-sm text-gray-600">
                      최종 가치: {formatCurrency(scenario.finalValue)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
