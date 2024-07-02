import {useState} from 'react'
import {createSearchParams, useNavigate, useSearchParams} from 'react-router-dom'

/*
const getNum = (param: string | null, defaultValue: number | null) => {
  if (!param) {
    return defaultValue
  }

  return parseInt(param)
}
*/
export type initType = {
  page: string
  size: string
}

const useCustomMove = () => {
  const navigate = useNavigate()

  const [refresh, setRefresh] = useState(false)
  const [queryParams] = useSearchParams()

  const pageParamFromUrl: initType = {
    page: queryParams.get('page') || '1',
    size: queryParams.get('size') || '10',
  }

  const moveToList = (pageParam: initType = pageParamFromUrl) => {
    const queryStr = createSearchParams({
      page: pageParam.page,
      size: pageParam.size,
    }).toString()

    setRefresh(!refresh)
    navigate({pathname: `../list`, search: queryStr})
    console.log('zzzz', queryStr)
  }

  const moveToModify = (id: number) => {
    navigate({
      pathname: `../modify/${id}`,
      search: createSearchParams({
        page: pageParamFromUrl.page,
        size: pageParamFromUrl.size,
      }).toString(), // 수정 시에 기존의 쿼리 스트링 유지를 위해
    })
  }

  return {
    moveToList,
    moveToModify,
    page: pageParamFromUrl.page,
    size: pageParamFromUrl.size,
    refresh,
  }
}
export default useCustomMove
