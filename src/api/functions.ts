import api from "./client"
export { setUserId } from "./client"

export interface Profile {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface DashboardStats {
  totalSessions: number
  averageDuration: number
  aiUsed: number
  lastSession: string | null
}

export interface CallSession {
  id: string
  contactName: string
  contactRole: string
  duration: number
  date: string
  summary: string
  sentiment: "positive" | "neutral" | "negative"
  tags: string[]
}

export interface DashboardData {
  user: Profile
  stats: DashboardStats
  recentCalls: CallSession[]
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export const fetchProfile = async (): Promise<ApiResponse<Profile>> => {
  try {
    const response = await api.get("/api/auth/profile")
    return { data: response.data, success: true }
  } catch (error) {
    return {
      data: {} as Profile,
      success: false,
      message: "Failed to fetch profile",
    }
  }
}

export const fetchDashboard = async (): Promise<ApiResponse<DashboardData>> => {
  try {
    const response = await api.get("/api/auth/dashboard")
    return { data: response.data, success: true }
  } catch (error) {
    return {
      data: {} as DashboardData,
      success: false,
      message: "Failed to fetch dashboard",
    }
  }
}

export const fetchStats = async (): Promise<ApiResponse<DashboardStats>> => {
  try {
    const response = await api.get("/api/call-sessions/stats")
    return { data: response.data, success: true }
  } catch (error) {
    return {
      data: {} as DashboardStats,
      success: false,
      message: "Failed to fetch stats",
    }
  }
}

export const fetchCallSessions = async (
  limit = 10
): Promise<ApiResponse<CallSession[]>> => {
  try {
    const response = await api.get(`/api/call-sessions?limit=${limit}`)
    return { data: response.data, success: true }
  } catch (error) {
    return {
      data: [],
      success: false,
      message: "Failed to fetch call sessions",
    }
  }
}