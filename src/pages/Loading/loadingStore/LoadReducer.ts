import type * as LD from './LoadActionType'
import {createAsyncThunk, createSlice, createReducer} from '@reduxjs/toolkit'
import {LoadActionCreator} from './LoadAction'

// 0. 초기 상태 선언
const initialState = {
  isLoading: false,
}

// 1. 리듀서 작성(리덕스 툴킷을 사용하지 않는 옛날 방식으로 작성함)
export const loadingReducer = (state = initialState, action: LD.LoadingAction) => {
  switch (action.type) {
    case '@loadingStore/SET_LOADING':
      return {
        isLoading: true,
        tip: action.payload,
      }

    case '@loadingStore/UNSET_LOADING':
      return {
        isLoading: false,
      }

    default:
      return state
  }
}

// 2. 액션 생성 함수(리덕스 툴킷을 사용한 방식으로 작성함-더 간단히 작성함)
export const loadReducer = createReducer(initialState, builder => {
  builder
    .addCase(LoadActionCreator.setLoading, (state, action) => {
      state.isLoading = true
    })
    .addCase(LoadActionCreator.unsetLoading, (state, action) => {
      state.isLoading = false
    })
    .addDefaultCase((state, action) => state)
})
