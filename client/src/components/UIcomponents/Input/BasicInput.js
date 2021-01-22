import React from 'react'
import styles from './BasicInput.module.css'

export const BasicInput = ({
  reg,
  lastchild,
  forLabel,
  id,
  labelText,
  value,
  name,
  handleChange,
  placeholder,
  labelWidth,
  type,
  styleValidate
}) => 
{
  const inputClasses = [styles.input];

  if(styleValidate)inputClasses.push(styles.invalid);
  if(lastchild) inputClasses.push(styles.lastChild);

  return (
    <div className={styles.inputBlock}>
      <label
        htmlFor={forLabel}
        className={styles.label}
        style={{ width: labelWidth }}
      >
        {labelText}
      </label>
      <input
        ref={reg}
        type={type}
        id={id}
        className={inputClasses.join(' ')}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}