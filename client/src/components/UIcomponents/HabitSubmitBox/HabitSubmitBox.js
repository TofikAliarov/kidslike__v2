import React from 'react';
import { useDispatch } from 'react-redux';
import HabitCheckBtn from '../../UIcomponents/HabitCheckBtn/HabitCheckBtn';
import habitOperations from '../../../redux/habit/habitOperations';

import styles from './HabitSubmitBox.module.css';

function HabitSubmitBox({ repeat, id, date, disabled, setIsDone }) {
  const dispatch = useDispatch();
  const onClick = req_data => {
    dispatch(habitOperations.checkHabitDone(id, req_data));
  };

  return (
    <div className={styles.submitBox}>
      {repeat ? (
        <>
          <p className={styles.submitBoxTitle}>Повторити</p>
          <HabitCheckBtn
            isRepeatMark={repeat}
            handelClick={() => {}}
            label={'Підтвердити виконання'}
          />
        </>
      ) : (
        <>
          <p className={styles.submitBoxTitle}>Підтвердження</p>
          <HabitCheckBtn
            isCheckMark={true}
            handelClick={() => {
              onClick({ date, done: 'yes' });
              {
                setIsDone && setIsDone();
              }
            }}
            label={'Підтвердити виконання'}
            isDisabled={disabled}
          />
          <HabitCheckBtn
            handelClick={() => {
              onClick({ date, done: 'no' });
              {
                setIsDone && setIsDone();
              }
            }}
            label={'Підтвердити не виконання'}
            isDisabled={disabled}
          />
        </>
      )}
    </div>
  );
}

export default HabitSubmitBox;
