import React from "react";
import { makeStyles } from "@material-ui/core";
import blueligth from "../images/blueligth.jpg"
// import Contact from "../contact/contact"
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Hidden } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
    footer: {
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: "200px",
        marginTop: "5rem",
        bottom: "0px",
        [theme.breakpoints.down(600)]: 
        {
            width: "100%",
        }
    },
    mainContainer: {
        position: "absolute"
    },
    link: {
        color: "white",
        fontFamily: "Arial",
        fontSize: "0.75rem",
        fontWeight: "bold",
        textDecoration: "none"
    },
    link2: {
        color: "white",
        fontFamily: "Arial",
        fontSize: "1rem",
        marginTop: "5rem",
        fontWeight: "bold",
        textDecoration: "none"
    },
    item: {
        margin: "3em"
    }
}))

export default function Footer() {
    const classes = useStyles();
    const userLogged = useSelector((state) => state.userLogged)

    return (
        <footer className={classes.footer} >
          
            <Grid container justifyContent="center" className={classes.mainContainer}>
            <Hidden smDown>
            <Grid item className={classes.item}>
                <Grid container direction="column" spacing={2}>
                <Grid item className={classes.link} component={Link} to="/">Home</Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.item}>
                <Grid container direction="column" spacing={2}>
                <Grid item className={classes.link} component={Link} to="/categories">Categories</Grid>
                <Grid item className={classes.link} component={Link} to="/categories/all">All NFTs</Grid>
                <Grid item className={classes.link} component={Link} to="/categories">Navigate Through Categories</Grid>
                <Grid item className={classes.link}></Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.item}>
                <Grid container direction="column" spacing={2}>
                <Grid item className={classes.link}component={Link} to="/contact">Contact</Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.item}>
                <Grid container direction="column" spacing={2}>
                <Grid item className={classes.link}component={Link} to="/about">About us</Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.item}>
                <Grid container direction="column" spacing={2}>
                <Grid item className={classes.link} component={Link} to={userLogged?"/profile/configuration":"/login"}>My Account</Grid>
                <Grid item className={classes.link} component={Link} to={userLogged?"/profile":"/login"}>Profile</Grid>
                <Grid item className={classes.link} component={Link} to={userLogged?"profile/createNFT":"/login"}>Create NFT</Grid>
                <Grid item className={classes.link}component={Link} to={userLogged?"/favorites":"/login"}>Favorites</Grid>
                </Grid>
            </Grid>
            </Hidden>
            <Hidden mdUp>
            <Grid item className={classes.link2}>All rights reserved by © NFT MARKET</Grid>
            </Hidden>
            </Grid>
           
           
            
            <img className={classes.image} width="300em" height="200px" src={blueligth} alt="" />
        </footer>

    )

}