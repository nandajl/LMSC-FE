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
import EditMateriAdmin from "./pages/dashboard/Materi/EditLesson.jsx";
import TestAdmin from './pages/dashboard/Test/Index'
import CreateGrup from './pages/dashboard/Grup/CreateGrup'
import EditGrup from './pages/dashboard/Grup/EditGrup'
import GrupContent from './components/content/GrupContent'
import MateriContent from './components/content/MateriContent'
import TestContent from './components/content/TestContent'
import FeedbackContent from './components/content/FeedbackContent'
import CreateLesson from './pages/dashboard/Materi/CreateLesson'
import CreateTest from './pages/dashboard/Test/CreateTest'
import EditTest from './pages/dashboard/Test/EditTest'
import SoalTest from './pages/dashboard/Test/Soal/Index'
import DetailMateriContent from './components/content/DetailMateriContent'
import DetailTestContent from './components/content/DetailTestContent'

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
        <Route path='materi/create/' element={<CreateLesson/>}/>
        <Route path='materi/edit/:id' element={<EditMateriAdmin/>}/>
        <Route path='test' element={<TestAdmin/>}/>
        <Route path='test/create' element={<CreateTest/>}/>
        <Route path='test/edit/:id' element={<EditTest/>}/>
        <Route path='test/detail/:id' element={<SoalTest/>}/>
        <Route path='feedback' element={<FeedbackAdmin/>}/>
      </Route>
      <Route path='content' element={<Content />} >
        <Route path='grup' element={<GrupContent/>}/>
        <Route path='materi' element={<MateriContent/>}/>
        <Route path='materi/detail/:id' element={<DetailMateriContent/>}/>
        <Route path='test' element={<TestContent/>}/>
        <Route path='test/detail/:id' element={<DetailTestContent/>}/>
        <Route path='feedback' element={<FeedbackContent/>}/>
      </Route>
      

    </Routes>

  )
}

export default App
