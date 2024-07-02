import {Navigate} from 'react-router-dom'
import {useLocation, useParams, useNavigate, useSearchParams} from 'react-router-dom'

export default function SocialLogin() {
  const {pathname} = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const [search] = useSearchParams()
  /*
  const {cardid} = params

  <p>location: {JSON.stringify(location, null, 2)}</p>
  <p>params: {JSON.stringify(params, null, 2)}</p>
  <p>cardid: {params['cardid']}</p>
  <p>
    from: {search.get('from')}, to: {search.get('to')}
  </p>

  const navigate = useNavigate()
  const cardClicked = useCallback(
    (cardid: string) => () => {
      navigate(`/board/card/${cardid}`)
    },
    [navigate]
  )
  onClick={cardClicked(card.uuid)}
*/
  /*
  const getUrlParameter = (name: string) => {
    // 쿼리 파라미터에서 값을 추출해주는 함수
    let search = window.location.search
    let params = new URLSearchParams(search)
    return params.get(name)
  }
  const token = getUrlParameter('token')
  console.log('토큰 파싱: ' + token)

  const createAccount = useCallback(() => {
  console.log(email, password, confirmPassword)

    if (password === confirmPassword) {
      signup(email, password, () => navigate('/'))
    } else alert('password is not equal to confirmPassword')
  }, [email, password, confirmPassword, navigate, signup])
  */

  const {token} = params

  if (token) {
    // private한 페이지에 접근하면 token이 있는지 확인

    console.log('로컬 스토리지에 토큰 저장' + token)
    localStorage.setItem('ACCESS_TOKEN', token)

    return <Navigate to="/" state={{from: pathname}} />
  } else {
    // token이 없다면 로그인 페이지로 이동하며,
    // 첫번째 인수로 state의 값으로 현재의 pathname을 저장
    return <Navigate to="/login" state={{from: pathname}} />
  }
}
