import { useState, useEffect } from "react"
import TypingArea from "../components/TypingArea"
import LanguageSelector from "../components/LanguageSelector"
import DurationSelector from "../components/DurationSelector"
import Stats from "../components/Stats"
import WPMGraph from "../components/WPMGraph"

import { useTimer } from "../hooks/useTimer"
import { calculateWPM, calculateAccuracy } from "../utils/stats"

import { pythonSnippets } from "../data/python"
import { javaSnippets } from "../data/java"
import { cSnippets } from "../data/c"
import { dsaJavaSnippets } from "../data/dsaJava"

const Practice = () => {
  const [lang, setLang] = useState("python")
  const [duration, setDuration] = useState(60)
  const [stats, setStats] = useState({ correctChars: 0, totalChars: 0 })
  const [wpmHistory, setWpmHistory] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [currentSnippet, setCurrentSnippet] = useState(null)

  const { timeLeft, start, reset } = useTimer(duration)

  const snippets = {
    python: pythonSnippets,
    java: javaSnippets,
    c: cSnippets,
    dsa: dsaJavaSnippets
  }

  // 🔥 Generate random snippet
  const generateRandomSnippet = () => {
    const langSnippets = snippets[lang]
    if (!langSnippets?.length) return

    const random =
      langSnippets[Math.floor(Math.random() * langSnippets.length)]

    setCurrentSnippet(random)
  }

  // 🔥 Change snippet when language changes
  useEffect(() => {
    generateRandomSnippet()
  }, [lang])

  const text = currentSnippet?.code || ""

  const timeSpent = duration - timeLeft
  const wpm = calculateWPM(stats.correctChars, timeSpent)
  const accuracy = calculateAccuracy(stats.correctChars, stats.totalChars)

  // 🔥 Track WPM history
  useEffect(() => {
    if (timeSpent > 0) {
      setWpmHistory(prev => [...prev, wpm])
    }
  }, [timeLeft])

  // 🔥 Save result when test finishes
  useEffect(() => {
    if (timeLeft === 0 && wpm > 0) {
      handleFinish()
    }
  }, [timeLeft])

  const handleFinish = async () => {
    const saved = await saveResult()
    if (saved) {
      fetchLeaderboard()
    }
  }

  const resetTest = (newDuration = duration) => {
    reset(newDuration)
    setStats({ correctChars: 0, totalChars: 0 })
    setWpmHistory([])
    generateRandomSnippet()
  }

  const saveResult = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:5000/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          language: lang,
          wpm,
          accuracy
        })
      })

      if (!res.ok) throw new Error("Failed to save result")

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/results/leaderboard/${lang}`
      )

      if (!res.ok) throw new Error("Failed to fetch leaderboard")

      const data = await res.json()
      setLeaderboard(data)
    } catch (error) {
      console.error("Leaderboard error:", error)
    }
  }

  // 🔥 Fetch leaderboard on language change
  useEffect(() => {
    fetchLeaderboard()
  }, [lang])

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-6 py-10">
      <div className="w-full max-w-7xl flex gap-8">

        {/* LEFT SIDE */}
        <div className="flex-1 bg-gray-900 rounded-2xl p-8 border border-gray-700">

          <h1 className="text-3xl font-bold mb-6">
            CodeType
          </h1>

          <Stats timeLeft={timeLeft} wpm={wpm} accuracy={accuracy} />

          <div className="flex gap-4 my-6">
            <LanguageSelector
              currentLang={lang}
              setLang={(l) => {
                setLang(l)
                resetTest()
              }}
            />

            <DurationSelector
              duration={duration}
              setDuration={(d) => {
                setDuration(d)
                resetTest(d)
              }}
            />
          </div>

          {/* Question Card */}
          {currentSnippet && (
            <div className="mb-4 p-4 bg-gray-800 rounded-lg">
              <h2 className="text-sm text-gray-400 uppercase mb-2">
                Question
              </h2>
              <p>{currentSnippet.question}</p>
            </div>
          )}

          {/* Next Question Button */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={generateRandomSnippet}
              className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 hover:bg-gray-700 transition"
            >
              Next Question
            </button>
          </div>

          {/* Typing Section */}
          {timeLeft > 0 ? (
            <TypingArea
              text={text}
              onStatsUpdate={setStats}
              startTimer={start}
              resetTest={resetTest}
            />
          ) : (
            <div className="text-center py-10">
              <h2 className="text-xl mb-4 font-semibold">Test Finished</h2>
              <p>WPM: {wpm}</p>
              <p>Accuracy: {accuracy}%</p>

              <button
                onClick={resetTest}
                className="mt-6 px-6 py-2 bg-white text-black rounded-lg"
              >
                Restart
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-80 hidden lg:flex flex-col gap-6">

          {/* WPM Graph */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xs mb-4 text-gray-400 uppercase">
              Live WPM
            </h2>

            <WPMGraph wpmHistory={wpmHistory} small />

            <div className="mt-4 text-sm text-gray-400">
              <p>Current: {wpm}</p>
              <p>Best: {Math.max(...wpmHistory, 0)}</p>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xs mb-4 text-gray-400 uppercase">
              Leaderboard ({lang})
            </h2>

            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <div
                  key={player._id}
                  className="flex justify-between px-3 py-2 rounded-lg bg-gray-800"
                >
                  <span>
                    {index === 0 && "🥇 "}
                    {index === 1 && "🥈 "}
                    {index === 2 && "🥉 "}
                    {index > 2 && `${index + 1}. `}
                    {player.user?.username || "Unknown"}
                  </span>
                  <span>{player.wpm}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Practice
