import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthPage.module.css';
const {
  container,
menu,
  main,
  title,
 description,
  btn,
  btn__signIn,
  btn__signOut,
  picture
} = styles;

function AuthPage() {
  return (
    <div className={container}>
      <section className={menu}>
        <div>
          <div className={main}>
            <h2 className={title}>
              Мотивуйте дитину вдосконалювати себе!
            </h2>
            <p className={description}>
              Вкажіть звички та задачі, які буде виконувати ваша дитина
              (наприклад читати 20 сторінок книжки в день), мотивуйте
              подарунками виконувати їх і очікуйте результату!
            </p>
            <div className={btn}>
              <Link className={btn__signIn} to={'/login'}>
                Вхід
              </Link>
              <Link className={btn__signOut} to={'/registration'}>
                Зареєструватися
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className={picture}>
  
      </section>
    </div>
  );
}

export default AuthPage;
