import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { RoleCheck } from './pages/RoleCheck'
import { UpdateUser } from './pages/UpdateUser'
import { Homepage } from './pages/dashboard/Index'
import { Error } from './pages/Error'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CourseAdmin from './pages/dashboard/Grup/Index'
import Content from './pages/content/Index'
import FeedbackAdmin from './pages/dashboard/Feedback/Index'
import MateriAdmin from './pages/dashboard/Materi/Index.jsx'
import EditMateriAdmin from "./pages/dashboard/Materi/EditLesson.jsx";
import TestAdmin from './pages/dashboard/Test/Index'
import CreateCourse from './pages/dashboard/Grup/CreateCourse'
import EditCourse from './pages/dashboard/Grup/EditCourse'
import GrupContent from './components/content/GrupContent'
import MateriContent from './components/content/MateriContent'
import TestContent from './components/content/TestContent'
import FeedbackContent from './components/content/FeedbackContent'
import CreateLesson from './pages/dashboard/Materi/CreateLesson'
import CreateTest from './pages/dashboard/Test/CreateTest'
import EditTest from './pages/dashboard/Test/EditTest'
import SoalTest from './pages/dashboard/Test/Soal/Index'
import { DetailMateri } from './pages/dashboard/Grup/Detail/Materi/Index'
import DetailMateriContent from './components/content/DetailMateriContent'
import DetailTestContent from './components/content/DetailTestContent'
import CreateAssignment from "./pages/dashboard/Assignment/CreateAssignment";
import EditAssignment from "./pages/dashboard/Assignment/EditAssignment";
import { Assigment } from './components/content/Assignment'
import { LoginStaf } from "./pages/LoginStaf";
import { DetailCourse } from "./pages/dashboard/Grup/Detail/Index";
import { Lessons } from "./components/content/Lessons";
import { DetailAssignment } from './pages/dashboard/Grup/Detail/Tugas/Index'
import DetailTest from './pages/dashboard/Grup/Detail/Test/Index'
import { AdminDashboard } from './pages/adminDashboard'
import { User } from './pages/adminDashboard/User/Index'
import { Matkul } from './pages/adminDashboard/Matkul/Index'
import { CreateUser } from './pages/adminDashboard/User/CreateUser'
import { EditUser } from './pages/adminDashboard/User/EditUser'

function App() {

  return (
    <Routes>
      <Route path='*' element={<Error />} />
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/login-staf' element={<LoginStaf />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/rolecheck' element={<RoleCheck />} />
      <Route path='/update-user' element={<UpdateUser />} />
      <Route path='dashboard' element={<Homepage />} >
        <Route path='matkul' element={<CourseAdmin/>}/>
        <Route path='matkul/create/' element={<CreateCourse/>}/>
        <Route path='matkul/edit/:id' element={<EditCourse/>}/>
        <Route path='matkul/detail/:id' element={<DetailCourse/>}/>
        <Route path='materi' element={<MateriAdmin/>}/>
        <Route path='materi/create/:id' element={<CreateLesson/>}/>
        <Route path='materi/detail/:id' element={<DetailMateri/>}/>
        <Route path='materi/edit/:id' element={<EditMateriAdmin/>}/>
        <Route path='test' element={<TestAdmin/>}/>
        <Route path='test/create/:id' element={<CreateTest/>}/>
        <Route path='test/detail/:id' element={<DetailTest/>}/>
        <Route path='test/edit/:id' element={<EditTest/>}/>
        <Route path='assignment/create/:id' element={<CreateAssignment/>}/>
        <Route path='assignment/edit/:id' element={<EditAssignment/>}/>
        <Route path='assignment/detail/:id' element={<DetailAssignment/>}/>
      </Route>
      <Route path='admin' element={<AdminDashboard/>}>
        <Route path='user' element={<User/>}/>
        <Route path='user/create' element={<CreateUser/>}/>
        <Route path='user/edit/:id' element={<EditUser/>}/>
        <Route path='matkul' element={<Matkul/>}/>
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
      <Route path='test/assignment/:id' element={<Assigment/>}/>

      
    </Routes>

  )
}

export default App
