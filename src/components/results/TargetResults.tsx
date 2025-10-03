import React from "react";
import { Card, CardHeader, CardTitle } from "../ui";
import { TargetCalculation } from "../../types";
import { formatCurrency, formatPercentage } from "../../utils/calculations";

interface TargetResultsProps {
  calculation: TargetCalculation;
}

export function TargetResults({ calculation }: TargetResultsProps) {
  const strategyLabels = {
    bond: "국채 (세후 4%)",
    index: "인덱스 ETF (세후 6.8%)",
    dividend: "고배당 ETF (세후 8.46%)",
    custom: "커스텀 수익률",
    portfolio: "포트폴리오 비중 설정",
  };

  const totalInvestment =
    calculation.requiredMonthlyAmount * calculation.targetPeriod * 12;
  const totalProfit = calculation.targetAmount - totalInvestment;
  const profitRate = (totalProfit / totalInvestment) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>목표 달성 계획</CardTitle>
      </CardHeader>

      <div className="space-y-6">
        {/* 기본 정보 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(calculation.targetAmount)}
            </div>
            <div className="text-sm text-gray-600">목표 금액</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {calculation.targetPeriod}년
            </div>
            <div className="text-sm text-gray-600">목표 기간</div>
          </div>
        </div>

        {/* 투자 계획 */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">투자 계획</h4>

          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">투자 전략:</span>
              <span className="font-medium">
                {strategyLabels[calculation.strategy]}
                {calculation.customReturnRate &&
                  ` (${calculation.customReturnRate}%)`}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">필요한 월 불입액:</span>
              <span className="text-lg font-bold text-blue-600">
                {formatCurrency(calculation.requiredMonthlyAmount)}원
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">총 투자금액:</span>
              <span className="font-medium">
                {formatCurrency(totalInvestment)}원
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">예상 수익:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(totalProfit)}원
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">예상 수익률:</span>
              <span className="font-medium text-purple-600">
                {formatPercentage(profitRate)}
              </span>
            </div>
          </div>
        </div>

        {/* 연도별 계획 */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">연도별 누적 계획</h4>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">연도</th>
                  <th className="text-right p-2">누적 투자금</th>
                  <th className="text-right p-2">예상 자산가치</th>
                  <th className="text-right p-2">예상 수익</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(
                  { length: Math.min(calculation.targetPeriod, 10) },
                  (_, i) => {
                    const year = i + 1;
                    const monthlyRate = calculation.customReturnRate
                      ? calculation.customReturnRate / 100 / 12
                      : calculation.strategy === "bond"
                      ? 0.04 / 12
                      : calculation.strategy === "index"
                      ? 0.068 / 12
                      : calculation.strategy === "dividend"
                      ? 0.0846 / 12
                      : 0.068 / 12; // 기본값

                    const totalMonths = year * 12;
                    const cumulativeInvestment =
                      calculation.requiredMonthlyAmount * totalMonths;

                    let portfolioValue: number;
                    if (monthlyRate === 0) {
                      portfolioValue = cumulativeInvestment;
                    } else {
                      portfolioValue =
                        calculation.requiredMonthlyAmount *
                        ((Math.pow(1 + monthlyRate, totalMonths) - 1) /
                          monthlyRate);
                    }

                    const profit = portfolioValue - cumulativeInvestment;

                    return (
                      <tr key={year} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{year}년</td>
                        <td className="p-2 text-right">
                          {formatCurrency(cumulativeInvestment)}
                        </td>
                        <td className="p-2 text-right font-medium text-green-600">
                          {formatCurrency(portfolioValue)}
                        </td>
                        <td className="p-2 text-right font-medium text-blue-600">
                          {formatCurrency(profit)}
                        </td>
                      </tr>
                    );
                  }
                )}
                {calculation.targetPeriod > 10 && (
                  <tr className="border-b">
                    <td className="p-2 font-medium text-gray-500">...</td>
                    <td className="p-2 text-right text-gray-500">...</td>
                    <td className="p-2 text-right text-gray-500">...</td>
                    <td className="p-2 text-right text-gray-500">...</td>
                  </tr>
                )}
                <tr className="border-t-2 border-blue-200 bg-blue-50">
                  <td className="p-2 font-bold">
                    {calculation.targetPeriod}년 (최종)
                  </td>
                  <td className="p-2 text-right font-bold">
                    {formatCurrency(totalInvestment)}
                  </td>
                  <td className="p-2 text-right font-bold text-green-600">
                    {formatCurrency(calculation.targetAmount)}
                  </td>
                  <td className="p-2 text-right font-bold text-blue-600">
                    {formatCurrency(totalProfit)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 팁 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h5 className="font-semibold text-yellow-800 mb-2">💡 투자 팁</h5>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 매월 정기적으로 투자하는 것이 중요합니다</li>
            <li>• 수익률은 과거 데이터를 바탕으로 한 예상치입니다</li>
            <li>• 실제 투자 시에는 수수료와 세금을 고려해야 합니다</li>
            <li>• 목표 달성을 위해 여유자금을 확보해두세요</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
