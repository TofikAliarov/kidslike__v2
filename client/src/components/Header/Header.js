import React from 'react';
import styles from './Header.module.css';

export default function Header({ children, privatePage }) {
  return (
    <header className={privatePage ? styles.header : styles.headerPrivate}>
      {children}
    </header>
  );
}
