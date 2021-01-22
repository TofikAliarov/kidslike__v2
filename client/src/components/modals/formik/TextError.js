import React from 'react'
import styles from './Formik.module.css'

export function TextErrorSmall(props) {
    return (
        <div
            style={{ width:"150px", height:"35px", top:"75px", right:"50%", zIndex:"5"}}
            className={styles.arrowBox}
        >
            <p className={styles.authText}>{ props.children}</p>
        </div>
    )
}

export function TextError(props) {
    return (
        <div
            style={{ width: "230px", height: "35px", top: "75px", right: "0", zIndex: "5" }}
            className={styles.arrowBox}
        >
            <p className={styles.authText}>{props.children}</p>
        </div>
    )
}