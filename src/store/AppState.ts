import * as L from './listEntities'
import * as LO from './listidOrders'
import * as LC from './listidCardidOrders'
import * as C from './cardEntities'
import * as LD from '../pages/Loading/loadingStore'
import * as T from '../pages/Todo/todoStore'

export type AppState = {
  listEntities: L.State
  listidOrders: LO.State
  listidCardidOrders: LC.State
  cardEntities: C.State
  loading: LD.LoadingState
  todo: T.TodoItem
}
