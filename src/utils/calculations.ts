import {
  SimulationInput,
  SimulationResult,
  YearlyResult,
  MonthlyResult,
  InvestmentStrategy,
  TargetCalculation,
} from "../types";

// 투자 전략별 수익률 (세후)
const STRATEGY_RETURN_RATES: Record<InvestmentStrategy, number> = {
  bond: 4.0, // 국채
  index: 6.8, // 인덱스 ETF
  dividend: 8.46, // 고배당 ETF
  custom: 0, // 커스텀 (사용자 입력)
};

/**
 * 포트폴리오 비중을 기반으로 가중 평균 수익률 계산
 */
export function calculatePortfolioReturnRate(
  allocation: SimulationInput["portfolioAllocation"],
  customReturnRate?: number
): number {
  const bondRate = STRATEGY_RETURN_RATES.bond;
  const indexRate = STRATEGY_RETURN_RATES.index;
  const dividendRate = STRATEGY_RETURN_RATES.dividend;

  return (
    (bondRate * allocation.bond) / 100 +
    (indexRate * allocation.index) / 100 +
    (dividendRate * allocation.dividend) / 100 +
    ((customReturnRate || 0) *
      (100 - allocation.bond - allocation.index - allocation.dividend)) /
      100
  );
}

/**
 * 복리 계산 공식: FV = PMT × [((1 + r)^n - 1) / r]
 * @param monthlyAmount 월 불입액
 * @param annualRate 연 수익률 (%)
 * @param years 투자 기간 (년)
 */
export function calculateCompoundInterest(
  monthlyAmount: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  if (monthlyRate === 0) {
    return monthlyAmount * totalMonths;
  }

  return (
    monthlyAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
  );
}

/**
 * 목표 금액을 위한 필요한 월 불입액 계산
 * @param targetAmount 목표 금액
 * @param annualRate 연 수익률 (%)
 * @param years 투자 기간 (년)
 */
export function calculateRequiredMonthlyAmount(
  targetAmount: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  if (monthlyRate === 0) {
    return targetAmount / totalMonths;
  }

  return (
    (targetAmount * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
}

/**
 * 월별 상세 계산 결과 생성
 */
export function calculateMonthlyResults(
  monthlyAmount: number,
  annualRate: number,
  years: number
): MonthlyResult[] {
  const monthlyRate = annualRate / 100 / 12;
  const results: MonthlyResult[] = [];

  let cumulativeInvestment = 0;
  let portfolioValue = 0;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      cumulativeInvestment += monthlyAmount;

      if (monthlyRate === 0) {
        portfolioValue = cumulativeInvestment;
      } else {
        portfolioValue =
          cumulativeInvestment *
          Math.pow(1 + monthlyRate, (year - 1) * 12 + month);
      }

      const profit = portfolioValue - cumulativeInvestment;
      const profitRate =
        cumulativeInvestment > 0 ? (profit / cumulativeInvestment) * 100 : 0;

      results.push({
        month,
        year,
        cumulativeInvestment,
        portfolioValue,
        profit,
        profitRate,
      });
    }
  }

  return results;
}

/**
 * 연도별 결과 생성
 */
export function calculateYearlyResults(
  monthlyResults: MonthlyResult[]
): YearlyResult[] {
  const yearlyMap = new Map<number, MonthlyResult[]>();

  // 월별 결과를 연도별로 그룹화
  monthlyResults.forEach((result) => {
    if (!yearlyMap.has(result.year)) {
      yearlyMap.set(result.year, []);
    }
    yearlyMap.get(result.year)!.push(result);
  });

  // 연도별 결과 생성
  return Array.from(yearlyMap.entries()).map(([year, monthlyData]) => {
    const lastMonth = monthlyData[monthlyData.length - 1];
    return {
      year,
      cumulativeInvestment: lastMonth.cumulativeInvestment,
      portfolioValue: lastMonth.portfolioValue,
      profit: lastMonth.profit,
      profitRate: lastMonth.profitRate,
      monthlyResults: monthlyData,
    };
  });
}

/**
 * 전체 시뮬레이션 계산
 */
export function calculateSimulation(input: SimulationInput): SimulationResult {
  const {
    monthlyAmount,
    investmentPeriod,
    strategy,
    customReturnRate,
    portfolioAllocation,
  } = input;

  // 수익률 계산
  let annualRate: number;
  if (strategy === "custom" && customReturnRate) {
    annualRate = customReturnRate;
  } else if (
    strategy === "bond" ||
    strategy === "index" ||
    strategy === "dividend"
  ) {
    annualRate = STRATEGY_RETURN_RATES[strategy];
  } else {
    // 포트폴리오 비중 기반 계산
    annualRate = calculatePortfolioReturnRate(
      portfolioAllocation,
      customReturnRate
    );
  }

  // 월별 결과 계산
  const monthlyResults = calculateMonthlyResults(
    monthlyAmount,
    annualRate,
    investmentPeriod
  );

  // 연도별 결과 계산
  const yearlyResults = calculateYearlyResults(monthlyResults);

  // 최종 결과
  const finalResult = yearlyResults[yearlyResults.length - 1];
  const totalInvestment = finalResult.cumulativeInvestment;
  const finalValue = finalResult.portfolioValue;
  const totalProfit = finalResult.profit;
  const totalProfitRate = finalResult.profitRate;

  // 연평균 수익률 계산 (CAGR)
  const effectiveReturnRate =
    Math.pow(finalValue / totalInvestment, 1 / investmentPeriod) - 1;

  return {
    input,
    yearlyResults,
    totalInvestment,
    finalValue,
    totalProfit,
    totalProfitRate,
    effectiveReturnRate: effectiveReturnRate * 100,
  };
}

/**
 * 목표 금액 역산 계산
 */
export function calculateTargetAmount(input: {
  targetAmount: number;
  targetPeriod: number;
  strategy: InvestmentStrategy;
  customReturnRate?: number;
  portfolioAllocation?: SimulationInput["portfolioAllocation"];
}): TargetCalculation {
  const {
    targetAmount,
    targetPeriod,
    strategy,
    customReturnRate,
    portfolioAllocation,
  } = input;

  // 수익률 계산
  let annualRate: number;
  if (strategy === "custom" && customReturnRate) {
    annualRate = customReturnRate;
  } else if (
    strategy === "bond" ||
    strategy === "index" ||
    strategy === "dividend"
  ) {
    annualRate = STRATEGY_RETURN_RATES[strategy];
  } else if (portfolioAllocation) {
    annualRate = calculatePortfolioReturnRate(
      portfolioAllocation,
      customReturnRate
    );
  } else {
    annualRate = 6.8; // 기본값
  }

  const requiredMonthlyAmount = calculateRequiredMonthlyAmount(
    targetAmount,
    annualRate,
    targetPeriod
  );

  return {
    targetAmount,
    targetPeriod,
    requiredMonthlyAmount,
    strategy,
    customReturnRate,
  };
}

/**
 * 숫자를 천 단위 콤마가 있는 문자열로 변환
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(amount));
}

/**
 * 퍼센트를 소수점 둘째 자리까지 포맷
 */
export function formatPercentage(rate: number): string {
  return `${rate.toFixed(2)}%`;
}

/**
 * 숫자를 한글 금액으로 변환
 * 예: 1000000 -> "백만원"
 */
export function formatKoreanCurrency(amount: number): string {
  const units = ["원", "만원", "억원", "조원"];
  const unitValue = 10000;

  let formattedAmount = amount;
  let unitIndex = 0;

  // "만원" 단위로 변환
  if (amount >= unitValue) {
    formattedAmount = Math.floor(amount / unitValue);
    unitIndex = 1;
  }

  // "억원" 단위로 변환
  if (formattedAmount >= unitValue) {
    formattedAmount = Math.floor(formattedAmount / unitValue);
    unitIndex = 2;
  }

  // "조원" 단위로 변환
  if (formattedAmount >= unitValue) {
    formattedAmount = Math.floor(formattedAmount / unitValue);
    unitIndex = 3;
  }

  // 천 단위로 쉼표 추가
  const numberFormat = new Intl.NumberFormat("ko-KR");
  return `${numberFormat.format(formattedAmount)}${units[unitIndex]}`;
}
