import React, { useState, useEffect } from 'react';
import defaultLogo from '../../img/header/userInfo.svg';
import logout from '../../img/header/logout.svg';
import style from './UserInfo.module.css';
import Logout from '../Logout/Logout';
import EditChild from '../UIcomponents/EditChild/EditChild';
import userOperation from '../../redux/user/userOperation';
import userSelector from '../../redux/user/userSelector';
import { useDispatch, useSelector } from 'react-redux';

export default function UserInfo() {
  const [showModal, setShowModal] = useState(false);
  const close = () => {
    setShowModal(false);
  };
  const srcLogo = defaultLogo;
  const dispatch = useDispatch();
  const user = useSelector(userSelector.getUser);
  useEffect(() => {
    dispatch(userOperation.getUserInfo());
  }, []);
  return (
    <div className={style.userInfoContainer}>
      <img 
        className={style.userAvatar}
        src={ user.avatarURL || srcLogo}
        alt="default logo"
      />
      <div className={style.bubbleWrap}>
        <EditChild />
      </div>
      <span className={style.userName}>{user.username}</span>

      <img
        src={logout}
        alt="logout"
        className={style.logout}
        onClick={() => setShowModal(true)}
      />

      {showModal && <Logout close={() => close()} />}
    </div>
  );
}
