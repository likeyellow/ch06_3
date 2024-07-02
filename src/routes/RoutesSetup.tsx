import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import RequireAuth from './Auth/RequireAuth'
import LandingPage from './LandingPage'
import Board from '../pages/Board'
import Card from './Card'
import TodoIndex from '../pages/Todo/TodoIndex'
import TodoContainer from '../pages/Todo/TodoContainer'
import TodoRead from '../pages/Todo/TodoItem'

import Signup from './Auth/SignUp'
import SocialLogin from './Auth/SocialLogin'
import Login from './Auth/Login'
import Logout from './Auth/Logout'
import NoMatch from './NoMatch'
import Users from '../Users'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="users" element={<Users />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/card/:cardid" element={<Card />} />
        <Route path="/todo" element={<TodoIndex />}>
          <Route path="/todo/list" element={<TodoContainer />} />
          <Route path="/todo/read/:tno" element={<TodoRead />} />
          <Route path="/todo/add" element={<TodoContainer />} />
          <Route path="/todo/modify/:tno" element={<TodoContainer />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/sociallogin" element={<SocialLogin />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="logout"
        element={
          <RequireAuth>
            <Logout />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
