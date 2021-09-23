import React from "react";
import { makeStyles } from "@material-ui/core";
import blueligth from "../images/blueligth.jpg"
import Contact from "../contact/contact"

const useStyles = makeStyles(theme => ({
    footer: {
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: "200px",
        marginTop: "5rem",
        bottom: "0px"
    }
}))

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer} >
            <img width="400px" height="200px" src={blueligth} alt="" />
        </footer>

    )

}