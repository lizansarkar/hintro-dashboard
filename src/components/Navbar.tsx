"use client";

import { Menu, Bell, Search, ToggleLeft, ToggleRight } from "lucide-react";
import { User } from "@/types";

interface NavbarProps {
  user: User;
  onMenuToggle: () => void;
  userState: "empty" | "active";
  onToggleState: () => void;
}

export default function Navbar({
  user,
  onMenuToggle,
  userState,
  onToggleState,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-surface-0/80 backdrop-blur-md border-b border-surface-200">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Left: Hamburger + Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-ink-500 hover:text-ink-900 hover:bg-surface-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-surface-50 text-ink-300">
            <span className="text-2xl">Dashboard</span>
          </div>
        </div>

        {/* Right: State toggle + Notifications + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Toggle demo state */}
          <button
            onClick={onToggleState}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
                       border border-surface-200 bg-surface-50 text-ink-500
                       hover:bg-surface-100 hover:text-ink-700 transition-colors"
            title={`Switch to ${userState === "empty" ? "active" : "empty"} state`}
          >
            {userState === "empty" ? (
              <ToggleLeft size={16} />
            ) : (
              <ToggleRight size={16} className="text-brand-600" />
            )}
            <span className="hidden sm:inline">
              {userState === "empty" ? "Empty" : "Active"}
            </span>
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg text-ink-500 hover:text-ink-900 hover:bg-surface-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-600 rounded-full" />
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-3 sm:border-l sm:border-surface-200">
            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-semibold">
              {user.name.charAt(0)}
            </div>
            <span className="hidden md:block text-sm font-medium text-ink-700">
              {user.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
