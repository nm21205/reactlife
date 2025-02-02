import React, {useContext, useEffect, useState} from 'react'
import { Header, UserText } from '../styles/header.styles';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Popover } from '@mui/material';//팝업창


//layout컴포넌트에서 전달받은 상태를 props로 전달받음

const HeaderPage = (props) => {
  //전역 state변수에 있는 토큰 값 가져오기
  const {accessToken, setAccessToken} = useContext(UserContext);
  //useNavigate훅은 navigate변수에 할당하여 사용
  const navigate = useNavigate();
  //loggedInUser상태값을 객체로 변경
  const [loggedInUser, setLoggedInUser] = useState({
    email: '로그인 후 이용해 주세요',
    created_date: '',
    updated_date: ''
  });

  //anchorEl 변수는 나중에 팝오버가 연결될 요소를 참조하게 됩니다
  const [anchorEl, setAnchorEl] = useState(null);
  //anchorEl이 null이 아닐경우 true가 되는 불리언 변수를 생성, 이 변수는 팝오버가 열려있는지 나타냅니다
  let open = Boolean(anchorEl);

  //layout에서 만든 상태변수와 설정함수를 자식인 header로 객체분해 할당
  const {isOpen, setIsOpen} = props;

  //header가 그려지면 db가서 로그인한 사람 정보 가져오기
  useEffect(() => {
    let tmp = async () => {
      //accessToken이 null이면 아래 코드를 실행 안함
      if(accessToken === null) return;
      try{
        let res = await axios.get('/api/loggedInEmail',{headers: {Authorization: `Bearer ${accessToken}`}});

        //res.data에 로그인한 사람 이메일 주소가 들어있음
        //엔드 포인트 = '/api/users/:email' = :email로 ${res.data}가 전달됨
        let res2 = await axios.get(`/api/users/${res.data}`)
        //console.log(res2.data)
        setLoggedInUser(res2.data)//전달받은 데이터 객체로 변경
      }catch(err){
        //로그인 시간이 만료되거나 로그인을 안한 경우
        console.log(err)
        alert('로그인을 먼저 해주셔야 이용하실 수 있습니다')
        navigate('/login', {replace: true});//로그인 페이지로 이동
      }
    }
    tmp();
  },[accessToken]) //accessToken이 바뀌면 실행

  const onLogout = () => {
    //로그아웃 버튼이 클릭되면 토큰을 삭제
    //localStorage에 저장된 토큰을 삭제하는 메서드
    localStorage.removeItem('accessToken');

    //전역 상태변수에 저장된 토큰도 삭제
    setAccessToken(null);
    //다시 로그인 페이지로 이동시킴
    navigate('/login', {replace: true});
  }

  return (
    <Header>
      <div>
        {/*클릭한 대상을 anchorEl에 설정하여 팝오버가 이요소에 상대적으로 위치하도록 합니다. */}
        <UserText
          onClick={(e) => {setAnchorEl(e.currentTarget)}}
        >{loggedInUser.email}<span>님</span></UserText>
        {/*
          anchorEl = 팝오버가 연결될 요소를 지정
          open = 팝오버의 표시 여부를 제어
          onClose = 팝오버가 닫힐때 호출되는 콜백함수
          anchorOrigin = 팝오버가 나타날 위치를 결정
        */}
        <Popover
          anchorEl={anchorEl}
          open={open}
          onClose={() => {setAnchorEl(null)}}
          anchorOrigin={{vertical: 'bottom', horizontal:'left'}}
        >
          <p>회원가입일 : {loggedInUser.created_date}</p>
          <p>마지막수정일 : {loggedInUser.updated_date}</p>
          <button onClick={onLogout}>로그아웃</button>
        </Popover>
      </div>
      {/*메뉴 버튼을 클릭하면 setiSOPEN으로 ISOPEN상태를 변경하여 아이콘모양을 변경*/ }
      <div onClick={() => {setIsOpen(!isOpen)}} style={{cursor:'pointer'}}>
        {isOpen ? <MenuOpenIcon/> :<MenuIcon/>}
      </div>
    </Header>
  )
}

export default HeaderPage