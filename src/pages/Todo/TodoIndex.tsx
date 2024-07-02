import React, {useState, useEffect, useCallback} from 'react'
import {Container, List, Paper} from '@mui/material'
import {get, post, del, put} from '../../server'
import {useDispatch, useSelector} from 'react-redux'
import TodoContainer from './TodoContainer'
import {Outlet} from 'react-router-dom'

export default function TodoIndex() {
  const [data, setData] = useState<object>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(1)

  // useDispatch hook을 사용하여 dispatch 변수에 담는다
  const dispatch = useDispatch()
  //const loading2 = useSelector<AppState, T.State>(({loading}) => loading)
  /*
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }
    setLoading(false)

    fetch('http://localhost:8080/todo', requestOptions)
      .then(response => response.json())
      .then(response => setItems(response.data))
      .catch(error => setErrorMessage(error.message))
  }, [])
  console.log(items)

  useEffect(() => {
    call('/todo', 'GET', null).then(response => {
      setItems(response)
      console.log('안 타나' + response)
      setLoading(false)
    })
  }, [])
  */

  /*
  if (loading) {
    return <div>Loading</div>
  }

  const addItem = (newTodo: Omit<TodoProps, 'id' | 'done'>) => {
    const id = 'ID-' + items.length // key를 위한 id
    const done = false // done 초기화
    // 업데이트는 반드시 setItems로 하고 새 배열을 만들어야 한다.
    setItems([...items, {...newTodo, id, done}])
  }
  const deleteItem = (deleteTodo: Pick<TodoProps, 'id'>) => {
    // 삭제할 아이템을 찾는다
    const newItems = items.filter(item => item.id !== deleteTodo.id)
    // 삭제할 아이템을 제외한 아이템을 다시 배열에 저장한다
    setItems([...newItems])
    console.log('delete : ', deleteTodo.id)
  }


  */

  /*
  // 실행되어지면 매개변수 title을 받아 새로운 객체를 생성하여 onAdd 액션을
  // 디스패치 해주는 함수
  const handlerAddItem = useCallback(
    (title: string) => {
      dispatch(onAdd({id: id, title: title, done: false}))
      setId(id + 1)
    },
    [dispatch, id]
  )
  
  return (
    <Container maxWidth="md">
      <AddTodo addItem={handlerAddItem} />
      <TodoListForm />
    </Container>
  ) 
  */
  return (
    <Container maxWidth="md">
      <Outlet />
    </Container>
  )
}
