import React from 'react';
import styles from './CustomSelect.module.css';


export const CustomSelect = ({
  id,
  value,
  name,
  handleChange,
  labelText,
  onBlur,
  options
}) => {
  
  // {/* не стилизируются options, но если использовать материал или подобное, то не будет по факту самого селекта */}
  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {labelText}
      </label>
      <div className={styles.select}>
        <select 
        name={name}
        id={id} 
        onChange={handleChange} 
        onBlur={onBlur} 
        value={value}>
          <option value="Оберіть дитину" disabled>
            Оберіть дитину
          </option>
          {options.map(child => <option key={child._id} className={styles.option} value={child._id}>{child.name}</option>)}
        </select>
      </div>
    </div>
  );
};
