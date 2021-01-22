import React, { useState } from 'react';
import comingSoon from '../../../img/editChild/coming_soon_goIT.gif'
    
import styles from './EditChild.module.css';
import ChangeChildren from '../../modals/changeChildren/ChangeChildren';

export default function EditChild({ modalType, handleClick, msg, width, height, top}) {
    const [showModal, setShowModal] = useState(false);
    const close = () => {
        setShowModal(!showModal);
    };

    return (
      msg ? <div style = {{width:width,height:height,top:top}}
      className={styles.arrowBox}><p className={styles.authText}>{msg}</p></div> : 
      <>
        <div className={styles.reviews}>
          <div className={styles.comment}>
            <div className={styles.comment_bubble}>
              <button className={styles.optionButton} onClick={() => close()}>Профіль</button>
              <button className={styles.optionButton} onClick={() => close()}>Статистика</button>             
                <img
                  className={styles.comingSoon_png}
                  src={comingSoon}
                  alt="coming soon gif"
                /> 
                <span className={styles.text_bubble} >В розробці</span> 
              </div>
          </div>
        </div>
          {modalType === 'child' && showModal && <ChangeChildren close={() => { close(); handleClick() }} />}
      </>
    )
}