import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect, useRef, useState, useCallback} from 'react'
import type {TodoItem} from './todoStore/TodoActionType'
import {useNavigate, useParams} from 'react-router-dom'
import {getList} from '../../server/todoApi'
import Loading from '../Loading/Loading'
import type {FC, ChangeEvent, KeyboardEvent} from 'react'
import {
  Container,
  List,
  Paper,
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import {onAdd, onUpdate, onToggle, onDelete} from './todoStore/TodoAction'
import useCustomMove from './hooks/useCustomMove'
import {getOne} from '../../server/todoApi'
import {EditOutlined} from '@mui/icons-material'
import type * as T from './todoStore/TodoActionType'
import {Pagination} from '../../components'

/*
const TodoListForm = () => {
  const todos = useSelector<AppState, T.TodoItem[]>(state => state.todoItemReducer.todos)
  console.log(todos)

  const [data, setData] = useState<object>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get('/todo')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setErrorMessage(error.message))
  }, [])

  //if (todos.length === 0) return <p>등록된 항목이 없습니다.</p>

  let todoItems = todos.length > 0 && (
    <Paper style={{margin: 16}}>
      <List>
        {todos.map(todo => (
          <Todo key={todo.id} id={todo.id} title={todo.title} done={todo.done} />
        ))}
      </List>
    </Paper>
  )

  return <div>{todoItems}</div>
}
*/
type PageProps = {
  todoItem: TodoItem[]
  pageNumList: string[]
  pageRequestDTO: null
  prev: boolean
  next: boolean
  totalCount: string
  prevPage: string
  nextPage: string
  totalPage: string
  current: string
}

const initState: PageProps = {
  todoItem: [],
  pageNumList: ['0'],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: '0',
  prevPage: '0',
  nextPage: '0',
  totalPage: '0',
  current: '0',
}

type TodoParam = {id?: string}

const TodoListForm: React.FC = React.memo(() => {
  let {id} = useParams<TodoParam>()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 이동과 관련된 기능은 모두 useCustomeMove()로
  const {page, size, refresh, moveToList} = useCustomMove()
  console.log('moveToList:', moveToList)
  const [todoList, setTodoList] = useState<TodoItem[]>([])
  const [serverData, setServerData] = useState<PageProps>(initState)
  const [loading, setLoading] = useState(false)

  //const [todoOne, setTodoOne] = useState(todoItem)

  useEffect(() => {
    getList({page, size}).then(data => {
      setLoading(true)
      setServerData(data)
      console.log('dddd', data)
      setLoading(false)
    })
  }, [page, size, refresh])

  const [readOnly, setReadOnly] = useState(true)
  //const [updateTitle, setUpdateTitle] = useState(initState)

  //const [todo, setTodo] = useState(initState)

  //deleteEventHandler 작성
  const deleteEventHandler = () => {
    //onDeleteItem()
    //dispatch(onDelete(todo.tno))
  }

  // turnOffReadOnly 함수 작성: title 클릭 시 setReadOnly가 false로 바뀌면
  // 수정 가능한 상태로 변경
  const turnOffReadOnly = () => {
    setReadOnly(false)
  }

  // turnOnReadOnly 함수 작성: 엔터키를 누르면 readOnly 모드를 종료
  const turnOnReadOnly = (e: KeyboardEvent<HTMLInputElement>) => {
    //if (e.key === 'Enter' && readOnly === false) {
    //setReadOnly(true)
    //} else if (todo.title.trim() === '') {
    //alert('반드시 할 일을 입력해야 합니다.')
    //return
    //}
  }
  /*
  let {id} = useParams<TodoParam>()
  let EditTodo = todoItem
  if (!EditTodo) {
    navigate('/todo')
    return <></>
  }
  const [todoOne, setTodoOne] = useState<TodoItem>({...EditTodo})
*/

  //const editItem = TodoProps.onEditItem
  const editEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //title = e.target.value
    //editItem()
    //setItem({...item, titme: e.target.value})
    //onEditItem(todoList.id)

    //let {tno, title, done} = todo
    //updateTodo(tno, title, done)
    navigate('/todo')
  }

  // 체크박스에 체크가 된 경우 true를, 아닌 경우에 false를 저장
  const checkboxEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const done = e.target.checked
    //dispatch(onToggle(todo.tno))
  }

  return (
    <div>
      <div>
        <Paper style={{margin: 16}}>
          {serverData?.todoItem?.map(todo => (
            <List key={todo.id}>
              <ListItem>
                <Checkbox checked={todo.done} onChange={checkboxEventHandler} />
                <ListItemText>
                  <InputBase
                    inputProps={{'aria-label': 'naked', readOnly: readOnly}}
                    onClick={turnOffReadOnly}
                    onKeyDown={turnOnReadOnly}
                    onChange={editEventHandler}
                    type="text"
                    //id={todoList.id}
                    //name={todoList.id}
                    value={todo.title}
                    multiline={true}
                    fullWidth={true}
                  />
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton aria-label="Edit Todo" onClick={deleteEventHandler}>
                    <EditOutlined />
                  </IconButton>
                  <IconButton aria-label="Delete Todo" onClick={deleteEventHandler}>
                    <DeleteOutlined />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          ))}
        </Paper>
      </div>
      <>
        {console.log('serverData', serverData)}
        {serverData && serverData.todoItem && serverData.todoItem.length > 0 && (
          <Pagination serverData={serverData} movePage={moveToList} />
        )}
      </>
    </div>
  )
})

export default TodoListForm
