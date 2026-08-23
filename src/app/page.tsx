"use client";

import { useState } from "react";
import { useDashboard } from "@/hooks/useDashboard";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatsCards from "@/components/StatsCards";
import RecentCalls from "@/components/RecentCalls";
import FeedbackModal from "@/components/FeedbackModal";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const { data, loading, userState, setUserState } = useDashboard("u1");

  // Toggle between u1/u2 for demo
  const toggleUserState = () => {
    setUserState(userState === "u1" ? "u2" : "u1");
  };

  // Intercept feedback nav click to open modal
  const handleNavigate = (item: string) => {
    if (item === "feedback") {
      setFeedbackOpen(true);
    }
    setActiveNav(item);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeNav}
        onNavigate={handleNavigate}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          user={data?.user ?? { id: "", name: "User", email: "" }}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          userState={userState}
          onToggleState={toggleUserState}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
            {/* Greeting */}
            <div className="animate-fade-in flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
                  Hi, {data?.user.name ?? "User"}{" "}
                  <span role="img" aria-label="wave" className="inline-block animate-wave origin-bottom-right">
                    👋
                  </span>
                </h1>
                <p className="mt-1.5 text-sm sm:text-base text-text-muted">
                  Here&apos;s what&apos;s happening with your calls today.
                </p>
              </div>
            </div>

            {/* Stats */}
            <StatsCards
              stats={
                data?.stats ?? {
                  totalSessions: 0,
                  averageDuration: 0,
                  aiUsed: 0,
                  lastSession: null,
                }
              }
              loading={loading}
            />

            {/* Recent Calls */}
            <RecentCalls calls={data?.recentCalls ?? []} loading={loading} />
          </div>
        </main>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
    </div>
  );
}
