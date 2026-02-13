import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-6">CodeType 🚀</h1>

      <Link
        to="/practice"
        className="bg-white text-black px-6 py-3 rounded text-lg"
      >
        Start Typing
      </Link>
    </div>
  )
}

export default Home
