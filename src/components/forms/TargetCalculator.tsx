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
import { InvestmentStrategy } from "../../types";
import { useSimulationStore } from "../../stores/simulationStore";
import { formatCurrency } from "../../utils/calculations";
import { GoalSelector, GoalDetails, GoalTemplate } from "../goals/GoalTemplates";
import { Tooltip } from "../ui/Tooltip";

// 목표 금액 역산 폼 검증 스키마
const targetSchema = z.object({
  targetAmount: z.number().min(1000000, "최소 100만원 이상 입력해주세요"),
  targetPeriod: z
    .number()
    .min(1, "최소 1년 이상")
    .max(50, "최대 50년까지 입력 가능합니다"),
  strategy: z.enum(["bond", "index", "dividend", "custom"]),
  customReturnRate: z.number().optional(),
});

type TargetFormData = z.infer<typeof targetSchema>;

const strategyOptions = [
  { value: "bond", label: "국채 (안정적 4%)" },
  { value: "index", label: "인덱스 ETF (추천 ⭐ 6.8%)" },
  { value: "dividend", label: "고배당 ETF (적극적 8.46%)" },
  { value: "custom", label: "직접 설정" },
];

export function TargetCalculator() {
  const { calculateTarget, targetCalculation } = useSimulationStore();
  const [selectedGoal, setSelectedGoal] = React.useState<GoalTemplate | null>(null);
  const [showGoalSelector, setShowGoalSelector] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<TargetFormData>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
      targetAmount: selectedGoal?.targetAmount || 50000000, // 5천만원
      targetPeriod: selectedGoal?.suggestedPeriod || 5, // 5년
      strategy: "index",
    },
  });

  const selectedStrategy = watch("strategy");

  const handleGoalSelect = (goal: GoalTemplate) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/fd82309c-61f9-4b84-9928-7208b4522866',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'TargetCalculator.tsx:handleGoalSelect:entry',message:'handleGoalSelect called',data:{goalId:goal.id,goalTargetAmount:goal.targetAmount,goalSuggestedPeriod:goal.suggestedPeriod},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    setSelectedGoal(goal);
    setShowGoalSelector(false);
    
    // 선택한 목표의 값으로 폼 업데이트
    if (goal.id === "custom") {
      // "나만의 목표"는 값이 0이므로 폼은 그대로 유지
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/fd82309c-61f9-4b84-9928-7208b4522866',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'TargetCalculator.tsx:handleGoalSelect:custom',message:'Custom goal selected, skipping reset',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      return;
    }
    
    // reset을 사용해 폼 값 확실하게 업데이트
    const currentValues = watch();
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/fd82309c-61f9-4b84-9928-7208b4522866',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'TargetCalculator.tsx:handleGoalSelect:before-reset',message:'Values before reset',data:{currentValues,goalTargetAmount:goal.targetAmount,goalSuggestedPeriod:goal.suggestedPeriod},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    const newValues = {
      targetAmount: goal.targetAmount > 0 ? goal.targetAmount : currentValues.targetAmount,
      targetPeriod: goal.suggestedPeriod > 0 ? goal.suggestedPeriod : currentValues.targetPeriod,
      strategy: currentValues.strategy,
      customReturnRate: currentValues.customReturnRate,
    };
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/fd82309c-61f9-4b84-9928-7208b4522866',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'TargetCalculator.tsx:handleGoalSelect:calling-reset',message:'Calling reset with values',data:{newValues},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    reset(newValues);
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/fd82309c-61f9-4b84-9928-7208b4522866',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'TargetCalculator.tsx:handleGoalSelect:after-reset',message:'Reset called, checking values',data:{valuesAfterReset:watch()},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
  };

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
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>목표 금액 역산</span>
            <Button
              type="button"
              onClick={() => setShowGoalSelector(!showGoalSelector)}
              variant="outline"
              size="sm"
            >
              {showGoalSelector ? "닫기" : "🎯 목표 템플릿"}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      {/* 목표 템플릿 선택 */}
      {showGoalSelector && (
        <div className="mb-6">
          <GoalSelector 
            onSelectGoal={handleGoalSelect}
            currentGoalId={selectedGoal?.id}
          />
        </div>
      )}

      {/* 선택된 목표 표시 */}
      {selectedGoal && !showGoalSelector && (
        <div className="mb-6">
          <GoalDetails goal={selectedGoal} />
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        {/* 목표 금액 */}
        <Controller
          name="targetAmount"
          control={control}
          render={({ field }) => {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/fd82309c-61f9-4b84-9928-7208b4522866',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'TargetCalculator.tsx:Controller:render',message:'Controller render called',data:{fieldValue:field.value},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
            
            return (
              <NumberInput
                label="목표 금액 (원)"
                inputMode="numeric"
                value={field.value}
                onChange={(e) => {
                  const numericValue = Number(e.target.value);
                  if (!isNaN(numericValue)) {
                    field.onChange(numericValue);
                    setSelectedGoal(null); // 수동 입력 시 템플릿 해제
                  }
                }}
                error={errors.targetAmount?.message}
                placeholder="예: 50000000"
                showKoreanCurrency={true}
              />
            );
          }}
        />

        {/* 목표 기간 */}
        <Input
          label="목표 기간 (년)"
          type="number"
          {...register("targetPeriod", { 
            valueAsNumber: true,
            onChange: () => {
              // 수동 입력 시 템플릿 해제
              setSelectedGoal(null);
            }
          })}
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
          필요한 월 투자금 계산하기 👍
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
