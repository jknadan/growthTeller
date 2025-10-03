import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Select, Button, Card, CardHeader, CardTitle } from "../ui";
import {
  SimulationInput,
  InvestmentStrategy,
  ExchangeRateOption,
} from "../../types";
import { useSimulationStore } from "../../stores/simulationStore";

// 폼 검증 스키마
const simulationSchema = z.object({
  monthlyAmount: z
    .number()
    .min(100000, "최소 10만원 이상 입력해주세요")
    .max(10000000, "최대 1,000만원까지 입력 가능합니다"),
  investmentPeriod: z
    .number()
    .min(1, "최소 1년 이상")
    .max(50, "최대 50년까지 입력 가능합니다"),
  strategy: z.enum(["bond", "index", "dividend", "custom", "portfolio"]),
  customReturnRate: z.number().optional(),
  exchangeRate: z.number().min(1000, "최소 1,000원").max(2000, "최대 2,000원"),
  exchangeRateOption: z.enum(["fixed", "variable"]),
  bondAllocation: z.number().min(0).max(100),
  indexAllocation: z.number().min(0).max(100),
  dividendAllocation: z.number().min(0).max(100),
});

type SimulationFormData = z.infer<typeof simulationSchema>;

const strategyOptions = [
  { value: "bond", label: "국채 (세후 4%)" },
  { value: "index", label: "인덱스 ETF (세후 6.8%)" },
  { value: "dividend", label: "고배당 ETF (세후 8.46%)" },
  { value: "custom", label: "커스텀 수익률" },
  { value: "portfolio", label: "포트폴리오 비중 설정" },
];

const exchangeRateOptions = [
  { value: "fixed", label: "고정 환율" },
  { value: "variable", label: "변동 환율" },
];

export function SimulationForm() {
  const { currentInput, updateInput, calculateSimulation } =
    useSimulationStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<SimulationFormData>({
    resolver: zodResolver(simulationSchema),
    defaultValues: {
      monthlyAmount: currentInput.monthlyAmount,
      investmentPeriod: currentInput.investmentPeriod,
      strategy: currentInput.strategy,
      customReturnRate: currentInput.customReturnRate,
      exchangeRate: currentInput.exchangeRate,
      exchangeRateOption: currentInput.exchangeRateOption,
      bondAllocation: currentInput.portfolioAllocation.bond,
      indexAllocation: currentInput.portfolioAllocation.index,
      dividendAllocation: currentInput.portfolioAllocation.dividend,
    },
  });

  const selectedStrategy = watch("strategy");
  const bondAllocation = watch("bondAllocation");
  const indexAllocation = watch("indexAllocation");
  const dividendAllocation = watch("dividendAllocation");

  const onSubmit = (data: SimulationFormData) => {
    const input: SimulationInput = {
      monthlyAmount: data.monthlyAmount,
      investmentPeriod: data.investmentPeriod,
      strategy: data.strategy as InvestmentStrategy,
      customReturnRate: data.customReturnRate,
      exchangeRate: data.exchangeRate,
      exchangeRateOption: data.exchangeRateOption as ExchangeRateOption,
      portfolioAllocation: {
        bond: data.bondAllocation,
        index: data.indexAllocation,
        dividend: data.dividendAllocation,
      },
    };

    updateInput(input);
    calculateSimulation();
  };

  const handleCalculate = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>투자 시뮬레이션 설정</CardTitle>
      </CardHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        {/* 월 불입액 */}
        <Input
          label="월 불입액 (원)"
          type="number"
          {...register("monthlyAmount", { valueAsNumber: true })}
          error={errors.monthlyAmount?.message}
          placeholder="예: 1500000"
        />

        {/* 투자 기간 */}
        <Input
          label="투자 기간 (년)"
          type="number"
          {...register("investmentPeriod", { valueAsNumber: true })}
          error={errors.investmentPeriod?.message}
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

        {/* 포트폴리오 비중 설정 */}
        {selectedStrategy === "portfolio" && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">
              포트폴리오 비중 설정
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="국채 (%)"
                type="number"
                {...register("bondAllocation", { valueAsNumber: true })}
                error={errors.bondAllocation?.message}
              />
              <Input
                label="인덱스 ETF (%)"
                type="number"
                {...register("indexAllocation", { valueAsNumber: true })}
                error={errors.indexAllocation?.message}
              />
              <Input
                label="고배당 ETF (%)"
                type="number"
                {...register("dividendAllocation", { valueAsNumber: true })}
                error={errors.dividendAllocation?.message}
              />
            </div>

            <div className="text-sm text-gray-600">
              총 비중: {bondAllocation + indexAllocation + dividendAllocation}%
              {bondAllocation + indexAllocation + dividendAllocation !==
                100 && (
                <span className="text-red-600 ml-2">
                  (100%가 되어야 합니다)
                </span>
              )}
            </div>
          </div>
        )}

        {/* 환율 설정 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="환율 (원)"
            type="number"
            {...register("exchangeRate", { valueAsNumber: true })}
            error={errors.exchangeRate?.message}
            placeholder="예: 1400"
          />
          <Select
            label="환율 옵션"
            options={exchangeRateOptions}
            {...register("exchangeRateOption")}
            error={errors.exchangeRateOption?.message}
          />
        </div>

        {/* 계산 버튼 */}
        <Button
          type="button"
          onClick={handleCalculate}
          className="w-full"
          size="lg"
        >
          시뮬레이션 계산하기
        </Button>
      </form>
    </Card>
  );
}
