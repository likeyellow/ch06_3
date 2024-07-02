import {useMemo} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import {useDrop} from 'react-dnd'
import {Title} from '../../components'
import CreateListForm from './CreateListForm'
import BoardList from '../BoardList'
import {ListDroppable} from '../../components'

import {useLists} from '../../store/useLists'
/*
import type {AppState} from '../../store'
import type {List} from '../../store/commonTypes'
import * as LO from '../../store/listidOrders'
import * as L from '../../store/listEntities'
*/
export default function Board() {
  /*
  const dispatch = useDispatch()

  const lists = useSelector<AppState, List[]>(({listidOrders, listEntities}) =>
    listidOrders.map(uuid => listEntities[uuid])
  )

  const onCreateList = useCallback(
    (uuid: string, title: string) => {
      const list = {uuid, title}
      dispatch(LO.addListidToOrders(list.uuid))
      dispatch(L.addList(list))

      console.log('onCreateList', uuid, title)
      console.log(list)
    },
    [dispatch]
  )
  const onRemoveList = useCallback(
    (listid: string) => () => {
      dispatch(L.removeList(listid))
      dispatch(LO.removeListidFromOrders(listid))
    },
    [dispatch]
  )
*/
  const {lists, onRemoveList, onCreateList, onMoveList, onDragEnd} = useLists()

  const children = useMemo(
    () =>
      lists.map((list, index) => (
        <BoardList
          key={list.uuid}
          list={list}
          onRemoveList={onRemoveList(list.uuid)}
          index={index}
          onMoveList={onMoveList}
        />
      )),
    [lists, onRemoveList, onMoveList]
  )
  return (
    <section className="mt-4">
      <Title>Board</Title>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListDroppable className="flex flex-row p-2 mt-4">
          <div className="flex flex-wrap p-2 mt-4">
            {children}
            <CreateListForm onCreateList={onCreateList} />
          </div>
        </ListDroppable>
      </DragDropContext>
    </section>
  )
}
