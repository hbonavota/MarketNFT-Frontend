import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNFTs } from '../../actions/getNFTs'
import { deleteNFT } from '../../actions/admin/deleteNFT'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Footer from '../footer/footer'

export default function Admi0Nfts() {
  const dispatch = useDispatch();
  const nfts = useSelector(state => state.allNFTs)

  useEffect(() => {
    dispatch(getNFTs())
  }, [dispatch])

  const [inputs, setInputs] = useState({
    deleteNFT: []
  })

  function onInputChange(e) {
    e.preventDefault()
    setInputs({
      ...inputs,
      [e.target.name]: inputs[e.target.name].concat(e.target.value)
    });

  }

  async function handleDeleteNFT(e) {
    e.preventDefault()
    dispatch(deleteNFT(inputs.deleteNFT))
    alert('NFT deleted')
    dispatch(getNFTs())
    setInputs({ deleteNFT: [''] })

  }


  return (<div>
    <Link to='/admin'>
      <Button variant='contained' size='large'>Back</Button>
    </Link>
    <h2>NFTs</h2>
    <form name="deleteNFT" onSubmit={(e) => handleDeleteNFT(e)}>
      <h3>Delete NFT</h3>
      <label htmlFor="">NFTs</label>
      <div>
        {nfts.map((n) => (
          <div key={n._id}>
            <input
              type="checkbox"
              name="deleteNFT"
              value={n._id}
              onChange={(e) => onInputChange(e)}
            ></input>
            <div>
              <label name={n.name}> {n.name} </label>
              <img src={n.image} alt="NFT image" width="60" height="60" />
            </div>
          </div>
        ))}
      </div>
      <Button variant='contained' size='large' type="submit">Delete!</Button>
    </form>
    <Footer></Footer>
  </div>
  )
}