import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import postReview from '../../actions/postReviews'
import styles from './Reviews.module.css'

const useStyles = makeStyles({
  review: {
    background: 'white'
  },


})

export default function Reviews() {
  const classes = useStyles()
  const nftdetalle = useSelector((state) => state.nftDetail)
  const userLogged = useSelector((state) => state.userLogged)
  const [input, setInput] = useState({ review: '' })
  const dispatch = useDispatch()

  function handleChange(e) {
    setInput({ review: e.target.value })
  }

  return (
    <Box className={classes.review}>
      <Typography variant='h5'>REVIEWS</Typography>
      <hr />
      {nftdetalle.reviews &&
        nftdetalle.reviews.map((review) => (
          <div key={review._id}>
            <Typography variant='body1'>{review.review}</Typography>
          </div>
        ))}
      {userLogged && (
        <div>
          <hr />
          <Typography>Leave a review</Typography>
          <form
            className={styles.form}
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
    </Box>
  )
}
