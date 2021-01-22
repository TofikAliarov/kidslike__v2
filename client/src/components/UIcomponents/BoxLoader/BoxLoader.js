import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './BoxLoader.module.css';

export function BoxLoader() {
  return (
    <div className={styles.wrap}>
      <Loader
        type="Puff"
        color="#43d190"
        height={100}
        width={100}
        // timeout={3000} //3 secs
      />
    </div>
  );
}
