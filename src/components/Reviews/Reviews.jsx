import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

import postReview from '../../actions/postReviews'

export default function Reviews({ reviews }) {
  const userLogged = useSelector((state) => state.userLogged)
  const [input, setInput] = useState({ review: '' })
  const dispatch = useDispatch()

  function handleChange(e) {
    setInput({ review: e.target.value })
  }
  return (
    <>
      <h1>REVIEWS</h1>
      {reviews &&
        reviews.map((review) => (
          <div key={review.length}>
            <p>{review}</p>
          </div>
        ))}
      {userLogged && (
        <>
          <p>Leave a review</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              console.log('HANDLE SUBMIT--------- INPUT', input)
              dispatch(postReview(input))
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
        </>
      )}
    </>
  )
}
