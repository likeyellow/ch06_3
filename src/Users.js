import React, {useState} from 'react'
import axios from 'axios'
//import useAsync from './useAsync'
//import {useAsync} from 'react-async'
import {useUsersState, useUsersDispatch, getUsers} from './UsersContext'
import User from './User'

// useAsync에서는 Promise의 결과를 바로 data에 담기 때문에,
// 요청을 한 이후 response에서 data를 추출하여 반환하는 함수를 따로 만들었습니다.
/*
async function getUsers() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  return response.data
}
*/

function Users() {
  const [userId, setUserId] = useState(null)
  const state = useUsersState()
  const dispatch = useUsersDispatch()

  const {data: users, loading, error} = state.users
  const fetchData = () => {
    getUsers(dispatch)
  }

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>에러가 발생했습니다.</div>
  if (!users) return <button onClick={fetchData}>불러오기</button>

  return (
    <>
      <ul>
        {users.map(user => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{cursor: 'pointer'}}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  )
}
// useUsersState()와 useUsersDispatch()를 사용해서 state와 dispatch를 가져오고, 요청을 시작할 때에는
// getUsers()함수 안에 dispatch를 넣어서 호출을 해줌
export default Users
