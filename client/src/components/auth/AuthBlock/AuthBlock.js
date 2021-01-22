import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import styles from './AuthBlock.module.css';
import { LoginForm } from '../../LoginForm/LoginForm';
import { RegisterForm } from '../../RegisterForm/RegisterForm';
import { SocialAuthBtn } from '../../UIcomponents/GoogleFacebBtns/SocialAuthBtn';
import {
  getAccessTokenFromCode,
  getGoogleUserInfo,
  googleLoginUrl,
} from '../../../helpers/googleLogin';
import BubbleComponent from '../../UIcomponents/BubbleComponent/BubbleComponent';
import { googleAuth } from '../../../redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import {
  facebookLoginUrl,
  getAccessTokenFacebook,
  getFacebookUserData,
} from '../../../helpers/facebookLogin';

export const AuthBlock = ({ flag, name }) => {
  const [openBubbleGoogle, setOpenBubbleGoogle] = useState(false);
  const [openBubbleFacebook, setOpenBubbleFacebook] = useState(false);
  const dispatch = useDispatch();

  const loginWithGoogle = () => {
    // setOpenBubbleGoogle(!openBubbleGoogle)
    // setTimeout(() => setOpenBubbleGoogle(false), 3000);
  };

  const loginWithFacebook = () => {
    setOpenBubbleFacebook(!openBubbleFacebook);
    setTimeout(() => setOpenBubbleFacebook(false), 3000);
  };

  const getAllDataFromGoogle = async code => {
    const access_token = await getAccessTokenFromCode(code);
    return await getGoogleUserInfo(access_token);
  };
  const getAllDataFromFacebook = async code => {
    const access_token = await getAccessTokenFacebook(code);
    return await getFacebookUserData(access_token);
  };

  const urlParams = queryString.parse(window.location.search);
  if (urlParams.error) {
    console.log(`An error occurred: ${urlParams.error}`);
  } else if (urlParams.code) {
    // getAccessTokenFacebook(urlParams.code)
    // getFacebookUserData(urlParams.code)
    const dataUser = getAllDataFromGoogle(urlParams.code);
    dataUser.then(data => dispatch(googleAuth(data)));
    // const dataUser = getAllDataFromFacebook(urlParams.code);
    // console.log(dataUser);
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>{name}</p>
      {flag === 'login' ? <LoginForm /> : <RegisterForm />}
      <a href={googleLoginUrl}>
        {' '}
        <SocialAuthBtn
          name="Увійти за допомогою Google"
          google
          handleClick={loginWithGoogle}
        />
      </a>
      {/* <a href={facebookLoginUrl}> <SocialAuthBtn name='Увійти за допомогою Facebook' facebook handleClick={loginWithFacebook}/></a> */}
      {/* <SocialAuthBtn name='Увійти за допомогою Google' google handleClick={loginWithGoogle}/> */}
      <div className={styles.socialBlockBtn}>
      <SocialAuthBtn
        name="Увійти за допомогою Facebook"
        facebook
        handleClick={loginWithFacebook}
        
      />
      {openBubbleFacebook && (
        <BubbleComponent
          msg="Ми працюємо над цим =)"
          width="150px"
          height="35px"
          top="38px"
          right="125px"
        />
      )}
      </div>
      {openBubbleGoogle && (
        <BubbleComponent
          msg="Ми працюємо над цим =)"
          width="150px"
          height="35px"
          top="400px"
          right="180px"
        />
      )}
      {flag === 'login' ? (
        <p className={styles.authText}>
          {' '}
          Немає аккаунту?{' '}
          <Link className={styles.authLink} to="/registration">
            Зареєструватись
          </Link>{' '}
        </p>
      ) : (
        <p className={styles.authText}>
          {' '}
          Уже є аккаунт?{' '}
          <Link className={styles.authLink} to="/login">
            Увійти
          </Link>{' '}
        </p>
      )}
    </div>
  );
};
