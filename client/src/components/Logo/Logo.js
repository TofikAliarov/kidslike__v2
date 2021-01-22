import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../img/header/logo.svg';
import logoPrivate from '../../img/header/logoPrivate.svg';
import styles from './Logo.module.css';

export default function Logo({ privatePage }) {
    return (
        <>
            <div className={styles.logoContainer}>
                <NavLink to="/home">
                    <img
                        className={styles.siteLogo}
                        src={privatePage ? logoPrivate : logo}
                        alt="logo"
                    />
                </NavLink>
                {
                    <span
                        className={privatePage ? styles.logoText : styles.logoTextLogin}
                    >
                        <span className={privatePage ? styles.bold : styles.boldLogin}>
                            Kidslike&nbsp;
            </span>
            v2
          </span>
                }
            </div>
        </>
    );
}
