import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { RoleCheck } from './pages/RoleCheck'
import { UpdateUser } from './pages/UpdateUser'
import { Homepage } from './pages/dashboard/Index'
import { Error } from './pages/Error'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GrupAdmin from './pages/dashboard/Grup/Index'
import Content from './pages/content/Index'
import FeedbackAdmin from './pages/dashboard/Feedback/Index'
import MateriAdmin from './pages/dashboard/Materi/Index.jsx'
import TestAdmin from './pages/dashboard/Test/Index'
import CreateGrup from './pages/dashboard/Grup/CreateGrup'
import EditGrup from './pages/dashboard/Grup/EditGrup'
import GrupContent from './components/GrupContent'
import MateriContent from './components/MateriContent'
import TestContent from './components/TestContent'
import FeedbackContent from './components/FeedbackContent'


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
        <Route path='grup' element={<GrupAdmin/>}/>
        <Route path='grup/create/' element={<CreateGrup/>}/>
        <Route path='grup/edit/:id' element={<EditGrup/>}/>
        <Route path='materi' element={<MateriAdmin/>}/>
        <Route path='test' element={<TestAdmin/>}/>
        <Route path='feedback' element={<FeedbackAdmin/>}/>
      </Route>
      <Route path='content' element={<Content />} >
        <Route path='grup' element={<GrupContent/>}/>
        <Route path='materi' element={<MateriContent/>}/>
        <Route path='test' element={<TestContent/>}/>
        <Route path='feedback' element={<FeedbackContent/>}/>
      </Route>
      

    </Routes>

  )
}

export default App
