"use client";

import { Menu, Bell, Search, ToggleLeft, ToggleRight, ChevronDown } from "lucide-react";
import { User } from "@/types";

interface NavbarProps {
  user: User;
  onMenuToggle: () => void;
  userState: "u1" | "u2";
  onToggleState: () => void;
}

export default function Navbar({
  user,
  onMenuToggle,
  userState,
  onToggleState,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between gap-4 h-full px-4 sm:px-6 lg:px-8">
        {/* Left: Hamburger + Search */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text hover:bg-surface-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="hidden sm:flex items-center gap-2.5 w-full max-w-md px-3.5 py-2 rounded-lg
                          bg-surface-100 border border-transparent text-text-muted
                          focus-within:bg-card focus-within:border-primary/40
                          focus-within:ring-4 focus-within:ring-primary/10
                          transition-all duration-200 cursor-text">
            <Search size={16} className="shrink-0" />
            <input
              type="text"
              placeholder="Search calls, contacts…"
              className="w-full bg-transparent text-sm text-text placeholder:text-text-muted/70 outline-none"
              aria-label="Search"
            />
            <kbd
              className="hidden md:inline-flex shrink-0 items-center h-5 px-1.5 rounded
                         bg-card border border-border text-[10px] font-semibold text-text-muted"
            >
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: State toggle + Notifications + Avatar */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Toggle demo state */}
          <button
            onClick={onToggleState}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
                       border border-border bg-card text-text-muted shadow-sm
                       hover:border-primary/40 hover:text-text transition-colors"
            title={`Switch to ${userState === "u1" ? "u2" : "u1"} state`}
          >
            {userState === "u1" ? (
              <ToggleLeft size={16} />
            ) : (
              <ToggleRight size={16} className="text-primary" />
            )}
            <span className="hidden sm:inline">
              {userState === "u1" ? "U1" : "U2"}
            </span>
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg text-text-muted hover:text-text hover:bg-surface-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 flex items-center justify-center
                             min-w-[8px] h-2 px-0.5 bg-danger ring-2 ring-card rounded-full" />
          </button>

          {/* Avatar */}
          <button
            className="flex items-center gap-2 pl-2 sm:pl-3 sm:ml-1 sm:border-l sm:border-border group"
            aria-label="Account menu"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light
                            text-white flex items-center justify-center text-sm font-semibold
                            ring-2 ring-card shadow-sm select-none">
              {user?.name?.[0] || "U"}
            </div>
            <span className="hidden md:block text-sm font-medium text-text">
              {user?.name || "User"}
            </span>
            <ChevronDown
              size={14}
              className="hidden md:block text-text-muted transition-transform duration-200 group-hover:translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
