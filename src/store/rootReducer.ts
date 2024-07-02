import {combineReducers} from 'redux'
import * as L from './listEntities'
import * as LO from './listidOrders'
import * as LC from './listidCardidOrders'
import * as C from './cardEntities'
import * as T from '../pages/Todo/todoStore'
import * as LD from '../pages/Loading/loadingStore'

export const rootReducer = combineReducers({
  listEntities: L.reducer,
  listidOrders: LO.reducer,
  listidCardidOrders: LC.reducer,
  cardEntities: C.reducer,
  todoItem: T.todoItemReducer,
  loading: LD.loadingReducer,
  // ---------------------------------- //
  todo: T.TodoReducer,
  load: LD.loadReducer,
})

// export const rootReducer = combineReducers({})

// 루트 리듀서의 반환값을 유추해 줍니다.
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내 줍니다.
export type rootReducer = ReturnType<typeof rootReducer>
