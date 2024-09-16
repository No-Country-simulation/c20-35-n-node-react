import { Routes, Route } from "react-router-dom"
import Chat from "../pages/Chat"
import Nutrition from "../pages/Nutrition"
import Profile from "../pages/Profile"
import Workouts from "../pages/Workouts"
import Home from "../pages/Home"

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="nutricion" element={<Nutrition />} />
      <Route path="entrenamiento" element={<Workouts />} />
      <Route path="chat-nutricion" element={<Chat />} />
      <Route path="chat-entrenamiento" element={<Chat />} />
      <Route path="perfil" element={<Profile />} />
    </Routes>
  )
}

export default DashboardRoutes

