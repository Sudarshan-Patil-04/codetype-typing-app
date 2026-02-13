import { apiRequest } from "./api"

export const registerUser = (data) => {
  return apiRequest("/auth/register", "POST", data)
}
