import {Link as RRLink} from 'react-router-dom'
import {Link} from '../../components'
import {useAuth} from '../../contexts'

export default function NavagationBar() {
  const {loggedUser} = useAuth()

  return (
    <div className="flex justify-between bg-base-100">
      <div className="flex p-4 navbar bg-base-200">
        <Link to="/" className="btn btn-link">
          Home
        </Link>

        <Link to="/board" className="ml-4 btn btn-link">
          Board
        </Link>

        {loggedUser && (
          <Link to="/todo/list" className="ml-4 btn btn-link">
            오늘의 할일
          </Link>
        )}
      </div>
      <div className="flex items-center p-2 bg-base-200">
        {!loggedUser && (
          <RRLink to="/login" className="btn btn-sm btn-primary">
            Login
          </RRLink>
        )}
        {!loggedUser && (
          <RRLink to="/signup" className="ml-4 btn btn-sm btn-outline btn-primary">
            Signup
          </RRLink>
        )}
        {loggedUser && (
          <RRLink to="/logout" className="ml-4 mr-4 btn btn-sm btn-outline">
            LOGOUT
          </RRLink>
        )}
      </div>
    </div>
  )
}
