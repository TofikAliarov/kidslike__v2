// created by Elena

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';
import { LoaderSmall } from '../LoaderSmall/LoaderSmall';

export default function Button({
  handleClick,
  label,
  type,
  orange,
  transparent,
  white,
  bordered,
  disabled,
  loading,
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={handleClick}
      className={
        orange
          ? styles.ButtonOrange
          : transparent
          ? styles.ButtonTransparent
          : white
          ? styles.ButtonWhite
          : bordered
          ? styles.ButtonBordered
          : styles.ButtonGrey
      }
    >
      {loading ? <LoaderSmall /> : <span>{label}</span>}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  orange: PropTypes.bool,
  disabled: PropTypes.bool,
};
