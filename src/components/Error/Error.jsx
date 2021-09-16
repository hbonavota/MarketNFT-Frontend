import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Error/Error.module.css'

export default function Error() {
    return (
        <div className={style.div}>
            <h1 className={style.title}>Sorry, Page Not Found</h1>
            <Link to="/"><button className={style.btn}>Click here for go back</button></Link>
        </div>
    )
}