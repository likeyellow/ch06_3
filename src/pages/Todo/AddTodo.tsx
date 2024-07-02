import {useState, useCallback, KeyboardEvent, useRef} from 'react'
import {Button, Grid, TextField} from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'
import type {FC, ChangeEvent, MouseEvent} from 'react'
import {postAdd} from '../../server/todoApi'
import useCustomMove from './hooks/useCustomMove'

type todosProps = {
  addItem: (todoTitle: string) => void
}

const initState = {
  title: '',
  userId: '',
  dueDate: '',
}

const AddTodo = () => {
  const dispatch = useDispatch()

  // 사용자의 입력을 저장할 오브젝트
  const [todo, setTodo] = useState('')
  const [result, setResult] = useState(null) // 결과 상태
  const {moveToList} = useCustomMove() // useCustomMove 활용

  // onInputChange 함수 작성: 사용자가 인풋필드에 키를 하나 입력할때마다 실행되며
  // 인풋필드에 담긴 문자열을 자바스크립트 오브젝트에 저장
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  // onSubmit 함수 작성: (+)버튼 클릭할 때 실행되며 onInputChange에서 저장하고 있던
  // 문자열을 리스트에 추가
  const onButtonClick = () => {
    //addItem(todo) // addItem 함수 사용
    //setTodo('')

    postAdd(todo)
      .then(result => {
        setResult(result.TNO)
        // 초기화
        setTodo('')
      })
      .catch(e => {
        console.error(e)
      })
  }

  // enterKeyEventHandler 함수 작성: Enter키 눌러서 입력
  const enterKeyEventHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (todo.trim() === '') {
      alert('반드시 할 일을 입력해야 합니다.')
      return
    }
    if (e.key === 'Enter') {
      onButtonClick()
    }
  }

  // onInputChange 함수 TextField에 연결-사용자가 인풋필드에 정보를 입력하기 시작하면,
  // 그 정보는 TextField 컴포넌트로 전달
  // TextField 는 onChange를 props로 받는데 이 함수는 사용자가 TextField에서
  // 키보드를 한번 누를 때마다 실행
  return (
    <Grid container style={{marginTop: 20}}>
      <Grid xs={11} md={11} item style={{paddingRight: 16}}>
        <TextField
          placeholder="할 일을 입력 후, Enter 를 누르세요"
          fullWidth
          onChange={onInputChange}
          onKeyPress={enterKeyEventHandler}
          value={todo}
          style={{backgroundColor: 'white'}}
        />
      </Grid>
      <Grid xs={1} md={1} item>
        <Button
          fullWidth
          style={{height: '100%'}}
          color="secondary"
          variant="outlined"
          onClick={onButtonClick}>
          +
        </Button>
      </Grid>
    </Grid>
  )
}
export default AddTodo
