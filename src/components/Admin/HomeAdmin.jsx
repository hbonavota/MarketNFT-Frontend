import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { makeStyles } from "@material-ui/core/styles";
import {Grid,Paper, Typography } from '@mui/material'
import Footer from '../footer/footer';

const useStyles = makeStyles({
maincontainer: {
    marginTop: "100px",
    maxWidth: "450px",
    height: "30vh",
    marginBottom: "80px"
},
root: {
    marginTop: "100px"
},
})

export default function HomeAdmin() {
    const classes = useStyles()
    return (
        <div>
        <Grid justifyContent="center" container className={classes.root}> 
            <Grid component={Paper} spacing={2} elevation={5} alignItems="center" direction="column"  container className={classes.maincontainer}>
                <Grid item className={classes.item} spacing={2}>
                <Typography variant="h5">Welcome to the Admin Section</Typography>
                </Grid>
                <Grid item className={classes.item}>
                <Typography variant="body">Here you can Select the area that you would like to edit</Typography>
                </Grid>
                <Grid item className={classes.item}>
                <Link style={{ textDecoration: "none" }} to='admin/users'><Button variant='outlined' color="primary" size='large' >Users</Button></Link>
                <Link style={{ textDecoration: "none" }} to='admin/nfts'> <Button variant='outlined' color="primary" size='large' >Nfts</Button></Link>
                <Link style={{ textDecoration: "none" }} to='admin/category'><Button variant='outlined' color="primary" size='large' >Categories</Button></Link>
                </Grid>
            </Grid>
        </Grid>
        <Footer></Footer>
        </div>
    )
}
