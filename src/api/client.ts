import axios from "axios"

const api = axios.create({
  baseURL: "https://mock-backend-hintro.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add user ID to headers
export const setUserId = (userId: string) => {
  api.defaults.headers.common["x-user-id"] = userId
}

export default api