import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

import postReview from '../../actions/postReviews'
// import getReviews from '../../actions/getReviews'

export default function Reviews() {
  const nftdetalle = useSelector((state) => state.nftDetail)
  const userLogged = useSelector((state) => state.userLogged)
  const [input, setInput] = useState({ review: '' })
  const dispatch = useDispatch()

  function handleChange(e) {
    setInput({ review: e.target.value })
  }

  return (
    <div>
      <h1>REVIEWS</h1>
      {nftdetalle.reviews &&
        nftdetalle.reviews.map((review) => (
          <div key={review._id}>
            <p>{review.review}</p>
          </div>
        ))}
      {userLogged && (
        <div>
          <p>Leave a review</p>
          <form
            onSubmit={() => {
              dispatch(postReview({ ...input, id: nftdetalle._id }))
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
