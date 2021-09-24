import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import getNftDetail from "../../actions/getNftDetail";
import { useSelector, useDispatch } from "react-redux";
import getClean from "../../actions/getClean";
import styled from "styled-components";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { addShoppingTrolley } from "../../actions/addShoppingTrolley";
import addFavorite from "../../actions/favorite/addFavorite";
import { conectLS } from "../../actions/conectLS";
import Review from '../Reviews/Reviews'
const Container = styled.div``;

const Wrapper = styled.div`
padding: 50px;
display: flex;
@media (max-width: 750px) {
    flex-direction: column
}
`;
const ImgContainer = styled.div`
flex: 0,7;
@media (max-width: 700px) {
    flex: 1;
}
`;

const Image = styled.img`
width: 94%;
border-radius: 5%;
height: 90vh;
object-fit: cover;
`;

const InfoContainer = styled.div`
flex: 1;
padding: 0px 50px;
`;

const TitleContainer = styled.div`
display: flex;
`;

const Title = styled.h1`
font-weight: 100;
`;

const Owner = styled.h3`
margin: 0px 2px;
font-weight: 100;
font-size: 18px;
color: #368B85;
`;

const Description = styled.p`
margin: 20px 0px;
`;

const Price = styled.h3`
font-weight: 100;
font-size: 30px;
`;

const useStyles = makeStyles({
  favorite: {
    opacity: 0.7,
    color: "error",
    "&:hover": {
      color: "#FF0000",
    },
  },
});
export default function NftDetail() {
  const nftdetalle = useSelector((state) => state.nftDetail)
  const { id } = useParams();
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.userLogged);
  const classes = useStyles();
  useEffect(() => {
    console.log("soy un detalle", nftdetalle)
    dispatch(getNftDetail(id));
    return () => {
      dispatch(getClean());
    };
  }, [id, dispatch]);

  const handleFav = (ele) => {
    dispatch(addFavorite({ item: ele._id, user: userLogged }));
  };

  const handleClick = (ele) => {
    dispatch(addShoppingTrolley(ele._id));
    dispatch(conectLS())
  };
  const nftDetail = useSelector((state) => state.nftDetail);

  return (
    <Container>
      {nftDetail !== undefined ? (
        <Wrapper>
          <ImgContainer>
            <Image src={nftDetail.image} alt="img" />
          </ImgContainer>
          <InfoContainer>
            <TitleContainer>
              <Title>{nftDetail.name}</Title>
              <IconButton>
                {userLogged ? (
                  <FavoriteBorderIcon
                    onClick={() => handleFav(nftDetail)}
                    className={classes.favorite}
                  />
                ) : null}
              </IconButton>
            </TitleContainer>
            <Owner>Owned by: {nftDetail.owner}</Owner>
            <Description>{nftDetail.description}</Description>
            <Price>{nftDetail.price} ETH</Price>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleClick(nftDetail)}
            >
              Add To my Cart
              <AddShoppingCartIcon />
            </Button>
          </InfoContainer>
          <Review reviews={nftDetail.reviews}/>
        </Wrapper>
      ) : (
        <span>Loading...</span>
      )}
    </Container>
  );
}