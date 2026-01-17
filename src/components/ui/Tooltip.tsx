import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  term?: string;
}

// 금융 용어 사전
export const financialTerms: Record<string, string> = {
  "복리": "이자에 이자가 붙는 것. 원금과 이자를 합친 금액에 다시 이자가 붙어 눈덩이처럼 불어나는 효과",
  "ETF": "주식처럼 거래되는 펀드. 여러 주식을 한 번에 살 수 있어 위험 분산이 가능",
  "인덱스 ETF": "코스피200 같은 지수를 그대로 따라가는 ETF. 시장 평균 수익률을 기대할 수 있음",
  "고배당 ETF": "배당금을 많이 주는 기업들만 모아둔 ETF. 정기적인 배당 수익을 받을 수 있음",
  "포트폴리오": "여러 종류의 투자 상품을 적절히 섞어 놓은 투자 구성",
  "변동성": "투자 상품의 가격이 오르내리는 정도. 높을수록 위험하지만 수익 가능성도 큼",
  "수익률": "투자한 돈 대비 벌거나 잃은 돈의 비율. 예: 100만원 투자해서 10만원 벌면 10%",
  "연평균 수익률": "여러 해 동안의 수익률을 1년 평균으로 계산한 것",
  "누적 투자금": "지금까지 투자한 돈의 총합",
  "원금": "처음 투자한 돈. 수익이나 손실을 제외한 순수 투자 금액",
  "시뮬레이션": "실제 투자 전에 가상으로 투자 결과를 미리 계산해보는 것",
  "월 불입액": "매달 일정하게 투자하는 금액",
  "국채": "정부가 발행하는 채권. 가장 안전한 투자 상품 중 하나",
  "세후 수익률": "세금을 뺀 실제 수익률. 투자 수익에는 15.4%의 세금이 붙음"
};

export function Tooltip({ content, children, term }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  const tooltipContent = term ? financialTerms[term] || content : content;

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex items-center gap-1 cursor-help"
      >
        {children || <span className="border-b border-dotted border-gray-400">{term}</span>}
        <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 
                       w-[calc(100vw-2rem)] max-w-sm sm:min-w-[300px] sm:max-w-lg sm:w-auto"
          >
            <div className="bg-gray-900 text-white text-sm rounded-lg px-4 py-3 shadow-lg">
              <div className="relative">
                <div className="leading-relaxed break-words">
                  {tooltipContent}
                </div>
                {/* 화살표 */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 용어가 포함된 텍스트를 자동으로 툴팁으로 변환
export function TextWithTooltips({ text }: { text: string }) {
  const terms = Object.keys(financialTerms);
  const components: React.ReactNode[] = [];
  let lastIndex = 0;

  terms.forEach((term) => {
    const index = text.indexOf(term);
    if (index !== -1) {
      // 텍스트를 분리하여 툴팁 컴포넌트 삽입
      if (index > lastIndex) {
        components.push(text.substring(lastIndex, index));
      }
      components.push(
        <Tooltip key={term} term={term}>
          <span className="border-b border-dotted border-gray-400">{term}</span>
        </Tooltip>
      );
      lastIndex = index + term.length;
    }
  });

  if (lastIndex < text.length) {
    components.push(text.substring(lastIndex));
  }

  return <>{components.length > 0 ? components : text}</>;
}



