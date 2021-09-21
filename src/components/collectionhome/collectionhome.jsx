import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTs } from "../../actions/getNFTs.js";
import style from "../collectionhome/collectionhome.module.css";
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Link } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles';


export default function ColectionHome() {

    const stateAllNFTs = useSelector((state) => state.allNFTs);
    const selected = stateAllNFTs.slice(14, 20)
    const dispatch = useDispatch();
    const theme = useTheme();
    const fullsize = useMediaQuery(theme.breakpoints.up(1220));
    const size1115 = useMediaQuery(theme.breakpoints.between(1115, 1220));
    const size1010 = useMediaQuery(theme.breakpoints.between(1010, 1115));
    const size900 = useMediaQuery(theme.breakpoints.between(900, 1010));
    const size450 = useMediaQuery(theme.breakpoints.down(899))

    useEffect(() => {
        dispatch(getNFTs());
    }, [dispatch]);


    return (
        <div className={style.houselists}>
            {stateAllNFTs.length > 0 && fullsize ? (

                stateAllNFTs.slice(14, 20).map((ele) => (
                    <Link to={`nft/${ele._id}`} style={{ textDecoration: "none" }}>
                        <div className={style.house} >

                            <img src={ele.image} className={style.image} />

                            <div class={style.house_name}>{ele.name.slice(0, 17)}</div>

                        </div>
                    </Link>


                ))
            ) : null}
            {stateAllNFTs.length > 0 && size1115 ? (

                stateAllNFTs.slice(14, 19).map((ele) => (
                    <Link to={`nft/${ele._id}`} style={{ textDecoration: "none" }}>
                        <div className={style.house} >

                            <img src={ele.image} className={style.image} />

                            <div class={style.house_name}>{ele.name.slice(0, 17)}</div>

                        </div>
                    </Link>


                ))
            ) : null}
            {stateAllNFTs.length > 0 && size1010 ? (

                stateAllNFTs.slice(14, 18).map((ele) => (
                    <Link to={`nft/${ele._id}`} style={{ textDecoration: "none" }}>
                        <div className={style.house} >

                            <img src={ele.image} className={style.image} />

                            <div class={style.house_name}>{ele.name.slice(0, 17)}</div>

                        </div>
                    </Link>


                ))
            ) : null}
            {stateAllNFTs.length > 0 && size900 ? (

                stateAllNFTs.slice(14, 17).map((ele) => (
                    <Link to={`nft/${ele._id}`} style={{ textDecoration: "none" }}>
                        <div className={style.house} >

                            <img src={ele.image} className={style.image} />

                            <div className={style.house_name}>{ele.name.slice(0, 17)}</div>

                        </div>
                    </Link>


                ))
            ) : null}
            {stateAllNFTs.length > 0 && size450 ? (
                <Link to={`nft/${stateAllNFTs[15]._id}`} style={{ textDecoration: "none" }}>
                    <div className={style.imagecontainer}>

                        <img src={stateAllNFTs[15].image} className={style.imagesmall} />

                        <div className={style.name}> {stateAllNFTs[15].name.slice(0, 17)}</div>

                    </div>
                </Link>
            ) : null}
        </div>
    )
}