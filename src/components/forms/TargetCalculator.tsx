import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Select, Button, Card, CardHeader, CardTitle } from "../ui";
import { InvestmentStrategy } from "../../types";
import { useSimulationStore } from "../../stores/simulationStore";
import { formatCurrency } from "../../utils/calculations";

// 목표 금액 역산 폼 검증 스키마
const targetSchema = z.object({
  targetAmount: z.number().min(1000000, "최소 100만원 이상 입력해주세요"),
  targetPeriod: z
    .number()
    .min(1, "최소 1년 이상")
    .max(50, "최대 50년까지 입력 가능합니다"),
  strategy: z.enum(["bond", "index", "dividend", "custom", "portfolio"]),
  customReturnRate: z.number().optional(),
});

type TargetFormData = z.infer<typeof targetSchema>;

const strategyOptions = [
  { value: "bond", label: "국채 (세후 4%)" },
  { value: "index", label: "인덱스 ETF (세후 6.8%)" },
  { value: "dividend", label: "고배당 ETF (세후 8.46%)" },
  { value: "custom", label: "커스텀 수익률" },
  { value: "portfolio", label: "포트폴리오 비중 설정" },
];

export function TargetCalculator() {
  const { calculateTarget, targetCalculation } = useSimulationStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TargetFormData>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
      targetAmount: 100000000, // 1억원
      targetPeriod: 10, // 10년
      strategy: "index",
    },
  });

  const selectedStrategy = watch("strategy");

  const onSubmit = (data: TargetFormData) => {
    calculateTarget({
      targetAmount: data.targetAmount,
      targetPeriod: data.targetPeriod,
      strategy: data.strategy as InvestmentStrategy,
      customReturnRate: data.customReturnRate,
    });
  };

  const handleCalculate = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>목표 금액 역산</CardTitle>
      </CardHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        {/* 목표 금액 */}
        <Input
          label="목표 금액 (원)"
          type="number"
          {...register("targetAmount", { valueAsNumber: true })}
          error={errors.targetAmount?.message}
          placeholder="예: 100000000"
        />

        {/* 목표 기간 */}
        <Input
          label="목표 기간 (년)"
          type="number"
          {...register("targetPeriod", { valueAsNumber: true })}
          error={errors.targetPeriod?.message}
          placeholder="예: 10"
        />

        {/* 투자 전략 */}
        <Select
          label="투자 전략"
          options={strategyOptions}
          {...register("strategy")}
          error={errors.strategy?.message}
        />

        {/* 커스텀 수익률 */}
        {selectedStrategy === "custom" && (
          <Input
            label="연 수익률 (%)"
            type="number"
            step="0.1"
            {...register("customReturnRate", { valueAsNumber: true })}
            error={errors.customReturnRate?.message}
            placeholder="예: 7.5"
          />
        )}

        {/* 계산 버튼 */}
        <Button
          type="button"
          onClick={handleCalculate}
          className="w-full"
          size="lg"
        >
          역산 계산하기
        </Button>
      </form>

      {/* 결과 표시 */}
      {targetCalculation && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3">계산 결과</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">목표 금액:</span>
              <span className="font-medium text-blue-700">
                {formatCurrency(targetCalculation.targetAmount)}원
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">목표 기간:</span>
              <span className="font-medium text-blue-700">
                {targetCalculation.targetPeriod}년
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">투자 전략:</span>
              <span className="font-medium text-blue-700">
                {
                  strategyOptions.find(
                    (s) => s.value === targetCalculation.strategy
                  )?.label
                }
              </span>
            </div>
            <div className="border-t pt-2 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  필요한 월 불입액:
                </span>
                <span className="text-xl font-bold text-blue-600">
                  {formatCurrency(targetCalculation.requiredMonthlyAmount)}원
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              💡 위 금액을 매월 투자하면 {targetCalculation.targetPeriod}년 후
              목표 금액을 달성할 수 있습니다.
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
