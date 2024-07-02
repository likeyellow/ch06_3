import React, {useCallback, useRef, useState, useEffect} from 'react'
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
  Typography,
  ListItemAvatar,
  Divider,
  TextField,
} from '@mui/material'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import type {TodoItem} from './todoStore/TodoActionType'
import {useDispatch, useSelector} from 'react-redux'
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import {onAdd, onUpdate, onToggle, onDelete} from './todoStore/TodoAction'
import useCustomMove from './hooks/useCustomMove'
import {getOne} from '../../server/todoApi'

const initState = {
  tno: 0,
  title: '',
  done: false,
}

const ReadTodo = () => {
  const {tno} = useParams()

  const [todo, setTodo] = useState(initState)

  useEffect(() => {
    getOne(tno).then(data => {
      setTodo(data)
    })
  }, [tno])

  const [queryParams] = useSearchParams()
  const navigate = useNavigate()

  const page = queryParams.get('page') || '1'
  const size = queryParams.get('size') || '10'

  const queryStr = createSearchParams({page, size}).toString()
  /*
  const moveToList = useCallback(() => {
    navigate({pathname: `/todo/list`, search: queryStr})
  }, [page, size])
*/

  const {moveToList, moveToModify} = useCustomMove()

  return (
    <Container maxWidth="md" style={{paddingTop: '16px'}}>
      <List sx={{width: '100%', maxWidth: 1360, bgcolor: 'background.paper'}}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>글번호</ListItemAvatar>
          <ListItemAvatar style={{paddingLeft: '26px'}}>{todo.tno}</ListItemAvatar>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>내용</ListItemAvatar>
          <div
            style={{
              width: '100%',
              height: '30rem',
              border: 'none',
              resize: 'none',
              paddingLeft: '26px',
            }}>
            {todo.title}
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>완료</ListItemAvatar>
          <ListItemAvatar style={{paddingLeft: '26px'}}>
            {todo.done ? 'Completed' : 'Not Yet'}
          </ListItemAvatar>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>

      <div>
        <button
          type="button"
          className="w-32 p-4 m-2 text-xl text-white bg-blue-500 rounded">
          목록으로
        </button>

        <button
          style={{paddingBottom: '16px'}}
          type="button"
          className="w-32 p-4 m-2 text-xl text-white bg-blue-500 rounded">
          수정하기
        </button>
      </div>
    </Container>
  )
}

export default ReadTodo
