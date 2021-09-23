import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

import postReview from '../../actions/postReviews'

export default function Reviews({ reviews, id }) {
  const nftdetalle = useSelector((state) => state.nftDetail)
  console.log("soy un detalle", nftdetalle._id)
  const userLogged = useSelector((state) => state.userLogged)
  const [input, setInput] = useState({ review: '' })
  const dispatch = useDispatch()
  function handleChange(e) {
    setInput({ review: e.target.value })
  }
  //En el back llega como review
  return (
    <div>
      <h1>REVIEWS</h1>
      {reviews &&
        reviews.map((review) => (
          <div key={review.length}>
            <p>{review}</p>
          </div>
        ))}
      {userLogged && (
        <div>
          <p>Leave a review</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              console.log('HANDLE SUBMIT--------- INPUT', input)
              // console.log("", id:idDetail._id)
              dispatch(postReview({...input, id:nftdetalle._id}))

              setInput({ review: '' })
            }}
          >
            <TextField
              value={input.review}
              variant='outlined'
              size='small'
              onChange={(e) => handleChange(e)}
              type='text'
            />
            <Button type='submit' variant='contained' color='primary'>
              Post
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
