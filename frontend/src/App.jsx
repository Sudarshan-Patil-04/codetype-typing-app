import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Practice from "./pages/Practice"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/practice"
        element={
          <PrivateRoute>
            <Practice />
          </PrivateRoute>
        }
      />

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/practice" replace />} />

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/practice" replace />} />
    </Routes>
  )
}

export default App
