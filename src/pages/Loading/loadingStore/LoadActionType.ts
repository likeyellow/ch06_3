import type {Action} from 'redux'

export type LoadingState = {
  isLoading: boolean
  tip?: string
}

// 1. 액션타입 작성 - LoadAction.ts 에서 옛날 타입 액션을 생성할 때 필요
export type SetLoading = Action<'@loadingStore/SET_LOADING'> & {
  payload: LoadingState
}

export type UnsetLoading = Action<'@loadingStore/UNSET_LOADING'> & {}

// 모든 액션 객체들에 대한 타입 준비
export type LoadingAction = SetLoading | UnsetLoading
