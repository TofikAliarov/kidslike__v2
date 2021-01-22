import React from 'react';
import styles from './MarkInput.module.css';

export function MarkInput({value, onChange}) {
  return (
    <label className={styles.label}>
      <p className={styles.inputName}>Бал</p>
      <input
        type="number"
        className={styles.inputMark}
        onChange={onChange}
        placeholder="__"
        value={value}
      ></input>
    </label>
  );
}
