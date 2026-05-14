"use client";

import {
  LayoutDashboard,
  Phone,
  BookOpen,
  MessageSquareText,
  MessageSquare,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onNavigate: (item: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "call-insights", label: "Call Insights", icon: Phone },
  { id: "knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { id: "prompts", label: "Prompts", icon: MessageSquareText },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
];

export default function Sidebar({
  isOpen,
  onClose,
  activeItem,
  onNavigate,
}: SidebarProps) {
  const handleNavigate = (id: string) => {
    onNavigate(id);
    onClose();
  };

  const handleLogout = () => {
    alert("Logout clicked — wire to your auth logic");
    onClose();
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px] bg-card border-r border-border
          flex flex-col transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-lg font-bold text-text tracking-tight">
              Hintro
            </span>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-border transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 mb-2 text-[11px] font-semibold text-ink-300 uppercase tracking-wider">
            Menu
          </p>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavigate(id)}
              className={`
                sidebar-link w-full group
                ${activeItem === id ? "active" : ""}
              `}
            >
              <Icon size={18} className="shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              <ChevronRight
                size={14}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-ink-300"
              />
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="sidebar-link w-full text-danger/70 hover:text-danger hover:bg-danger/5"
          >
            <LogOut size={18} className="shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
