import React, {useCallback, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {TodoActionCreator, TodoItem as T} from './todoStore'
import {rootReducer} from '../../store/rootReducer'
import TodoListForm from './TodoListForm'
import AddTodo from './AddTodo'
import {
  createSearchParams,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

function TodoContainer() {
  // useSelector 에서 꼭 객체를 반환 할 필요는 없습니다.
  // 한 종류의 값만 조회하고 싶으면 그냥 원하는 값만 바로 반환하면 됩니다.
  const todoList = useSelector((state: rootReducer) => state.todo.todos)
  const dispatch = useDispatch()

  const onAdd = (title: string) => dispatch(TodoActionCreator.addTodo({title}))
  const onUpdate = (id: number, title: string, done: boolean) =>
    dispatch(TodoActionCreator.updateTodo({id, title, done}))
  const onDelete = (id: number) => dispatch(TodoActionCreator.deleteTodo({id}))
  const onToggle = (id: number) => dispatch(TodoActionCreator.toggleTodo({id}))

  const {tno} = useParams<{tno: string}>()

  const [queryParams] = useSearchParams()
  const navigate = useNavigate()

  const page = queryParams.get('page') || '1'
  const size = queryParams.get('size') || '10'

  const queryStr = createSearchParams({page, size}).toString()

  const moveToModify = useCallback(
    (tno: string) => {
      navigate({
        pathname: `/todo/modify/${tno}`,
        search: queryStr,
      })
    },
    [tno, page, size]
  )

  const moveToRead = () => {
    navigate({pathname: `/todo/read/${tno}`})
  }

  return (
    <>
      <AddTodo />
      <TodoListForm />
    </>
  )
}
export default TodoContainer
