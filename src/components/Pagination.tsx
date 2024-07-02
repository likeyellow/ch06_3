import {FC, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {TodoItem} from '../pages/Todo/todoStore/TodoActionType'
import type {initType} from '../pages/Todo/hooks/useCustomMove'

export type PageFunc = (pageParam: initType) => void
export type serverDataProps = {
  todoItem: TodoItem[]
  pageNumList: string[]
  pageRequestDTO: null
  prev: boolean
  next: boolean
  totalCount: string
  prevPage: string
  nextPage: string
  totalPage: string
  current: string
}
export type serverDataParams = {
  serverData: serverDataProps
  movePage: PageFunc
}
export const Pagination = ({serverData, movePage}: serverDataParams) => {
  console.log('페이징', serverData.prev)
  return (
    <div className="flex justify-center m-6">
      {serverData && serverData.prev ? (
        <div className="w-16 p-2 m-2 font-bold text-center text-blue-400">Prev</div>
      ) : (
        <></>
      )}

      {serverData &&
        serverData.pageNumList &&
        serverData.pageNumList.map(pageNum => (
          <div
            key={pageNum}
            className={`m-2 p-2 w-12 text-center rounded shadow-md text-white ${
              serverData.current === pageNum ? 'bg-gray-500' : 'bg-blue-400'
            }`}>
            {pageNum}
          </div>
        ))}

      {serverData && serverData.next ? (
        <div className="w-16 p-2 m-2 font-bold text-center text-blue-400">Next</div>
      ) : (
        <></>
      )}
    </div>
  )
}
