import React, { useState, useEffect } from 'react';
import AddChildren from './modals/addChildren/AddChildren';
import AddHabit from './modals/addHabit/AddHabit';
import AddPresent from './modals/addPresent/AddPresent';
import AddTask from './modals/addTask/AddTask';
import ChangeHabit from './modals/changeHabit/ChangeHabit';
import ChangeTask from './modals/changeTask/ChangeTask';

export const ModalTest = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const close = () => {
    setModalShow(prev => false);
  };

  const close2 = () => {
    setModalShow2(prev => false);
  };
  const close3 = () => {
    setModalShow3(false);
  };

  return (
    <>
      <button onClick={() => setModalShow(true)}>test modal</button>
      {modalShow && <AddChildren close={close} />}
      <button onClick={() => setModalShow2(true)}>test modal</button>
      {modalShow2 && <ChangeTask close={close2} />}
      <button onClick={() => setModalShow3(true)}>test gifts</button>
      {modalShow3 && <AddPresent close={close3} />}
    </>
  );
};
