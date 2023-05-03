import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { RoleCheck } from './pages/RoleCheck'
import { UpdateUser } from './pages/UpdateUser'
import { Homepage } from './pages/dashboard/Index'
import { Error } from './pages/Error'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Grup from './pages/dashboard/Grup/Index'
import Feedback from './pages/dashboard/Feedback/Index'
import Materi from './pages/dashboard/Materi/Index.jsx'
import Test from './pages/dashboard/Test/Index'
import CreateGrup from './pages/dashboard/Grup/CreateGrup'

function App() {

  return (
    <Routes>
      <Route path='*' element={<Error />} />
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/rolecheck' element={<RoleCheck />} />
      <Route path='/update-user' element={<UpdateUser />} />
      <Route path='dashboard' element={<Homepage />} >
        <Route path='grup' element={<Grup/>}>
          <Route path='create' element={<CreateGrup/>}/>
        </Route>
        <Route path='materi' element={<Materi/>}/>
        <Route path='test' element={<Test/>}/>
        <Route path='feedback' element={<Feedback/>}/>
      </Route>

    </Routes>

  )
}

export default App
