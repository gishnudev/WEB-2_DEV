import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import AddCourse from './pages/AddCourse'
import UpdateCourse from './pages/UpdateCourse'
import Contact from './pages/Contact'
import { Courses } from './pages/Courses'
import CoursePage from './pages/CoursePage'
import Notfound from './pages/Notfound'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/'element={<Home/>}></Route>
        <Route path='/addCourse' element={<AddCourse/>}></Route>
        <Route path='/updateCourse' element={<UpdateCourse/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/courses' element={<Courses/>}></Route>
        <Route path='/CoursePage/:id' element={<CoursePage/>}></Route>
        <Route path='*' element={<Notfound/>}></Route>
      </Routes>
    </Router>
  )
}

export default App 