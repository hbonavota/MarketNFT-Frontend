import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { postNFT } from '../../actions/postNft'
import { getCategories } from '../../actions/getCategories'
import { getNFTs } from '../../actions/getNFTs'
import Typography from '@material-ui/core/Typography'
import styles from '../create/create.module.css'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Checkbox, Grid } from '@material-ui/core'

const useStyle = makeStyles({
  contentSection: {
    display: 'flex',
    marginTop: '20px',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.16), 0 1px 4px rgba(0,0,0,0.23)',
  },
  link: {
    textDecoration: 'none',
  },
})

export default function Create() {
  const classes = useStyle()
  function validateNft(nft) {
    let errorsNft = {}
    if (nft.price < 1) {
      errorsNft.price = 'Price is required'
    }

    return errorsNft
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  const [errorsFromNft, setErrorsFromNft] = useState({})
  const categories = useSelector((state) => state.categories)

  const [nft, setNft] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    categories: [],
    artist: '',
    adress: '',
    reviews: '',
    collection: '',
    currency: '',
  })

  function onInputCategory(e) {
    setNft({
      ...nft,
      categories: [...nft.categories, e.target.value],
    })
  }

  function onInputChange(e) {
    setErrorsFromNft(
      validateNft({
        ...nft,
        [e.target.name]: e.target.value,
      })
    )
    setNft({
      ...nft,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    const newNft = {
      name: nft.name,
      image: nft.image,
      categories: nft.categories,
      price: nft.price,
      reviews: nft.reviews,
      description: nft.description,
      adress: nft.adress,
      currency: nft.currency,
      artist: nft.artist,
      collection: nft.collection,
    }
    e.preventDefault()
    console.log('nft', newNft)
    dispatch(postNFT(newNft))
    alert('Nft created')
    dispatch(getNFTs())
    setNft({
      name: '',
      image: '',
      categories: [],
      description: '',
      reviews: '',
      currency: '',
      adress: '',
      artist: '',
      price: '',
      collection: '',
    })
    setErrorsFromNft({
      price: '',
    })
  }

  return (
    <Grid container>
      <Grid>
        <Sidebar item xs={12} sm={12} md={3} lg={3} xl={3} />
      </Grid>

      <Grid
        className={classes.contentSection}
        item
        xs={12}
        sm={12}
        md={9}
        lg={9}
        xl={9}
      >
        <Box
          component='form'
          className={styles.form}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={styles.formGroup}>
            <Typography htmlFor=''>Image/GIF</Typography>
            <input
              required
              className={styles.input}
              type='text'
              name='image'
              value={nft.image}
              placeholder='URL'
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className={styles.formGroup}>
            <Typography htmlFor=''>Name</Typography>
            <input
              required
              className={styles.input}
              type='text'
              name='name'
              value={nft.name}
              placeholder='Nft name'
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className={styles.formGroup}>
            <Typography htmlFor=''>Description</Typography>
            <input
              required
              className={styles.input}
              type='text'
              name='description'
              value={nft.description}
              placeholder='Description'
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className={styles.formGroup}>
            <Typography htmlFor=''>Artist</Typography>
            <input
              className={styles.input}
              type='text'
              name='artist'
              value={nft.artist}
              onChange={(e) => onInputChange(e)}
              placeholder='Artist'
            />
          </div>

          <div className={styles.formGroup}>
            <Typography htmlFor=''>Category</Typography>

            <div className={styles.checkboxContainer}>
              {categories.map((u) => (
                <div key={u._id}>
                  <Checkbox
                    labelPlacement='end'
                    className={styles.checkbox}
                    name='categories'
                    value={u._id}
                    onChange={(e) => onInputCategory(e)}
                  ></Checkbox>

                  <Typography
                    className={styles.checkbox}
                    variant='body2'
                    display='inline'
                    name={u.name}
                  >
                    {u.name}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <Typography htmlFor=''>Address</Typography>
            <input
              className={styles.input}
              type='text'
              name='adress'
              value={nft.adress}
              placeholder='Address'
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.priceContainer}>
              <Typography className={styles.priceLabel}>Price</Typography>
              <input
                required
                className={styles.priceInput}
                type='number'
                name='price'
                value={nft.price}
                placeholder='Price usd'
                onChange={(e) => onInputChange(e)}
              />
              {errorsFromNft.price && <p>{errorsFromNft.price}</p>}
            </div>

            <div className={styles.priceContainer}>
              <Typography className={styles.priceLabel}>Currency</Typography>
              <input
                required
                className={styles.priceInput}
                type='text'
                name='currency'
                value={nft.currency}
                placeholder='Currency'
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>

          <div className={styles.btnContainer}>
            <Button
              size='large'
              className={styles.homeBtn}
              variant='outlined'
              href='/'
            >
              Cancel
            </Button>
            <Button
              size='large'
              color='primary'
              variant='contained'
              className={styles.inputSubmit}
              type='submit'
            >
              Create NFT!
            </Button>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}
