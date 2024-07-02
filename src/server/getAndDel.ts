import {getServerUrl} from './getServerUrl'

const getAndDel =
  (methodName: string, jwt?: string | null | undefined) =>
  (path: string, data?: object, jwt?: string | null | undefined) => {
    let headers = {'Content-Type': 'application/json; charset=UTF-8'}
    let init: RequestInit = {
      method: methodName,
    }
    if (jwt) {
      init = {
        ...init,
        headers: {...headers, Authorization: `Bearer ${jwt}`},
      }
    } else init = {...init, headers}

    return fetch(getServerUrl(path), init)
  }

export const get = getAndDel('GET')
export const del = getAndDel('DELETE')
