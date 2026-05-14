"use client";

import { Menu, Bell, Search, ToggleLeft, ToggleRight } from "lucide-react";
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
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Left: Hamburger + Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text hover:bg-border transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-border text-text-muted">
            <span className="text-2xl">Dashboard</span>
          </div>
        </div>

        {/* Right: State toggle + Notifications + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Toggle demo state */}
          <button
            onClick={onToggleState}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
                       border border-border bg-border text-text-muted
                       hover:bg-border hover:text-text transition-colors"
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
            className="relative p-2 rounded-lg text-text-muted hover:text-text hover:bg-border transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-3 sm:border-l sm:border-border">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
              {user?.name?.[0] || "U"}
            </div>
            <span className="hidden md:block text-sm font-medium text-text">
              {user?.name || "User"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
