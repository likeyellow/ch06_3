import {configureStore} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {rootReducer} from './rootReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// 개발환경일 경우에만 로깅이 웹브라우저 콘솔에 로그가 기록되도록 함
// node.js 환경에서 process.env.NODE_ENV속성이 'production'으로 설정되었는지로 판단
const useLogger = process.env.NODE_ENV !== 'production'

const initializeStore = () => {
  const middleware: any[] = [thunk]

  // logger 를 사용하는 경우, logger가 가장 마지막에 와야함
  // 여러개의 미들웨어를 적용 할 수 있음 [thunk, logger]
  if (useLogger) {
    middleware.push(logger)
  }

  const store = configureStore({reducer: rootReducer, middleware})
  return store
}

export function useStore() {
  const store = useMemo(() => initializeStore(), [])
  return store
}
