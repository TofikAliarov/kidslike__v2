import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import boy from '../../img/avatars/boy_in_frame.png';
import girl from '../../img/avatars/girl_in_frame.png';
import HabitSubmitBox from '../UIcomponents/HabitSubmitBox/HabitSubmitBox';

import styles from './HabitItem.module.css';

function HabitItem({ name, points, childId, daysToComplete, _id }) {
  const todaysDate = new Date().toISOString().slice(0, 10);
  const children = useSelector(state => state.children.userChildrens);
  const currentChild = children.find(el => el._id === childId);
  const checkIsDoneToday = daysToComplete.find(el => el.date === todaysDate)
    .done;
  const [selectedDate, setSelectedDate] = useState(todaysDate);
  const [isDone, setIsDone] = useState(checkIsDoneToday);

  const hahdleClick = (date, value) => {
    setSelectedDate(date);
    setIsDone(value);
  };

  return (
    <div className={styles.habitItemFolder}>
      <img
        className={styles.avatar}
        src={currentChild ? (currentChild.gender === 'male' ? boy : girl) : boy}
        alt="avatar"
      ></img>
      <div className={styles.habitContentWrapper}>
        <p className={styles.habitTitle}>{name}</p>
        <ul className={styles.daysList}>
          {daysToComplete.length > 0 &&
            daysToComplete.map(el => (
              <li key={el.date}
                className={[
                  el.done === 'yes'
                    ? styles.daysItem_done
                    : el.done === 'no'
                    ? styles.daysItem_notdone
                    : styles.daysItem,
                  selectedDate === el.date
                    ? styles.daysItem_active
                    : styles.daysItem,
                ].join(' ')}
                onClick={() =>
                  hahdleClick(el.date <= todaysDate && el.date, el.done)
                }
              >
                <span
                  className={
                    el.done === null ? styles.points : styles.points_checked
                  }
                >
                  {points}
                </span>
              </li>
            ))}
        </ul>
        <p className={styles.text}>x1.5</p>
      </div>
      <HabitSubmitBox
        id={_id}
        date={selectedDate}
        disabled={isDone !== null}
        setIsDone={() => setIsDone(true)}
      />
    </div>
  );
}

export default HabitItem;
