import { useEffect, useState } from "react"

export const useTimer = (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft(t => t - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const start = () => setIsRunning(true)

  const reset = (newTime) => {
  setIsRunning(false)
  setTimeLeft(
    typeof newTime === "number" ? newTime : initialTime
  )
}


  return { timeLeft, isRunning, start, reset }
}
