const BASE_URL = "http://localhost:5000/api"

export const apiRequest = async (endpoint, method = "GET", body) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : null
  })

  return res.json()
}
