import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeLS } from "../../actions/removeLS";
import { getLS } from "../../actions/getLS";
import Payments from '../Payments/PaymentsButton/PaymentsButton'
import { IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import cartDB  from '../../actions/shoppingCart/cartDB.js';
import { getNFTs } from '../../actions/getNFTs';
import removeItem from '../../actions/shoppingCart/removeItem'
import ShoppingCartPayment from '../../actions/ShoppingCartPayment'; 
import { alertDeleted } from '../../actions/sweetAlert/alerts';
import Cookies from 'js-cookie'

const useStyle = makeStyles({
    div: {
        display: 'flex',
        flexDirection: 'row',
    },
    titles: {
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        background: 'white',
        borderRadius: '10px',
    },
    cart: {
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        background: 'white',
        borderRadius: '10px',
    },
    data: {
        display: 'flex',
        flexDirection: 'row',
        margin: '5px',
        padding: 5,
        background: 'white',
        borderRadius: '10px',
    }

   })

export default function NavBarShoppingCart() {
    var NftShoppingCart = [];
    const classes = useStyle()
    const dispatch = useDispatch();

    useEffect(() => {
        if(!userLogged){
            dispatch(getLS())
            dispatch(getNFTs())
        }else{           
            dispatch(cartDB({user:userLogged}))
            dispatch(getNFTs())
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(ShoppingCartPayment(NftShoppingCart))
    }, [dispatch ,NftShoppingCart]);

    // const userLogged=JSON.parse(window.sessionStorage.getItem('userLogged'))
    const userLogged = Cookies.get('token');
    const allNfts= useSelector(state => state.allNFTs)
    const allProductsCart = useSelector(state => state.shoppingTrolley)

    function userCartNfts(allNfts,ids){
        var cartNfts=[]       
        for (let i=0; i <=ids.length; i++){
          allNfts.filter((e)=>{if(e._id === ids[i])return cartNfts.push(e)})
          
        }
        return cartNfts
    }
    
        const handleCartClick = function (e) {
            if(!userLogged){
                dispatch(removeLS(e))
                alertDeleted()
            }else{            
                dispatch(removeItem({user:userLogged,item:e}))
            }
        }
               
    const nftsData= userCartNfts(allNfts, allProductsCart)
          NftShoppingCart = nftsData;
    

    return (
        <div className={classes.div}>           
            
        <Grid container>
            <Grid className={classes.titles} item xs={12} sm={12} md={8} lg={8} xl={8}>

                <Grid className={classes.data} marginLeft="20px" item xs={12} sm={12} md={12} lg={12} xl={12}>

                    <Grid item xs={0} sm={0} md={3} lg={3} xl={3} className="content">
                        <Typography color="white" variant='h6'>Nombre</Typography>
                    </Grid>

                    <Grid item xs={0} sm={0} md={3} lg={3} xl={3} className="content">
                        <Typography color="white" variant='h6'>Dueño</Typography>
                    </Grid>

                    <Grid item xs={4} sm={0} md={4} lg={3} xl={3} className="content">
                        <Typography color="white" variant='h6'>Producto</Typography>
                    </Grid>

                    <Grid item xs={4} sm={0} md={1} lg={3} xl={3} className="content">
                        <Typography color="white" variant='h6'>Precio</Typography>
                    </Grid>

                    <Grid item xs={4} sm={0} md={1} lg={3} xl={3} className="content">
                        <Typography color="white" variant='h6'>Eliminar</Typography>
                    </Grid>

                </Grid>
            {
                nftsData?.map(e => (

                    <Grid className={classes.data} item xs={12} sm={12} md={12} lg={12} xl={12}>

                        <Grid item xs={0} sm={3} md={3} lg={3} xl={3} className="content">
                            <Typography variant='subtitle1'>{e ? e.name : null}</Typography>
                        </Grid>

                        <Grid item xs={0} sm={3} md={3} lg={3} xl={3} className="content">
                            <Typography variant='subtitle1'>{e ? e.owner : null}</Typography>
                        </Grid>

                        <Grid item xs={6} sm={3} md={3} lg={3} xl={3} className="content">    
                            <img src={e ? e.image : null} width="75px" height="75px" />
                        </Grid >

                        <Grid  item xs={3} sm={2} md={3} lg={3} xl={3} className="content">
                            <Typography variant='subtitle1'>{e ? e.price : null}</Typography>
                        </Grid >

                        <Grid  item xs={3} sm={2} md={3} lg={3} xl={3} className="content">
                                <IconButton aria-label="delete"> 
                                    <DeleteIcon onClick={() => handleCartClick(e._id)} /> 
                                </IconButton>
                        </Grid>

                    </Grid>
                ))
            }
      

            </Grid>
            <Grid className={classes.cart} item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Payments />
            </Grid>

        </Grid>

        </div>
    )
}