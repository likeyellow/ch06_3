// 이 함수는 파라미터로 액션의 타입(ex: GET_USER)과 Promise를 만들어주는 함수를 받아옵니다.
export function createAsyncDispatcher(type, promiseFn) {
  // 성공, 실패에 대한 액션 타입 문자열을 준비합니다.
  const SUCCESS = `${type}_SUCCESS`
  const ERROR = `${type}_ERROR`

  // 새로운 함수를 만듭니다.
  // ...rest를 사용하여 나머지 파라미터를 rest배열에 담습니다.
  async function actionHandler(dispatch, ...rest) {
    dispatch({type}) // 요청 시작됨

    try {
      const data = await promiseFn(...rest) // rest배열을 spread로 넣어줍니다.
      dispatch({
        type: SUCCESS,
        data,
      }) // 성공함
    } catch (e) {
      dispatch({
        type: ERROR,
        error: e,
      }) // 실패함
    }
  }

  return actionHandler
}

export const initialAsyncState = {
  loading: false,
  data: null,
  error: null,
}

// 로딩 중일 때 바뀔 상태 객체
const loadingState = {
  loading: true,
  data: null,
  error: null,
}

// 성공했을 때의 상태 만들어주는 함수
const success = data => ({
  loading: false,
  data,
  error: null,
})

// 실패했을 때의 상태 만들어주는 함수
const error = error => ({
  loading: false,
  data: null,
  error: error,
})

// 3가지 액션을 처리하는 리듀서를 만들어 줍니다.
// type은 액션타입, key는 리듀서에서 사용할 필드 이름 입니다.(ex: user, users)
export function createAsyncHandler(type, key) {
  // 성공, 실패에 대한 액션타입 문자열을 준비합니다.
  const SUCCESS = `${type}_SUCCESS`
  const ERROR = `${type}_ERROR`

  // 함수를 새로 만들어서
  function handler(state, action) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState,
        }
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data),
        }
      case ERROR:
        return {
          ...state,
          [key]: error(action.error),
        }
      default:
        return state
    }
  }

  // 반환홥니다.
  return handler
}
