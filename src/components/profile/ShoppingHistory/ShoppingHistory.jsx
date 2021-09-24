import React, { useEffect } from 'react'
import Sidebar from '../../Sidebar/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Box, Button, Checkbox, Grid } from '@material-ui/core'
import getShoppingHistoryDB from '../../../actions/shoppingHistory/getShoppingHistoryDB';
import { getNFTs } from '../../../actions/getNFTs';
import Cookies from 'js-cookie'
import { identifyById } from '../../../actions/functionIdentifyId'

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
    },
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
    }

})


function ShoppingHistory() {
    const classes = useStyle()
    const dispatch = useDispatch();
    const userToken = Cookies.get('token');

    useEffect(() => {
        if (userToken) {
            dispatch(getNFTs())
            dispatch(getShoppingHistoryDB({ user: userToken }))
        }
    }, [dispatch]);

    const shoppingHistoryDB = useSelector(state => state.shoppingHistoryDB)
    const allNfts = useSelector(state => state.allNFTs)
    // const nftsPurchase = identifyById(allNfts,shoppingHistoryDB)
    return (
        <div>
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
                    <h1>Shopping History</h1>
                    <Grid container>
                        <Grid className={classes.titles} item xs={12} sm={12} md={8} lg={8} xl={8}>

                            <Grid className={classes.data} marginLeft="20px" item xs={12} sm={12} md={12} lg={12} xl={12}>

                                <Grid item xs={0} sm={0} md={3} lg={3} xl={3} className="content">
                                    <Typography color="white" variant='h6'>Name</Typography>
                                </Grid>

                                <Grid item xs={0} sm={0} md={3} lg={3} xl={3} className="content">
                                    <Typography color="white" variant='h6'>Owner</Typography>
                                </Grid>

                                <Grid item xs={4} sm={0} md={4} lg={3} xl={3} className="content">
                                    <Typography color="white" variant='h6'>Products</Typography>
                                </Grid>

                                <Grid item xs={4} sm={0} md={1} lg={3} xl={3} className="content">
                                    <Typography color="white" variant='h6'>Price</Typography>
                                </Grid>

                            </Grid>

                    {
                        shoppingHistoryDB?.map(e => (

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

                                <Grid item xs={3} sm={2} md={3} lg={3} xl={3} className="content">
                                    <Typography variant='subtitle1'>{e ? e.price : null}</Typography>
                                </Grid >

                            </Grid>
                        ))
                    }
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ShoppingHistory
