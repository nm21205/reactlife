import React, {useEffect} from 'react'
import { ActivityInput, ActivitySectionHeader, ActivitySelect, ActivityWriteBtn, ActivityBody, ActivityFooter } from '../styles/activity.styles'
import ActivityCard from './ActivityCard'
import { Pagination } from '@mui/material'
import axios from 'axios'

const ActivitySection = () => {
  useEffect (()=>{
    //order = 정렬방법, limt = 한페이지당보여질 수
axios.get('/api/activites?order=dateDesc&limt=4&page=1')
  },[])
  return (
    <section>
      <ActivitySectionHeader>
        <ActivityInput/>
        <ActivitySelect>
          <option>최신순</option>
          <option>오래된순</option>
          <option>좋아요순</option>
          <option>조회수순</option>
        </ActivitySelect>
        <ActivityWriteBtn>글쓰기</ActivityWriteBtn>
      </ActivitySectionHeader>
      <ActivityBody>
        <ActivityCard activity={{
          title:'강아지 봉사활동',
          content:'봉사활동은 재미있어요',
          email:'test@test.com',
          createDate: '2024-01-01',
          like:50,
          imgURL:'https://cdn.pixabay.com/photo/2022/12/21/08/38/conifer-7669435_640.jpg'
        }}/>
           <ActivityCard activity={{
          title:'봉사활동',
          content:' 재미있어요',
          email:'test@tes2222t.com',
          createDate: '2024-01-21',
          like:150,
          imgURL: null
        }}/>
         <ActivityCard activity={{
          title:'봉사활동',
          content:' 재미있어요',
          email:'test@tes2222t.com',
          createDate: '2024-01-21',
          like:150,
          imgURL: null
        }}/>
      
      </ActivityBody>
      <ActivityFooter>
        <Pagination count={20}/>
      </ActivityFooter>
      
    </section>
  )
}

export default ActivitySection