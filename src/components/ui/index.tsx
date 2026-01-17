import React from "react";
import { cn } from "../../utils/cn";
import { formatKoreanCurrency } from "../../utils/calculations";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "apple-button",
    secondary: "apple-button-secondary",
    outline: "apple-button-secondary",
    ghost: "hover:bg-gray-100 text-gray-600",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showKoreanCurrency?: boolean; // 한글 금액 표시 여부
}

// 천 단위 포맷의 숫자 입력을 위한 별도 컴포넌트
export function NumberInput({
  label,
  error,
  className,
  showKoreanCurrency = false,
  value,
  onChange,
  ...props
}: InputProps & {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const generatedId = React.useId();
  const inputId = props.id || generatedId;

  // 숫자를 천 단위로 포맷
  const formatNumber = React.useCallback((num: string | number | undefined) => {
    if (num === undefined || num === null || num === "") return "";
    const numStr = String(num).replace(/,/g, "");
    if (numStr === "" || numStr === "0") return "";
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  const [displayValue, setDisplayValue] = React.useState(() =>
    formatNumber(value)
  );

  // 외부에서 value가 변경되면 displayValue 업데이트
  React.useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/fd82309c-61f9-4b84-9928-7208b4522866',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'NumberInput:useEffect:entry',message:'NumberInput useEffect triggered',data:{value,label},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    const formatted = formatNumber(value);
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/fd82309c-61f9-4b84-9928-7208b4522866',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'NumberInput:useEffect:formatted',message:'Setting displayValue',data:{value,formatted,label},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    
    setDisplayValue(formatted);
  }, [value, formatNumber, label]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const withoutComma = inputValue.replace(/,/g, "");
    const numbers = withoutComma.replace(/[^0-9]/g, "");

    // 포맷된 값으로 표시
    const formatted = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setDisplayValue(formatted);

    // onChange 호출
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: numbers },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const numericValue = displayValue.replace(/,/g, "");
  const koreanCurrency =
    showKoreanCurrency && numericValue && numericValue !== ""
      ? formatKoreanCurrency(Number(numericValue))
      : null;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          {...props}
          value={displayValue}
          onChange={handleChange}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
            showKoreanCurrency && koreanCurrency ? "pr-16" : "",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
        />
        {showKoreanCurrency && koreanCurrency && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-medium">
            {koreanCurrency}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function Input({ label, error, className, ...props }: InputProps) {
  const generatedId = React.useId();
  const inputId = props.id || generatedId;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold text-gray-900", className)}>
      {children}
    </h3>
  );
}

// Export Tooltip component
export { Tooltip, TextWithTooltips, financialTerms } from "./Tooltip";
