import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import operations from '../../../redux/tasks/taskOperations';

import styles from './HabitSubmitBox.module.css';

function TaskSubmitBox({ id, childId, createdAt, isCompleted }) {
  const today = Date.now();
  const parsedDate = new Date(today).toISOString();
  const dispatch = useDispatch();
  const handleCompleteAction = () => {
    dispatch(
      operations.changeTasksStatus(
        {
          isCompleted: 'true',
          childId: childId,
        },
        id,
      ),
    );
  };
  const handleFailAction = () => {
    dispatch(
      operations.changeTasksStatus(
        {
          isCompleted: 'false',
        },
        id,
      ),
    );
  };

  const handleRepeatAction = () => {
    dispatch(
      operations.changeTasksStatus(
        {
          isCompleted: 'inProgress',
          childId: childId,
          createdAt: parsedDate,
        },
        id,
      ),
    );
  };

  return (
    <div className={styles.submitBox}>
      {isCompleted !== 'inProgress' ? (
        <div>
          <p className={styles.submitBoxTitle}>Повторити</p>
          <button
            className={styles.repeatBtn}
            onClick={handleRepeatAction}
            label={'Повторить'}
          />
        </div>
      ) : (
        <div>
          <p className={styles.submitBoxTitle}>Підтвердження</p>
          <button
            className={styles.checkBtn}
            onClick={handleCompleteAction}
            label={'Підтвердити виконання'}
          ></button>
          <button
            className={styles.crossBtn}
            onClick={handleFailAction}
            label={'Підтвердити не виконання'}
          />
        </div>
      )}
    </div>
  );
}
export default TaskSubmitBox;
