import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import girl from '../../img//avatars/girl.png';
import boy from '../../img/avatars/boy.png';
import styles from './Gifts.module.css';
import { GiftCard } from './GiftCard';
import { getAllGifts } from '../../redux/gifts/giftOperations';
import { BoxLoader } from '../UIcomponents/BoxLoader/BoxLoader';

export function GiftList() {
  const dispatch = useDispatch();
  const gifts = useSelector(state => state.gifts.userGifts);
  const loaderGifts = useSelector(state => state.gifts.loaderGiftsList);
  const errorGifts = useSelector(state => state.gifts.errorGiftsLisr);
  const children = useSelector(state => state.children.userChildrens);
  useEffect(() => {
    dispatch(getAllGifts());
  }, [dispatch]);

  const defineGender = (gift, children) => {
    const child = children
      ? children.find(({ _id }) => _id === gift.childId)
      : null;
    if (child && child.gender) {
      return child.gender === 'male' ? boy : girl;
    }
    return boy;
  };

  // if (errorGifts) {
  //   return <div>Error! {errorGifts.message}</div>;
  // }
  if (loaderGifts) {
    return <BoxLoader />;
  }

  return (
    <div className={styles.GiftContainer}>
      <ul className={styles.GiftList}>
        {gifts.map(gift => (
          <GiftCard
            key={gift._id}
            gift={gift}
            avatar={defineGender(gift, children)}
          />
        ))}
      </ul>
    </div>
  );
}
