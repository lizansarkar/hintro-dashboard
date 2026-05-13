"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardData, UserState } from "@/types";
import { fetchDashboardData } from "@/services/api";

interface UseDashboardReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  userState: UserState;
  setUserState: (state: UserState) => void;
  refetch: () => void;
}

export function useDashboard(
  initialState: UserState = "active"
): UseDashboardReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userState, setUserState] = useState<UserState>(initialState);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchDashboardData(userState);
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || "Failed to fetch dashboard data");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [userState]);

  useEffect(() => {
    fetchData(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [fetchData]);

  return { data, loading, error, userState, setUserState, refetch: fetchData };
}