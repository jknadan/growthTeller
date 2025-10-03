"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../utils/cn";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ href, children, isActive, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base",
        isActive
          ? "bg-blue-100 text-blue-700"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      )}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl">📈</span>
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                GrowthTeller
              </span>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 메뉴 */}
          <div className="hidden md:flex items-center space-x-1">
            <NavItem href="/simulation" isActive={pathname === "/simulation"}>
              투자 시뮬레이션
            </NavItem>
            <NavItem href="/target" isActive={pathname === "/target"}>
              목표 금액 역산
            </NavItem>
            <NavItem href="/comparison" isActive={pathname === "/comparison"}>
              시나리오 비교
            </NavItem>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">메뉴 열기</span>
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <NavItem
              href="/simulation"
              isActive={pathname === "/simulation"}
              onClick={closeMenu}
            >
              투자 시뮬레이션
            </NavItem>
            <NavItem
              href="/target"
              isActive={pathname === "/target"}
              onClick={closeMenu}
            >
              목표 금액 역산
            </NavItem>
            <NavItem
              href="/comparison"
              isActive={pathname === "/comparison"}
              onClick={closeMenu}
            >
              시나리오 비교
            </NavItem>
          </div>
        </div>
      </div>
    </nav>
  );
}
