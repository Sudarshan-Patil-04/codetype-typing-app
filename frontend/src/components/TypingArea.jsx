import { useState } from "react"

const TypingArea = ({ text, onStatsUpdate, startTimer, resetTest }) => {
  const [input, setInput] = useState("")
  const [started, setStarted] = useState(false)

  const handleChange = (e) => {
    if (!started) {
      startTimer()
      setStarted(true)
    }

    const value = e.target.value
    setInput(value)

    let correct = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] === text[i]) correct++
    }

    onStatsUpdate({
      correctChars: correct,
      totalChars: value.length
    })
  }

  const renderText = () => {
    return text.split("").map((char, index) => {
      let color = "text-gray-600"

      if (index < input.length) {
        color =
          input[index] === char
            ? "text-green-400"
            : "text-red-500"
      }

      return (
        <span key={index} className={color}>
          {char}
        </span>
      )
    })
  }

  return (
    <div className="space-y-6">

      <div className="bg-gray-950 p-6 rounded-xl font-mono whitespace-pre-wrap text-lg leading-relaxed border border-gray-800 min-h-[150px]">
        {renderText()}
      </div>

      <textarea
        className="w-full h-40 p-4 bg-black border border-gray-700 rounded-xl text-white font-mono resize-none focus:outline-none focus:ring-2 focus:ring-white transition"
        value={input}
        onChange={handleChange}
        placeholder="Start typing here..."
        autoFocus
      />

      <div className="flex justify-end">
        <button
          onClick={resetTest}
          className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition"
        >
          Restart
        </button>
      </div>

    </div>
  )
}

export default TypingArea
