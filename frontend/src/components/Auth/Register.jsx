import { useState } from "react"
import { registerUser } from "../../services/auth.api"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async () => {
    const res = await registerUser({ email, password })
    console.log(res)
  }

  return (
    <div className="p-6 space-y-3">
      <input
        className="border p-2"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 py-2"
        onClick={submitHandler}
      >
        Register
      </button>
    </div>
  )
}

export default Register
