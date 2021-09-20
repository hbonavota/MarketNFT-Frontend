import React, { useEffect } from "react";
import { useState } from "react";
import { postNFT } from "../../actions/postNft";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../../actions/getCategories";
import { getNFTs } from "../../actions/getNFTs";

//categorias
export default function Create() {
  function validateNft(nft) {
    let errorsNft = {};
    if (nft.price < 1) {
      errorsNft.price = "Price is required";
    }

    return errorsNft;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const [errorsFromNft, setErrorsFromNft] = useState({});
  const categories = useSelector((state) => state.categories);

  const [nft, setNft] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categories: [],
    artist: "",
    adress: "",
    reviews: "",
    collection: "",
    currency: "",
  });

  function onInputCategory(e) {
    setNft({
      ...nft,
      categories: [...nft.categories, e.target.value],
    });
  }

  function onInputChange(e) {
    setErrorsFromNft(
      validateNft({
        ...nft,
        [e.target.name]: e.target.value,
      })
    );
    setNft({
      ...nft,
      [e.target.name]: e.target.value,
    });
  }

  //   async function handleCategory(e) {
  //     e.preventDefault();
  //     dispatch(getCategories());
  //     setNft({ categories: [""] });
  //   }

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
    };
    e.preventDefault();
    console.log("nft", newNft);
    dispatch(postNFT(newNft));
    alert("Nft created");
    dispatch(getNFTs());
    setNft({
      name: "",
      image: "",
      categories: [],
      description: "",
      reviews: "",
      currency: "",
      adress: "",
      artist: "",
      price: "",
      collection: "",
    });
    setErrorsFromNft({
      price: "",
    });
  }

  return (
    <div>
      <Link to="/">
        <button>HOME</button>
      </Link>

      <form onSubmit={(e) => handleSubmit(e)}>
        <p>
          <label htmlFor="">Name </label>
          <input
            required
            type="text"
            name="name"
            value={nft.name}
            placeholder="Nft name"
            onChange={(e) => onInputChange(e)}
          />
        </p>

        <p>
          <label htmlFor="">Image </label>
          <input
            required
            type="text"
            name="image"
            value={nft.image}
            placeholder="Nft url image"
            onChange={(e) => onInputChange(e)}
          />
        </p>
        <p>
          <label htmlFor="">Price(usd)</label>
          <input
            required
            type="number"
            name="price"
            value={nft.price}
            placeholder="Price usd"
            onChange={(e) => onInputChange(e)}
          />

          <label htmlFor="">Description</label>
          <input
            required
            type="text"
            name="description"
            value={nft.description}
            placeholder="Description"
            onChange={(e) => onInputChange(e)}
          />
        </p>
        {errorsFromNft.price && <p>{errorsFromNft.price}</p>}
        <p>
          <label htmlFor="">Artist</label>
          <input
            type="text"
            name="artist"
            value={nft.artist}
            onChange={(e) => onInputChange(e)}
            placeholder="Artist"
          />
        </p>
        <label htmlFor="">Adress</label>
        <input
          type="text"
          name="adress"
          value={nft.adress}
          placeholder="Adress"
          onChange={(e) => onInputChange(e)}
        />
        <label htmlFor="">Review</label>
        <input
          type="text"
          name="reviews"
          value={nft.reviews}
          placeholder="Review"
          onChange={(e) => onInputChange(e)}
        />
        <label htmlFor="">Currency</label>
        <input
          require
          type="text"
          name="currency"
          value={nft.currency}
          placeholder="Currency"
          onChange={(e) => onInputChange(e)}
        />

        {/* <label htmlFor="">Categories</label> 
        <select required name="categories" onChange={(e)=>onInputChange(e)} defaultValue="">
            <option value="">Choose categories</option>
            {categories.map((cat)=>(
                <option key={cat._id} name={cat.name} value={cat._id}>{cat.name?.charAt(0).toUpperCase()+cat.name?.slice(1)}</option>
            ))}
        </select> */}

        <h3>Choose Category</h3>
        <div>
          {categories.map((u) => (
            <div key={u._id}>
              <input
                require
                type="checkbox"
                name="categories"
                value={u._id}
                onChange={(e) => onInputCategory(e)}
              ></input>
              <div>
                <label name={u.name}> {u.name} </label>
              </div>
            </div>
          ))}
        </div>
        <button className="inputSubmit" type="submit">
          Create NFT!
        </button>
      </form>
      {/* {nft.categories.map((e) => (
        <p key={e.name} value={e.name}> {e.name}
          {e.charAt(0).toUpperCase() + e.slice(1) + "  "} {e.name}
        </p>
      ))} */}
    </div>
  );
}
