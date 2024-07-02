import type * as LD from './LoadActionType'
import {createAction} from '@reduxjs/toolkit'

// 0. 액션 생성함수는 주로 camelCase 로 작성합니다.
// 1. 액션 생성 함수(리덕스 툴킷을 사용하지 않는 옛날 방식으로 작성함)
export const SET_LOADING = (payload: LD.LoadingState): LD.SetLoading => ({
  type: '@loadingStore/SET_LOADING',
  payload,
})

export const UNSET_LOADING = (): LD.UnsetLoading => ({
  type: '@loadingStore/UNSET_LOADING',
})

// 2. 액션 생성 함수(리덕스 툴킷을 사용한 방식으로 작성함-더 간단히 작성함)
export const LoadActionCreator = {
  setLoading: createAction<{LoadingState: boolean}>('setLoading'),
  unsetLoading: createAction<{}>('unsetLoading'),
}
