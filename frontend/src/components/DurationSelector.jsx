const durations = [15, 30, 60]

const DurationSelector = ({ duration, setDuration }) => {
  return (
    <div className="flex gap-3 mb-6">
      {durations.map(d => (
        <button
          key={d}
          onClick={() => setDuration(d)}
          className={`px-4 py-2 rounded 
            ${duration === d 
              ? "bg-blue-600" 
              : "bg-gray-800 hover:bg-gray-700"}`}
        >
          {d}s
        </button>
      ))}
    </div>
  )
}

export default DurationSelector
