import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Auth from "./pages/Auth"
import Feed from "./pages/Feed"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"

function App() {
  const navigate= useNavigate();
useEffect(() => {
  // aktif oturumdaki değişikliği izlemek
  onAuthStateChanged(auth, (user) => {
    if(user) {
      navigate('/feed')
      // kapalıysa giriş sayfasınfa kalması için
    }else{
      navigate('/')
    }
  })
}, [])
  return (

  <Routes>
    <Route path="/" element={<Auth/>}/>
    <Route path="/feed" element={<Feed/>}/>
  </Routes>

  )
}

export default App
