import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UIcomponents/Button/Button';
import styles from '../components/auth/TokenVerifyView.module.css';
import axios from 'axios';

const verification = async token => {
  try {
    await axios.get(`http://kidslike-v2.top/api/auth/verify/${token}`);
    return true;
  } catch {
    return false;
  }
};

class TokenVerifyView extends Component {
  state = {
    res: '',
  };

  async componentDidMount() {
    const { verificationToken } = this.props.match.params;
    const temp = await verification(verificationToken);
    this.setState({ res: temp });
  }

  render() {
    return (
      <>
        <div className={styles.container}>
          {!this.state.res && (
            <>
              <p>Пошта вже підтверджена. Виконайте вхід в додаток.</p>
              <Link to={'/login'}>
                <Button orange label="до діЇ" type="button"></Button>
              </Link>
            </>
          )}
          {this.state.res && (
            <>
              <p className={styles.text}>Ваша пошта успішно підтверджена</p>
              <Link to={'/login'}>
                <Button
                  orange
                  label="Виконати вхід в додаток"
                  type="button"
                ></Button>
              </Link>
            </>
          )}
        </div>
      </>
    );
  }
}

export default TokenVerifyView;
