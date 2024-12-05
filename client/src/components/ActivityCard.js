import React, { useState } from 'react'
import { CardDetail, CardImg, CardWrap, CardTitle, CardContent, CardLikeButton } from '../styles/activityCard.styles'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ActivityCard = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <CardWrap>
      <CardImg imgURL={props.activity.imgURL}>
        <CardLikeButton onClick={() => { setIsLiked(!isLiked) }}>
          {isLiked ? <FavoriteIcon style={{ color: 'red' }} /> :
            <FavoriteBorderIcon style={{ color: 'white' }} />}
        </CardLikeButton>
      </CardImg>
      <CardContent>
        <CardTitle>
          {props.activity.title}
        </CardTitle>
        <CardDetail>
          {props.activity.content}
        </CardDetail>
        <CardDetail>
          작성자:{props.activity.email}
        </CardDetail>
        <CardDetail>
          작성일자:{props.activity.creatDate}
        </CardDetail>
        <CardDetail>
          좋아요:{props.activity.like}
        </CardDetail>
        <button>자세히보기</button>
      </CardContent>
    </CardWrap>
  )
}

export default ActivityCard
