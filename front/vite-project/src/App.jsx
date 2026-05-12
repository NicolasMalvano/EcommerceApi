import { useContext, useState, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import ErrorPage from './Components/ErrorPage/ErrorPage'
import Products from './views/Products/Products'
import Navbar from './Components/NavBar/NavBar'
import { UsersContext } from "./Context/UsersContext"

function App() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const {isLogged} = useContext(UsersContext)

  useEffect(() => {
  if(!isLogged && location.pathname !== "/login" && location.pathname !== "/register"){
    navigate("/login")
  }if(isLogged && (location.pathname === "/login" || location.pathname === "/register")){
    navigate("/home")
  }
  }, [isLogged, location.pathname, navigate])


  return (
    <>
      
      {!isLogged ? (
        <main>
          <Routes>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/register" element = {<Register/>}/>
          <Route path="*" element={<Navigate  to={"/login"}/>} />
        </Routes>
      </main>
      ):(
        <main>

        <Routes>

          <Route path="/navbar" element = {<Navbar/>}/>

          <Route path="/login" element = {<Login/>}/>

          <Route path="/home" element = {<Home/>}/>

          <Route path="/products" element = {<Products/>}/>
          
          <Route path="*" element={<Navigate to={"/404"}/>} />
          
          <Route path="/404" element={<ErrorPage/>} />
          
       </Routes>
      </main>
      )
    }
   
    </>
  )
}

export default App
