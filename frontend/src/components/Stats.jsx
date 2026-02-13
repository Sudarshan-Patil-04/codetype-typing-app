const Stats = ({ timeLeft, wpm, accuracy }) => {
  return (
    <div className="flex gap-8 mb-6 text-lg">
      <div>⏱️ {timeLeft}s</div>
      <div>⚡ {wpm} WPM</div>
      <div>🎯 {accuracy}%</div>
    </div>
  )
}

export default Stats
