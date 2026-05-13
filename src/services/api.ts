import { ApiResponse, DashboardData, FeedbackPayload, UserState } from "@/types";
import { getMockDashboardData } from "./mockData";

/**
 * Axios-ready API layer.
 *
 * Currently backed by mock data. Replace the implementations with
 * real Axios calls when the backend is ready:
 *
 *   import axios from "axios";
 *   const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
 */

const SIMULATED_DELAY = 800;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchDashboardData(
  state: UserState = "active"
): Promise<ApiResponse<DashboardData>> {
  await delay(SIMULATED_DELAY);

  return {
    data: getMockDashboardData(state),
    success: true,
  };
}

export async function submitFeedback(
  payload: FeedbackPayload
): Promise<ApiResponse<null>> {
  await delay(SIMULATED_DELAY);

  const existing = JSON.parse(localStorage.getItem("hintro_feedback") || "[]");
  existing.push(payload);
  localStorage.setItem("hintro_feedback", JSON.stringify(existing));

  return {
    data: null,
    success: true,
    message: "Feedback submitted successfully",
  };
}

export async function fetchFeedback(): Promise<ApiResponse<FeedbackPayload[]>> {
  await delay(200);

  const data = JSON.parse(localStorage.getItem("hintro_feedback") || "[]");

  return {
    data,
    success: true,
  };
}