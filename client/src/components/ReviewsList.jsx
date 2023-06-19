import React, { useEffect, useState } from 'react'
import client from '../api';
import { ReviewCard } from './ReviewCard';

export const ReviewsList = () => {

  const [reviewsList, setReviewsList] = useState([]);

  const getReviews = async () => {
    await client.get("/feedback")
      .then(res => { console.log(res.data); setReviewsList(res.data.reviews) })
      .catch(e => {
        console.log(e);
        alert("Щось сталося");
      });
  }

  useEffect(() => {
    getReviews();
  }, []);

  if (reviewsList)
    return (
      <div className='flex flex-col m-3'>
        {
          reviewsList.map(item => <ReviewCard key={item._id} post={item} />)
        }
      </div>
    )
  else {
    return <div>Wait</div>
  }
}
