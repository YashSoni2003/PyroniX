import Navbar from "./Navbar.jsx"
import Contact from "./pages/contact.jsx"
import About from "./pages/abtus.jsx"
import Login from "./pages/login.jsx"
import Register from "./pages/register.jsx"
import Home from "./pages/Home.jsx"
import Compiler from "./pages/Compiler.jsx"

import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container bg-dark-clouds bg-cover bg-center min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/abtus" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Compiler" element={<Compiler />} />
        </Routes>
      </div>
    </>
  )
}

export default App
