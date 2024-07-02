import type {ChangeEvent} from 'react'
import {useState, useCallback, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../contexts'
import * as U from '../../utils'
import {Button, Grid, TextField, Typography} from '@mui/material'
import {Image} from 'react-native'
import git from '../../img/git2.png'
import {socialLogin} from '../../server/apiService'
import {useDispatch} from 'react-redux'

type LoginFormType = Record<'email' | 'password', string>
const initialFormState = {email: '', password: ''}

export default function Login() {
  const [{email, password}, setForm] = useState<LoginFormType>(initialFormState)

  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {login} = useAuth()

  const loginAccount = useCallback(() => {
    login(email, password, () => navigate('/'))
    //dispatch(login(email, password, () => navigate('/')))
  }, [email, password, navigate, login])

  useEffect(() => {
    U.readObjectP<LoginFormType>('user')
      .then(user => {
        if (user) setForm(user)
      })
      .catch(e => {
        /* 오류 무시 */
      })
  }, [])

  const handleSocialLogin = (provider: string) => {
    socialLogin(provider)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 border border-gray-300 shadow-xl rounded-xl">
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-3xl text-center text-primary">로그인</h1>
          <input
            type="text"
            className="w-full p-3 mb-4 input input-primary"
            name="email"
            placeholder="Email"
            value={email}
            onChange={changed('email')}
          />
          <input
            type="password"
            className="w-full p-3 mb-4 input input-primary"
            name="password"
            placeholder="Password"
            value={password}
            onChange={changed('password')}
          />
          <button type="submit" className="w-full btn btn-primary" onClick={loginAccount}>
            Login
          </button>

          <Grid item xs={12}>
            <Button
              onClick={() => handleSocialLogin('github')}
              fullWidth
              variant="contained"
              style={{
                backgroundColor: '#000',
                marginTop: '3%',
                borderRadius: '0.5rem',
                height: '3rem',
              }}>
              <img
                src={git}
                alt="gitLogo"
                style={{width: 35, height: 35, marginLeft: '-20%', marginRight: '9%'}}
              />
              깃허브로 로그인하기
            </Button>
          </Grid>
        </div>

        <div className="mt-6 text-gray-dark">
          Create account?
          <Link className="btn btn-link btn-primary" to="/signup/">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  )
}
