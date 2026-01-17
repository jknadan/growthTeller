"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

interface FeatureCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: "blue" | "green" | "purple";
}

const colorClasses = {
  blue: {
    hover: "hover:bg-blue-50 hover:border-blue-200",
    active: "active:bg-blue-100",
    title: "group-hover:text-blue-600",
    touch: "bg-blue-50 border-blue-200",
  },
  green: {
    hover: "hover:bg-green-50 hover:border-green-200",
    active: "active:bg-green-100",
    title: "group-hover:text-green-600",
    touch: "bg-green-50 border-green-200",
  },
  purple: {
    hover: "hover:bg-purple-50 hover:border-purple-200",
    active: "active:bg-purple-100",
    title: "group-hover:text-purple-600",
    touch: "bg-purple-50 border-purple-200",
  },
};

export function FeatureCard({
  href,
  icon,
  title,
  description,
  features,
  color,
}: FeatureCardProps) {
  const [isTouching, setIsTouching] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const colors = colorClasses[color];

  const handleTouchStart = () => {
    setIsTouching(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!cardRef.current) return;

    const touch = e.touches[0];
    const cardRect = cardRef.current.getBoundingClientRect();
    const touchX = touch.clientX;
    const touchY = touch.clientY;

    // 터치 좌표가 카드 영역 안에 있는지 확인
    const isInside =
      touchX >= cardRect.left &&
      touchX <= cardRect.right &&
      touchY >= cardRect.top &&
      touchY <= cardRect.bottom;

    setIsTouching(isInside);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  return (
    <Link href={href}>
      <div
        ref={cardRef}
        className={`apple-card p-8 cursor-pointer transition-all duration-300 
                    ${colors.hover} ${colors.active}
                    ${isTouching ? `${colors.touch} shadow-lg` : ""}
                    group`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div className="text-center">
          <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3
            className={`apple-text-small font-semibold text-gray-900 mb-4 
                       ${colors.title} transition-colors duration-300`}
          >
            {title}
          </h3>
          <p className="apple-text-body text-gray-600 mb-6">{description}</p>
          <div className="space-y-2 text-left">
            {features.map((feature, index) => (
              <div key={index} className="apple-text-caption text-gray-500">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

