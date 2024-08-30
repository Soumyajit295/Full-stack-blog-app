import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import Profile from './pages/Profile'
import Blogspage from './pages/Blogspage'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CreateBlog from './pages/CreateBlog'
import ForgotPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import SingleBlogPage from './pages/SingleBlogPage'
import EditBlogPage from './pages/EditBlogPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Landingpage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forget-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:_id/:newJwt' element={<ResetPassword/>}/>
          <Route path='/create-blog' element={<CreateBlog/>}/>
          <Route path='/blogs' element={<Blogspage/>}/>
          <Route path='/blog/:blogId' element={<SingleBlogPage/>}/>
          <Route path='/blog/edit/:blogId' element={<EditBlogPage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
