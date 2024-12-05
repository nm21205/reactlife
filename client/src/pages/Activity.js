import React from 'react'
import LayoutPage from '../components/LayoutPage'
import ActivitySection from '../components/ActivitySection'
import { useAuth } from '../hooks/hooks'


const Activity = () => {
  useAuth(); //전역상태에 토큰을 넣어주느 커스텀 훅
  return (
    <LayoutPage target="활동게시판">
      <h1>활동 게시판 페이지 입니다</h1>
      <p>다양한 사람들의 다양한 활동을 경험해 보세요</p> 
<ActivitySection />

    </LayoutPage>
  )
}

export default Activity
