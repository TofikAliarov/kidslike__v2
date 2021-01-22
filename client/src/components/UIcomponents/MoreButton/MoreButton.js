import React, { useState } from 'react';
import BubbleComponent from '../BubbleComponent/BubbleComponent';
import Backdrop from '../Backdrop/Backdrop';

import styles from './MoreButton.module.css';

function MoreButton({ type, data }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const close = () => {
    setShowDropDown(!showDropDown);
  };
  const openBubble = () => {
    setShowDropDown(true);
  };
  const closeBubble = () => {
    setShowDropDown(false);
  };

  return (
    <div className={styles.drop_down_folder}>
      <button
        className={styles.btn}
        type="button"
        onClick={() => openBubble()}
      ></button>
      {showDropDown && (
        <>
          <Backdrop handleClick={() => close()} />
          <BubbleComponent
            modalType={type}
            handleClick={() => closeBubble()}
            taskData={data}
            habitData={data}
            giftData={data}
            childData={data}
          />
        </>
      )}
    </div>
  );
}

export default MoreButton;
