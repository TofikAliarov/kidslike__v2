import React, { useState, useEffect } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import { useSelector, useDispatch } from 'react-redux';
import operationCildrens from '../../redux/children/childrenOperations';
import operationTasks from '../../redux/tasks/taskOperations';
import styles from './ChildTaskPage.module.css';
import transitionStyles from '../HabitsList/transitionStyles.module.css';
import Button from '../UIcomponents/Button/Button';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import boy from '../../img/avatars/boy.png';
import girl from '../../img/avatars/girl.png';
import MoreButton from '../UIcomponents/MoreButton/MoreButton';

export default function ChildTaskPage() {
  const [tasksDrow, settasksDrow] = useState([]);
  const tasks = useSelector(state => state.tasks.userTasks);
  const children = useSelector(state => state.children.userChildrens);
  // let filteredData = tasksDrow.sort(sortFunc('updatedAt'));
  // console.log(tasksDrow);
  const dispatch = useDispatch();
  const childId = window.location.href.slice(
    window.location.href.lastIndexOf('/') + 1,
  );

  // const sortFunc = fichildd => {
  //   return (a, b) => (a[fichildd] < b[fichildd] ? 1 : -1);
  // };

  // const showMore = () => {
  //   settasksDrow(
  //     tasks.filter(child => child.childId === childId).sort(sortFunc('updatedAt')),
  //   );
  // };

  useEffect(() => {
    dispatch(operationCildrens.getAllChildren());
  }, []);

  useEffect(() => {
    dispatch(operationTasks.getAllTasks());
  }, []);

  // useEffect(
  //   () => {
  //     const filterd = tasks
  //       .filter(child => child.childId === childId)
  //       .sort(sortFunc('updatedAt'))
  //       .slice(0, 4);
  //     settasksDrow(filterd);
  //   },
  //   [childId],
  //   [tasks],
  // );

  return (
    <div className={styles.listHolder}>
      {children.map(
        child =>
          child._id === childId && (
            <div>
              <div className={styles.gifsTitleContainer}>
                <div className={styles.giftIcon}>
                  <img
                    className={styles.leftSideBarAvatar}
                    src={
                      child.gender
                        ? child.gender === 'male'
                          ? boy
                          : girl
                        : boy
                    }
                    alt="avatar"
                  />
                </div>
                <h1 className={styles.giftTitle}>{child.name}</h1>
              </div>
            </div>
          ),
      )}
      <TransitionGroup component="ul" className={styles.HabitList}>
        {tasks.map(
          task =>
            task.childId === childId &&
            task.isCompleted !== 'inProgress' && (
              <CSSTransition
                in={task}
                key={tasks._id}
                timeout={250}
                classNames={transitionStyles}
                // unmountOnExit
              >
                <li
                  key={task._id}
                  className={styles.HabitItem}
                  style={
                    task.isCompleted === 'true'
                      ? { border: '1px solid rgb(126, 242, 157)' }
                      : { border: '1px solid rgb(235, 162, 185)' }
                  }
                >
                  <MoreButton type={'task'} data={task} />
                  <TaskItem {...task} />
                </li>
              </CSSTransition>
            ),
        )}
      </TransitionGroup>

      {/* <Button
          label={'Дивитися ще'}
          type={'button'}
          white={true}
          handleClick={showMore}
        /> */}
    </div>
  );
}
