import type {Action} from 'redux'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

// 상태에서 사용 할 할 일 항목 데이터 타입 정의
export type TodoItem = {
  id: number
  title: string
  done: boolean
}

// 1. 액션타입 작성 - TodoAction.ts 에서 옛날 타입 액션을 생성할 때 필요
export type SetOnAdd = Action<'@todoStore/onAdd'> & {
  payload: TodoItem
}

export type SetOnUpdate = Action<'@todoStore/onUpdate'> & {
  payload: TodoItem
}

export type SetOnToggle = Action<'@todoStore/onToggle'> & {
  payload: number
}

export type SetOnDelete = Action<'@todoStore/onDelete'> & {
  payload: number
}

// 모든 액션 객체들에 대한 타입 준비
export type TodoAction = SetOnAdd | SetOnUpdate | SetOnToggle | SetOnDelete
