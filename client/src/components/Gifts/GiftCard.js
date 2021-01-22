import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Gifts.module.css';
import MoreButton from '../UIcomponents/MoreButton/MoreButton';
import { buyGift } from '../../redux/gifts/giftOperations';
import { getAllChildren } from '../../redux/children/childrenSelector';

export function GiftCard({ gift, avatar }) {
  const dispatch = useDispatch();
  const { childId, price, _id } = gift;
  const children = useSelector(getAllChildren);
  const [status, setStatus] = useState('');

  const child = children.find(child => child._id === childId);

  const handleClick = () => {
    if (child.points >= price) {
      const purchaseData = { id: _id, childId, price };
      dispatch(buyGift(purchaseData));
      setStatus('Придбано');
    }
  };

  return (
    <li className={styles.giftCard}>
      <div className={styles.moreBtnFolder}>
        <MoreButton type={'gift'} data={gift} />
      </div>
      <div className={styles.giftAvatarContainer}>
        <img className={styles.giftAvatar} src={avatar} alt="avatar" />
      </div>
      <div className={styles.giftImageThumb}>
        <img className={styles.giftImage} src={gift.imageUrl} alt={gift.name} />
      </div>
      <div className={styles.infoBlock}>
        <div className={styles.giftInfo}>
          <h2 className={styles.giftName}>{gift.name}</h2>
          <div>
            <div className={styles.star}>
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
                  fill="#FF8626"
                />
              </svg>
            </div>
            <span className={styles.price}>{price}</span>
          </div>
        </div>
          {child && child.points >= price && status !== 'Придбано' && (
            <button onClick={handleClick} className={styles.giftButton}>
              Придбати
            </button>
          )}
          {((child && child.points < price) && status !== 'Придбано') && (
            <p className={styles.giftStatus}>Недоступно</p>
          )}
          {status === 'Придбано' && (
            <p className={styles.giftStatus}>Придбано</p>
          )}
      </div>
    </li>
  );
}
