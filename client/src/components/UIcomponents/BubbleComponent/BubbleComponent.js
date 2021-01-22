import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ChangeHabit from '../../modals/changeHabit/ChangeHabit';
import ChangeTask from '../../modals/changeTask/ChangeTask';
import habitOperations from '../../../redux/habit/habitOperations';
import operations from '../../../redux/tasks/taskOperations';
import ChangeChildren from '../../modals/changeChildren/ChangeChildren';
import childrenOperations from '../../../redux/children/childrenOperations';

import styles from './BubbleComponent.module.css';
import { deleteGift } from '../../../redux/gifts/giftOperations';
import ChangePresent from '../../modals/changePreset/ChangePresent';

export default function BubbleComponent({
  modalType,
  handleClick,
  msg,
  width,
  height,
  right,
  top,
  taskData,
  habitData,
  giftData,
  childData,
  faceBtn
}) {
  const [showModal, setShowModal] = useState(false);
  const close = () => {
    setShowModal(!showModal);
  };

  const dispatch = useDispatch();

  const deleteHabit = id => {
    dispatch(habitOperations.deleteHabit(id));
  };
  const deleteTask = id => {
    dispatch(operations.deleteTask(id));
  };
  const deletePresent = id => {
    dispatch(deleteGift(id));
  };
  const deleteChildren = id => {
    dispatch(childrenOperations.deleteChildren(id));
  };

  return msg ? (
    <div
      style={{ width: width, height: height, top: top, right: right}}
      className={styles.arrowBox}
    >
      <p className={styles.authText}>{msg}</p>
    </div>
  ) : (
    <>
      <div className={styles.reviews}>
        <div className={styles.comment}>
          <div className={styles.comment_bubble}>
            <button className={styles.optionButton} onClick={() => close()}>
              Редагувати
            </button>

            {modalType === 'habit' && (
              <button
                className={styles.optionButton}
                onClick={() => {
                  deleteHabit(habitData._id);
                  handleClick();
                }}
              >
                Видалити
              </button>
            )}
            {modalType === 'task' && (
              <button
                className={styles.optionButton}
                onClick={() => {
                  deleteTask(taskData._id);
                  handleClick();
                }}
              >
                Видалити
              </button>
            )}
            {modalType === 'gift' && (
              <button
                className={styles.optionButton}
                onClick={() => {
                  deletePresent(giftData._id);
                  handleClick();
                }}
              >
                Видалити
              </button>
            )}
            {modalType === 'child' && (
              <button
                className={styles.optionButton}
                onClick={() => {
                  deleteChildren(childData._id);
                  handleClick();
                }}
              >
                Видалити
              </button>
            )}
          </div>
        </div>
      </div>
      {modalType === 'habit' && showModal && (
        <ChangeHabit
          data={habitData}
          close={() => {
            close();
            handleClick();
          }}
        />
      )}
      {modalType === 'task' && showModal && (
        <ChangeTask
          data={taskData}
          close={() => {
            close();
            handleClick();
          }}
        />
      )}
      {modalType === 'child' && showModal && (
        <ChangeChildren
          data={childData}
          close={() => {
            close();
            handleClick();
          }}
        />
      )}
      {modalType === 'gift' && showModal && (
        <ChangePresent
          close={() => {
            close();
            handleClick();
          }}
          data={giftData}
        />
      )}
    </>
  );
}
