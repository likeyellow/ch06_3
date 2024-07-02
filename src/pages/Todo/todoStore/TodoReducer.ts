import axios from 'axios'
import {createAsyncThunk, createSlice, createReducer} from '@reduxjs/toolkit'
import type * as T from './TodoActionType'
import {API_BASE_URL} from '../../../server'
import {TodoActionCreator} from './TodoAction'

// 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
export type InitStateType = {
  todos: T.TodoItem[]
}

// 0. 초기 상태 선언
const initState: InitStateType = {
  todos: [],
}

// 1. 리듀서 작성(리덕스 툴킷을 사용하지 않는 옛날 방식으로 작성함)
export const todoItemReducer = (state = initState, action: T.TodoAction) => {
  switch (action.type) {
    case '@todoStore/onAdd':
      /*
      return state.concat({
        // action.payload 객체 안의 값이 모두 유추됩니다.
        id: action.payload.id,
        title: action.payload.title,
        done: false, 
       )} 
      */
      return {
        todos: [...state.todos, action.payload],
      }

    case '@todoStore/onUpdate':
      //return state.map(todo => (todo.id === action.payload.id ? {...todo} : todo))
      return {
        todos: [
          ...state.todos.map(todo =>
            todo.id === action.payload.id
              ? {
                  ...todo,
                  title: action.payload.title,
                }
              : todo
          ),
        ],
      }
    case '@todoStore/onToggle':
      /*
      return state.map(todo =>
        todo.id === action.payload.id ? {...todo, done: !todo.done} : todo
      )
      */
      return {
        todos: [
          ...state.todos.map(todo =>
            todo.id === action.payload ? {...todo, done: !todo.done} : todo
          ),
        ],
      }
    case '@todoStore/onDelete':
      //return state.filter(todo => todo.id !== action.payload.id)
      return {
        todos: [...state.todos.filter(todo => todo.id !== action.payload)],
      }

    default:
      return state
  }
}

// 2. 액션 생성 함수(리덕스 툴킷을 사용한 방식으로 작성함-더 간단히 작성함)
export const TodoReducer = createReducer(initState, builder => {
  builder
    .addCase(TodoActionCreator.addTodo, (state, action) => {
      state.todos.push({
        id: new Date().getTime(),
        title: action.payload.title,
        done: false,
      })
    })
    .addCase(TodoActionCreator.updateTodo, (state, action) => {
      let index = state.todos.findIndex(item => item.id === action.payload.id)

      state.todos[index] = {...action.payload}
    })
    .addCase(TodoActionCreator.toggleTodo, (state, action) => {
      let index = state.todos.findIndex(item => item.id === action.payload.id)

      state.todos[index].done = !state.todos[index].done
    })
    .addCase(TodoActionCreator.deleteTodo, (state, action) => {
      let index = state.todos.findIndex(item => item.id === action.payload.id)

      state.todos.splice(index, 1)
    })
    .addDefaultCase((state, action) => state)
})

//
// Redux thunk(@reduxjs/toolkit)와 axios를 사용하여 외부 백엔드 API를 비동기로 호출하기
// 값 조회
/*
export const getList = createAsyncThunk('@todoStore/onAdd', async (arg, thunkAPI) => {
  try {
    // 무조건!
    const todoList = await axios.get(API_BASE_URL)
  } catch (err) {
    // 만약 오류나면
    return
  }
})
*/
