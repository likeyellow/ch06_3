import {API_BASE_URL} from './api-config'
import {getServerUrl} from './getServerUrl'

export function call(api: string, method: string, request: string | null | undefined) {
  let options = {
    headers: new Headers({
      'Content-type': 'application/json',
    }),
    url: API_BASE_URL + api,
    method: method,
    //body: JSON.stringify(request),
  }

  let prop = {body: JSON.stringify(request)}
  if (request) {
    // GET method
    var body = {...options, ...prop}
    //options.body = JSON.stringify(request)
  }

  return fetch(options.url, options)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status == 403) {
        window.location.href = '/login' // redirect
      } else {
        Promise.reject(response)
        throw Error(response.toString())
      }
    })
    .catch(error => {
      console.log('http error')
      console.log(error)
    })
}

export function socialLogin(provider: string) {
  const frontendUrl = window.location.protocol + '//' + window.location.host

  window.location.href =
    API_BASE_URL + '/auth/authorize/' + provider + '?redirect_url=' + frontendUrl
}

/*
export default function socialLogin(provider) {
  const frontendUrl = window.location.protocol + '//' + window.location.host
  window.location.href =
    API_BASE_URL + '/auth/authorize/' + provider + '?redirect_url=' + frontendUrl
}
*/
