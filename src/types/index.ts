// 투자 전략 타입
export type InvestmentStrategy = "bond" | "index" | "dividend" | "custom";

// 환율 옵션 타입
export type ExchangeRateOption = "fixed" | "variable";

// 포트폴리오 비중 설정
export interface PortfolioAllocation {
  bond: number; // 국채 비중 (%)
  index: number; // 인덱스 ETF 비중 (%)
  dividend: number; // 고배당 ETF 비중 (%)
}

// 투자 시뮬레이션 입력값
export interface SimulationInput {
  monthlyAmount: number; // 월 불입액 (원)
  investmentPeriod: number; // 투자 기간 (년)
  strategy: InvestmentStrategy; // 투자 전략
  customReturnRate?: number; // 커스텀 수익률 (%)
  exchangeRate: number; // 환율 (원)
  exchangeRateOption: ExchangeRateOption; // 환율 옵션
  portfolioAllocation: PortfolioAllocation; // 포트폴리오 비중
}

// 월별 계산 결과
export interface MonthlyResult {
  month: number; // 월 (1-12)
  year: number; // 연도
  cumulativeInvestment: number; // 누적 납입액
  portfolioValue: number; // 포트폴리오 가치
  profit: number; // 수익액
  profitRate: number; // 수익률 (%)
}

// 연도별 계산 결과
export interface YearlyResult {
  year: number;
  cumulativeInvestment: number;
  portfolioValue: number;
  profit: number;
  profitRate: number;
  monthlyResults: MonthlyResult[];
}

// 시뮬레이션 결과
export interface SimulationResult {
  input: SimulationInput;
  yearlyResults: YearlyResult[];
  totalInvestment: number; // 총 투자금액
  finalValue: number; // 최종 포트폴리오 가치
  totalProfit: number; // 총 수익
  totalProfitRate: number; // 총 수익률
  effectiveReturnRate: number; // 연평균 수익률
}

// 시나리오 비교용 데이터
export interface ScenarioComparison {
  name: string;
  color: string;
  yearlyResults: YearlyResult[];
  finalValue: number;
  totalProfit: number;
}

// 목표 금액 역산 결과
export interface TargetCalculation {
  targetAmount: number; // 목표 금액
  targetPeriod: number; // 목표 기간 (년)
  requiredMonthlyAmount: number; // 필요한 월 불입액
  strategy: InvestmentStrategy;
  customReturnRate?: number;
}

