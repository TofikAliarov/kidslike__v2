import operations from '../../redux/tasks/taskOperations';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import boy from '../../img/avatars/boy_in_frame.png';
import girl from '../../img/avatars/girl_in_frame.png';
import TaskSubmitBox from '../UIcomponents/TaskSubmitBox/TaskSubmitBox';

import styles from './TaskItem.module.css';

export default function TaskItem({
  name,
  points,
  daysToComplete,
  childId,
  _id,
  isCompleted,
  createdAt,
}) {
  const children = useSelector(state => state.children.userChildrens);
  const currentChild = children.find(el => el._id === childId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(operations.getAllTasks());
  }, []);
function enumerate(num, dec) {
  if (num > 100) num = num % 100;
  if (num <= 20 && num >= 10) return dec[2];
  if (num > 20) num = num % 10;
  return num === 1 ? dec[0] : num > 1 && num < 5 ? dec[1] : dec[2];
}


  return (
    <div className={styles.habitItemFolder}>
      <img
        className={styles.avatar}
        src={currentChild ? (currentChild.gender === 'male' ? boy : girl) : boy}
        alt="avatar"
      />
      <div className={styles.taskContentWrapper}>
        <div className={styles.taskInfo}>
          <p className={styles.habitTitle}>{name}</p>
          <p className={styles.habitPoints}>{points}</p>
        </div>
        {daysToComplete !== 0 ? (
          <div className={styles.taskTime}>
            <p className={styles.text}>Час на виконання:</p>
            <p className={styles.days}>{daysToComplete}      
              {enumerate(daysToComplete, [' день', ' дня', ' днів'])}
            </p>
          </div>
        ) : (
          <div className={styles.taskTime}> </div>
        )}
        <TaskSubmitBox
          id={_id}
          points={points}
          childId={childId}
          isCompleted={isCompleted}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
}
