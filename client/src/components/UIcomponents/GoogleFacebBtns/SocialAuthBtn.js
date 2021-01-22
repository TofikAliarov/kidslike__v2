import React from 'react'
import styles from './SocialAuthBth.module.css'

export const SocialAuthBtn = ({name, handleClick, facebook, google})=> {
  const inputClasses = [styles.btn];
  if(facebook) inputClasses.push(styles.facebook)
  if(google) inputClasses.push(styles.google)

return <button 
className={inputClasses.join(' ')} 
onClick={handleClick}
>{name}</button>
}