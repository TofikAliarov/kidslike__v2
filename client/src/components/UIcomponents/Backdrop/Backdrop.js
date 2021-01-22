import React from 'react';

import styles from './Backdrop.module.css'

export default function Backdrop({ handleClick }) {
    return (
        <div className={styles.backdrop} onClick={handleClick}></div>
    )
}
