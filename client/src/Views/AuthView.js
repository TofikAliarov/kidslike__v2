import React, { Component } from 'react';
import {AuthBlock} from '../components/auth/AuthBlock/AuthBlock';
import { MainBlock } from '../components/auth/MainBlock/MainBlock';
import styles from '../components/auth/AuthView.module.css'

export default class AuthView extends Component {
  state = {path: this.props.location.pathname};

  
  render() {
    return <>
    <div className={styles.container}>
      <MainBlock/>
      {this.state.path === '/registration' ? 
      <AuthBlock flag='register' name='Реєстрація'/> :
      <AuthBlock flag='login' name='Вхід'/>
      }
    </div>
    </>
  }
}
