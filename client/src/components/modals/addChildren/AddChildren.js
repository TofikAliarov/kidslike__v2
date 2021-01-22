import React, { useState } from 'react';
import childrenOperations from '../../../redux/children/childrenOperations';
import styles from './AddChildren.module.css';
import modalBackDrop from '../../modalBackDrop/ModalBackDrop';
import { createChildrenSuccess } from '../../../redux/children/childrenActions';
import { useDispatch } from 'react-redux';

const AddChildren = ({ close }) => {
  const dispatch = useDispatch();
  const [childName, setChildName] = useState('');
  const [childGender, setChildGender] = useState('');

  const handleSubmit = evt => {
    dispatch(
      childrenOperations.addChildren({
        name: childName,
        gender: childGender,
      }),
    );

    // dispatch(
    //   createChildrenSuccess({
    //     name: childName,
    //     gender: childGender,
    //   }),
    // );

    evt.preventDefault();
    close();
  };

  return (
    <>
      <div className={styles.modalBody}>
        <h2 className={styles.title}>Додавання дитини</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputBlock}>
            <label className={styles.label}>
              <p className={styles.inputName}>Ім’я дитини</p>
              <input
                className={styles.input}
                placeholder="Ім’я"
                value={childName}
                onChange={({ target: { value } }) => setChildName(value)}
              ></input>
            </label>
            <p className={styles.childrenTitle}>Оберіть стать дитини</p>
            <label className={styles.customLabel}>
              <input
                name="gender"
                type="radio"
                onChange={() => setChildGender('female')}
              />
              <span className={styles.radiobox}></span>
            </label>
            <p className={styles.customName}>дівчинка</p>
            <label className={styles.customLabel}>
              <input
                name="gender"
                type="radio"
                onChange={() => setChildGender('male')}
              />
              <span className={styles.radiobox}></span>
            </label>
            <p className={styles.customName}>хлопчик</p>
          </div>
          <div className={styles.buttonsBlock}>
            <button className={styles.buttonSave}>Зберегти</button>

            <button className={styles.buttonCancle} onClick={() => close()}>
              Відміна
            </button>
          </div>
        </form>
        <button
          onClick={() => close()}
          className={styles.modalCloseBtn}
        ></button>
      </div>
    </>
  );
};

export default modalBackDrop(AddChildren);
