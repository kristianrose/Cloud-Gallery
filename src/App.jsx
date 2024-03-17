import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>}  />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App