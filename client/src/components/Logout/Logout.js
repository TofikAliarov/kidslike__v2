import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './logout.module.css';
import modalBackDrop from '../modalBackDrop/ModalBackDrop';
import Button from '../UIcomponents/Button/Button';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/auth/authOperations';

const { Container, Text, btn, ButtonWrapper } = styles;

const Logout = ({ close }) => {
const dispatch = useDispatch()
const handleLogout = () => {
  dispatch(logout())
}
  return (
    <>
      <div className={Container}>
        <p className={Text}>Ви впевненi що хочете вийти?</p>
        <div className={ButtonWrapper}>
          <NavLink to="/">
            <Button
              orange={true}
              type="button"
              className={btn}
              handleClick={handleLogout}
              label="Так"
            />
          </NavLink>

          <Button
            orange={true}
            type="button"
            className={btn}
            handleClick={() => close()}
            label="Hi"
          />
        </div>
      </div>
    </>
  );
};

export default modalBackDrop(Logout);
