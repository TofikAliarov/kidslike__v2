import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ChangeChildren.module.css';
import modalBackDrop from '../../modalBackDrop/ModalBackDrop';
import childOperations from '../../../redux/children/childrenOperations';

const ChangeChildren = ({ close, data }) => {
  const dispatch = useDispatch();

  const [childName, setChildName] = useState(data.name);
  const [childGender, setChildGender] = useState(data.gender);
  const handleSubmit = evt => {
    dispatch(
      childOperations.updateChildren(
        {
          name: childName,
          gender: childGender,
        },
        data._id,
      ),
    );
    evt.preventDefault();
    close();
  };

  const handleDelete = () => {
    dispatch(childOperations.deleteChildren(data._id));
    close();
  };

  const defGender = data.gender === 'male' ? true : false;

  return (
    <>
      <div className={styles.modalBody}>
        <h2 className={styles.title}>Редагування дитини</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputBlock}>
            <label className={styles.label}>
              <p className={styles.inputName}>Ім’я дитини</p>
              <input
                defaultValue={data.name}
                className={styles.input}
                placeholder="Ім’я"
                onChange={({ target: { value } }) => setChildName(value)}
              ></input>
            </label>
            <p className={styles.childrenTitle}>Оберіть стать дитини</p>
            <label className={styles.customLabel}>
              <input
                // defaultValue={defGender}
                defaultChecked={!defGender}
                name="gender"
                type="radio"
                onChange={() => setChildGender('female')}
              />
              <span className={styles.radiobox}></span>
            </label>
            <p className={styles.customName}>дівчинка</p>
            <label className={styles.customLabel}>
              <input
                defaultChecked={defGender}
                name="gender"
                type="radio"
                onChange={() => setChildGender('male')}
              />
              <span className={styles.radiobox}></span>
            </label>
            <p className={styles.customName}>хлопчик</p>

            <button className={styles.btnDelete} onClick={() => handleDelete()}>
              <span className={styles.btnDeleteIcon}></span> Видалити дитину
            </button>
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

export default modalBackDrop(ChangeChildren);
