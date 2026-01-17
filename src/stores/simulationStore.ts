import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  SimulationInput,
  SimulationResult,
  ScenarioComparison,
  TargetCalculation,
} from "../types";
import {
  calculateSimulation,
  calculateTargetAmount,
} from "../utils/calculations";

interface SimulationStore {
  // 현재 시뮬레이션 입력값
  currentInput: SimulationInput;

  // 현재 시뮬레이션 결과
  currentResult: SimulationResult | null;

  // 시나리오 비교 데이터
  scenarios: ScenarioComparison[];

  // 목표 금액 역산 결과
  targetCalculation: TargetCalculation | null;

  // 액션들
  updateInput: (input: Partial<SimulationInput>) => void;
  calculateSimulation: () => void;
  addScenario: (name: string, color: string) => void;
  removeScenario: (index: number) => void;
  clearScenarios: () => void;
  calculateTarget: (params: {
    targetAmount: number;
    targetPeriod: number;
    strategy: SimulationInput["strategy"];
    customReturnRate?: number;
  }) => void;
  reset: () => void;
}

// 기본 입력값 - 사회초년생 맞춤형
const defaultInput: SimulationInput = {
  monthlyAmount: 500000, // 50만원 - 더 현실적인 시작 금액
  investmentPeriod: 10, // 10년
  strategy: "index", // 인덱스 ETF - 초보자 추천
  exchangeRate: 1400, // 1,400원
  exchangeRateOption: "fixed",
  portfolioAllocation: {
    bond: 30,      // 안정성 30%
    index: 50,     // 성장성 50%
    dividend: 20,  // 배당 20%
  },
};

export const useSimulationStore = create<SimulationStore>()(
  persist(
    (set, get) => ({
      currentInput: defaultInput,
      currentResult: null,
      scenarios: [],
      targetCalculation: null,

      updateInput: (input) => {
        set((state) => ({
          currentInput: { ...state.currentInput, ...input },
        }));
      },

      calculateSimulation: () => {
        const { currentInput } = get();
        const result = calculateSimulation(currentInput);
        set({ currentResult: result });
      },

      addScenario: (name: string, color: string) => {
        const { currentResult } = get();
        if (!currentResult) return;

        const scenario: ScenarioComparison = {
          name,
          color,
          yearlyResults: currentResult.yearlyResults,
          finalValue: currentResult.finalValue,
          totalProfit: currentResult.totalProfit,
        };

        set((state) => ({
          scenarios: [...state.scenarios, scenario],
        }));
      },

      removeScenario: (index: number) => {
        set((state) => ({
          scenarios: state.scenarios.filter((_, i) => i !== index),
        }));
      },

      clearScenarios: () => {
        set({ scenarios: [] });
      },

      calculateTarget: (params) => {
        const { currentInput } = get();
        const result = calculateTargetAmount({
          ...params,
          portfolioAllocation: currentInput.portfolioAllocation,
        });
        set({ targetCalculation: result });
      },

      reset: () => {
        set({
          currentInput: defaultInput,
          currentResult: null,
          scenarios: [],
          targetCalculation: null,
        });
      },
    }),
    {
      name: "simulation-store",
      partialize: (state) => ({
        currentInput: state.currentInput,
        scenarios: state.scenarios,
      }),
    }
  )
);

