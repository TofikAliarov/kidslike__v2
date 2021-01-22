import React from 'react'
import styles from './MainBlock.module.css'
import img from './authMain.png'

export const MainBlock = () => {
  
  return(
    <div className={styles.rightbar}>
      <p className={styles.title}>Мотивуйте дитину вдосконалювати себе!</p>
      <div className={styles.imgBlock}>
        <img className={styles.img} src={img} alt='Mini view of our application'></img>
      </div>
    </div>
  )

}