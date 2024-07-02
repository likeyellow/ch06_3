import axios from 'axios'
import {API_BASE_URL} from './api-config'

const host = `${API_BASE_URL}/api/member`

export const loginPost = async loginParam => {
  const header = {headers: {'Context-Type': 'x-www-form-urlencoded'}}

  const form = new FormData()
  form.append('username', loginParam.email)
  form.append('password', loginParam.pw)

  const res = await axios.post(`${host}/login`, form, header)

  return res.data
}
