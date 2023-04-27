import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { RoleCheck } from './pages/RoleCheck'
import { UpdateUser } from './pages/UpdateUser'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/rolecheck' element={<RoleCheck/>}/>
      <Route path='/update-user' element={<UpdateUser/>}/>
    </Routes>
  )
}

export default App
