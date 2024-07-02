import type * as T from './TodoActionType'
import {createAction} from '@reduxjs/toolkit'

// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 'counter/INCREASE' 와 같이 실제 문자열 값으로 추론 되도록 해줍니다.
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있음.
//const ADD = 'TodoItemContext/ADD' as const
//const EDIT = 'TodoItemContext/EDIT' as const
//const TOGGLE = 'TodoItemContext/TOGGLE' as const
//const DELETE = 'TodoItemContext/DELETE' as const

// 새로운 항목을 추가 할 때 사용 할 고유 ID 값
let nextId = 1

// 0. 액션 생성함수는 주로 camelCase 로 작성합니다.
// 1. 액션 생성 함수(리덕스 툴킷을 사용하지 않는 옛날 방식으로 작성함)
export const onAdd = (payload: T.TodoItem): T.SetOnAdd => ({
  type: '@todoStore/onAdd', // type은 필수, action type(=리덕스 액션에 들어갈 type)을 설정해 줌
  payload, // action 함수의 파라미터
})
export const onUpdate = (payload: T.TodoItem): T.SetOnUpdate => ({
  type: '@todoStore/onUpdate',
  payload,
})
export const onToggle = (payload: number): T.SetOnToggle => ({
  type: '@todoStore/onToggle',
  payload,
})

export const onDelete = (payload: number): T.SetOnDelete => ({
  type: '@todoStore/onDelete',
  payload,
})

// 2. 액션 생성 함수(리덕스 툴킷을 사용한 방식으로 작성함-더 간단히 작성함)
export const TodoActionCreator = {
  addTodo: createAction<{title: string}>('addTodo'),
  updateTodo: createAction<{id: number; title: string; done: boolean}>('updateTodo'),
  toggleTodo: createAction<{id: number}>('toggleTodo'),
  deleteTodo: createAction<{id: number}>('deleteTodo'),
}
