"use client";

import { navbarRoutes } from "@/config/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block bg-black h-[32px] fixed inset-0 z-50">
      <ul className="flex space-x-4 max-w-5xl px-8 xl:px-0 mx-auto">
        {navbarRoutes.map((route) => {
          const isActive =
            (pathname === "/" && route.route === "/") ||
            (route.route !== "/" && pathname.includes(route.route));
          return (
            <li
              key={route.route}
              className={cn(
                "text-white text-sm border-b-2 border-transparent py-1 h-[32px]",
                isActive && "border-white",
              )}
            >
              <Link href={route.route} className="font-light inter">
                {route.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
