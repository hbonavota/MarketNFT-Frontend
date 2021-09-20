// import { useEffect } from "react"
// import { useParams, Link } from 'react-router-dom'
// import getNftDetail from "../../actions/getNftDetail"
// import { useSelector, useDispatch } from "react-redux"
// import getClean from "../../actions/getClean"

// const Wrapper = styled.div`
// padding: 50px;
// display: flex;
// `;
// const ImgContainer = styled.div`
// flex: 0.7;
// `;

// const Image = styled.img`
// width: 94%;
// height: 90vh;
// object-fit: cover;
// `;

// const InfoContainer = styled.div`
// flex: 1;
// padding: 0px 50px;
// `;

// const TitleContainer = styled.div`
// display: flex;
// `;

// const Title = styled.h1`
// font-weight: 100;
// `;

// const Owner = styled.h3`
// margin: 0px 2px;
// font-weight: 100;
// font-size: 18px;
// color: #368B85;
// `;

// const Description = styled.p`
// margin: 20px 0px;
// `;

// const Price = styled.h3`
// font-weight: 100;
// font-size: 30px;
// `;

// const useStyles = makeStyles({
//     favorite: {
//         opacity: 0.7,
//         color: "error",
//         '&:hover': {
//           color: "#FF0000",
//         },
//       },
//       favoriteIconButton: {
//         "&:hover":  {
//           backgroundColor: "transparent"
//         }
//       }
//   });
// export default function NftDetail() {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const userLogged = useSelector((state) => state.userLogged);
//     const classes = useStyles();

//     useEffect(() => {
//         dispatch(getNftDetail(id))
//         return () => {
//             dispatch(getClean())
//         }
//     }, [id, dispatch])

//     const handleClick = (ele)=>{
//         dispatch(addShoppingTrolley(ele));
//       }
//     const nftDetail = useSelector(state => state.nftDetail)


//     return <div>
//         <div>
//             <Link to="/">
//                 <button>Home</button>
//             </Link>
//         </div>
//         {
//             nftDetail !== undefined ?
//                 <div className="detail">
//                     <h2>{nftDetail.name}</h2>
//                     <img src={nftDetail.image} alt="img" />
//                     <p>{nftDetail.description}</p>
//                     <p>{nftDetail.price}</p>
//                     <br />
//                 </div>
//                 :
//                 <span>Loading...</span>
//         }
//     </div>

// }