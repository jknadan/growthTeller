import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardHeader, CardTitle } from "../ui";
import { SimulationResult, ScenarioComparison } from "../../types";
import { formatCurrency, formatPercentage } from "../../utils/calculations";

interface SimulationChartProps {
  result: SimulationResult;
  scenarios?: ScenarioComparison[];
}

export function SimulationChart({
  result,
  scenarios = [],
}: SimulationChartProps) {
  const chartData = result.yearlyResults.map((year) => ({
    year: `${year.year}년`,
    cumulativeInvestment: year.cumulativeInvestment,
    portfolioValue: year.portfolioValue,
    profit: year.profit,
    profitRate: year.profitRate,
  }));

  // 시나리오 비교 데이터 추가
  const comparisonData =
    scenarios.length > 0
      ? result.yearlyResults.map((year) => {
          const data: any = { year: `${year.year}년` };
          scenarios.forEach((scenario) => {
            const scenarioYear = scenario.yearlyResults.find(
              (y) => y.year === year.year
            );
            if (scenarioYear) {
              data[scenario.name] = scenarioYear.portfolioValue;
            }
          });
          return data;
        })
      : [];

  return (
    <div className="space-y-6">
      {/* 자산 증가 추이 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>자산 증가 추이</CardTitle>
        </CardHeader>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) => `${(value / 100000000).toFixed(1)}억`}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  name === "cumulativeInvestment"
                    ? "누적 투자금"
                    : name === "portfolioValue"
                    ? "포트폴리오 가치"
                    : name === "profit"
                    ? "수익"
                    : name,
                ]}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="cumulativeInvestment"
                stroke="#8884d8"
                strokeWidth={2}
                name="누적 투자금"
              />
              <Line
                type="monotone"
                dataKey="portfolioValue"
                stroke="#82ca9d"
                strokeWidth={2}
                name="포트폴리오 가치"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 원금 vs 수익 영역 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>원금 vs 수익</CardTitle>
        </CardHeader>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) => `${(value / 100000000).toFixed(1)}억`}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  name === "cumulativeInvestment" ? "원금" : "수익",
                ]}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="cumulativeInvestment"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                name="원금"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
                name="수익"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 시나리오 비교 차트 */}
      {scenarios.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>시나리오 비교</CardTitle>
          </CardHeader>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  tickFormatter={(value) =>
                    `${(value / 100000000).toFixed(1)}억`
                  }
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    formatCurrency(value),
                    name,
                  ]}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend />
                {scenarios.map((scenario, index) => (
                  <Line
                    key={scenario.name}
                    type="monotone"
                    dataKey={scenario.name}
                    stroke={scenario.color}
                    strokeWidth={2}
                    name={scenario.name}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* 수익률 추이 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>수익률 추이</CardTitle>
        </CardHeader>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
              <Tooltip
                formatter={(value: number) => [
                  formatPercentage(value),
                  "수익률",
                ]}
                labelFormatter={(label) => `${label}`}
              />
              <Bar dataKey="profitRate" fill="#82ca9d" name="수익률" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

