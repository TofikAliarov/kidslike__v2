import React from 'react';
import style from './InformationOnChild.module.css';
import maleImage from '../../img/infoOnChild/boy.svg';
import femaleImage from "../../img/infoOnChild/girl.svg";
import arrow from "../../img/infoOnChild/arrow.svg";

const InformationOnChild = ({male, name, balance, firstTask, costFirstTask, secondTask, costSecondTask}) => {
  return (
    <ul className={style.informItem_container}>
      <li className={style.informItem_information}>
        <div className={style.informItem_block__name}>
          <img
            src={male !== "male" ? femaleImage : maleImage}
            alt="gender"
            className={style.informItem_genderImage}
            
          />
          <p className={style.informItem_name}>{name}</p>
        </div>
        <div className={style.informItem_block__balance}>
          <p className={style.informItem_balance}>{balance}</p>
        </div>
      </li>
      <li className={style.informItem_tasks}>
        <ul className={style.informItem_list__tasks}>
          <li className={style.informItem_oneTask}>
            <p className={style.informItem_text}>{firstTask}</p>
            <p className={style.informItem_text}>+{costFirstTask}</p>
          </li>
          <li className={style.informItem_oneTask}>
            <p className={style.informItem_text}>{secondTask}</p>
            <p className={style.informItem_text}>+{costSecondTask}</p>
          </li>
        </ul>
      </li>
      <li className={style.informItem_block__link}>
        <a href={'#'} className={style.informItem_link}>
          <p className={style.informItem_linkName}>До виконаних задач</p>
          <img src={arrow} alt="arrow"></img>
        </a>
      </li>
    </ul>
  )
}

export default InformationOnChild;