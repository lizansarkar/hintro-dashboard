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
          fixed top-0 left-0 z-50 h-full w-[260px] bg-card border-r border-border shadow-lg lg:shadow-none
          flex flex-col transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm select-none">H</span>
            </div>
            <span className="text-lg font-bold text-text tracking-tight">
              Hintro
            </span>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-surface-100 transition-colors"
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
              {activeItem === id ? (
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              ) : (
                <ChevronRight
                  size={14}
                  className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-ink-300"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-border shrink-0">
          <button
            onClick={handleLogout}
            className="sidebar-link w-full text-danger/80 hover:text-danger hover:bg-danger/10"
          >
            <LogOut size={18} className="shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
