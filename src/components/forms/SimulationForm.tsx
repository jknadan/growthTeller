import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Input,
  NumberInput,
  Select,
  Button,
  Card,
  CardHeader,
  CardTitle,
} from "../ui";
import { Tooltip } from "../ui/Tooltip";
import {
  SimulationInput,
  InvestmentStrategy,
  ExchangeRateOption,
} from "../../types";
import { useSimulationStore } from "../../stores/simulationStore";

// 폼 검증 스키마
const simulationSchema = z
  .object({
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
    exchangeRate: z
      .number()
      .min(1000, "최소 1,000원")
      .max(2000, "최대 2,000원"),
    exchangeRateOption: z.enum(["fixed", "variable"]),
    bondAllocation: z.number().min(0).max(100),
    indexAllocation: z.number().min(0).max(100),
    dividendAllocation: z.number().min(0).max(100),
  })
  .refine(
    (data) => {
      // 포트폴리오 비중 검증
      if (data.strategy === "portfolio") {
        const total =
          data.bondAllocation + data.indexAllocation + data.dividendAllocation;
        return total === 100;
      }
      return true;
    },
    {
      message: "포트폴리오 비중의 합계는 100%가 되어야 합니다",
      path: ["bondAllocation"], // 에러를 bondAllocation에 표시
    }
  );

type SimulationFormData = z.infer<typeof simulationSchema>;

const strategyOptions = [
  { value: "bond", label: "국채 (안정적 4%)" },
  { value: "index", label: "인덱스 ETF (추천 ⭐ 6.8%)" },
  { value: "dividend", label: "고배당 ETF (적극적 8.46%)" },
  { value: "custom", label: "직접 설정" },
  { value: "portfolio", label: "나만의 포트폴리오" },
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
    trigger,
    control,
  } = useForm<SimulationFormData>({
    resolver: zodResolver(simulationSchema),
    defaultValues: {
      monthlyAmount: currentInput.monthlyAmount || 500000, // 기본값 50만원
      investmentPeriod: currentInput.investmentPeriod || 10,
      strategy: currentInput.strategy || "index",
      customReturnRate: currentInput.customReturnRate,
      exchangeRate: currentInput.exchangeRate || 1400,
      exchangeRateOption: currentInput.exchangeRateOption || "fixed",
      bondAllocation: currentInput.portfolioAllocation?.bond || 30,
      indexAllocation: currentInput.portfolioAllocation?.index || 50,
      dividendAllocation: currentInput.portfolioAllocation?.dividend || 20,
    },
  });

  const selectedStrategy = watch("strategy");
  const bondAllocation = watch("bondAllocation") || 0;
  const indexAllocation = watch("indexAllocation") || 0;
  const dividendAllocation = watch("dividendAllocation") || 0;

  // 실시간으로 비중 합계 검증
  React.useEffect(() => {
    if (selectedStrategy === "portfolio") {
      // 값이 변경될 때마다 유효성 검사 실행
      if (
        bondAllocation !== undefined ||
        indexAllocation !== undefined ||
        dividendAllocation !== undefined
      ) {
        trigger(["bondAllocation", "indexAllocation", "dividendAllocation"]);
      }
    }
  }, [
    bondAllocation,
    indexAllocation,
    dividendAllocation,
    selectedStrategy,
    trigger,
  ]);

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
        <CardTitle>
          <div className="flex items-center gap-2">
            <span>투자 시뮬레이션 설정</span>
            <Tooltip content="가상으로 투자 결과를 미리 계산해보는 것입니다" />
          </div>
        </CardTitle>
      </CardHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        {/* 월 불입액 */}
        <Controller
          name="monthlyAmount"
          control={control}
          render={({ field }) => (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-700">
                  <Tooltip
                    content="매달 꾸준히 투자할 금액입니다. 월급의 20-30%가 적당해요"
                    term="월 불입액"
                  />
                </label>
              </div>
              <NumberInput
                inputMode="numeric"
                value={field.value}
                onChange={(e) => {
                  const numericValue = Number(e.target.value);
                  if (!isNaN(numericValue)) {
                    field.onChange(numericValue);
                  }
                }}
                error={errors.monthlyAmount?.message}
                placeholder="예: 500000"
                showKoreanCurrency={true}
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 커피 한 잔 금액으로도 시작할 수 있어요
              </p>
            </div>
          )}
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
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium text-gray-700">
              투자 전략
            </label>
            <Tooltip content="어떤 방식으로 투자할지 선택합니다. 초보자는 '인덱스 ETF'를 추천해요" />
          </div>
          <Select
            options={strategyOptions}
            {...register("strategy")}
            error={errors.strategy?.message}
          />
        </div>

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
          <Controller
            name="exchangeRate"
            control={control}
            render={({ field }) => (
              <NumberInput
                label="환율 (원)"
                inputMode="numeric"
                value={field.value}
                onChange={(e) => {
                  const numericValue = Number(e.target.value);
                  if (!isNaN(numericValue)) {
                    field.onChange(numericValue);
                  }
                }}
                error={errors.exchangeRate?.message}
                placeholder="예: 1400"
              />
            )}
          />
          <Select
            label="환율 옵션"
            options={exchangeRateOptions}
            {...register("exchangeRateOption")}
            error={errors.exchangeRateOption?.message}
          />
        </div>

        {/* 계산 버튼 */}
        <div className="space-y-3">
          <Button
            type="button"
            onClick={handleCalculate}
            className="w-full"
            size="lg"
          >
            미래 자산 계산하기 🎆
          </Button>
          <p className="text-center text-xs text-gray-500">
            ⚠️ 실제 투자 수익은 시장 상황에 따라 달라질 수 있습니다
          </p>
        </div>
      </form>
    </Card>
  );
}
