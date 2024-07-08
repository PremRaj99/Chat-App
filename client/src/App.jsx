import React from 'react'
import Home from './pages/Home'
import { Route, Routes, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PrivateRoute from "./components/PrivateRoute";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}