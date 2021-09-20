import { useEffect } from "react"
import { useParams, Link } from 'react-router-dom'
import getNftDetail from "../../actions/getNftDetail"
import { useSelector, useDispatch } from "react-redux"
import getClean from "../../actions/getClean"
import Payments from "../Payments/PaymentsButton/PaymentsButton"
import styled from "styled-components";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { addShoppingTrolley } from "../../actions/addShoppingTrolley";
const Container = styled.div``;

const Wrapper = styled.div`
padding: 50px;
display: flex;
`;
const ImgContainer = styled.div`
flex: 0.7;
`;

const Image = styled.img`
width: 94%;
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
        '&:hover': {
          color: "#FF0000",
        },
      },
      favoriteIconButton: {
        "&:hover":  {
          backgroundColor: "transparent"
        }
      }
  });
export default function NftDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const userLogged = useSelector((state) => state.userLogged);
    const classes = useStyles();

    useEffect(() => {
        dispatch(getNftDetail(id))
        return () => {
            dispatch(getClean())
        }
    }, [id, dispatch])

    const handleClick = (ele)=>{
        dispatch(addShoppingTrolley(ele));
      }
    const nftDetail = useSelector(state => state.nftDetail)

    return (
    <Container>
        {nftDetail !== undefined ?
         <Wrapper>
         <ImgContainer>
         <Image src={nftDetail.image} alt="img" />
         </ImgContainer>
         <InfoContainer>
             <TitleContainer>
                 <Title>{nftDetail.name}</Title>
                 <IconButton className={classes.favoriteIconButton}>
              {userLogged? <FavoriteBorderIcon  className={classes.favorite} />
              :null}
              
            </IconButton>
                 </TitleContainer>
             <Owner>Owned by: {nftDetail.owner}</Owner>
             <Description>{nftDetail.description}</Description>
             <Price>{nftDetail.price} ETH</Price>
             <Button 
             variant="outlined" 
             color="primary"
             onClick={() => handleClick(nftDetail)}>Add To my Cart<AddShoppingCartIcon/></Button>
         </InfoContainer>
     </Wrapper>
     : <span>Loading...</span>
     }
       
    </Container>
    )

}