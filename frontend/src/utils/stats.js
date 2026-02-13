export const calculateWPM = (correctChars, timeInSeconds) => {
  const minutes = timeInSeconds / 60
  return minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0
}

export const calculateAccuracy = (correctChars, totalChars) => {
  return totalChars > 0
    ? Math.round((correctChars / totalChars) * 100)
    : 0
}
