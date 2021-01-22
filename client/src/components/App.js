import React, { Component, Suspense } from 'react';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';
import routes from '../routes';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { CustomLoader } from './UIcomponents/CustomLoader/CustomLoader';
import Header from './Header/Header';
import Logo from './Logo/Logo';
import UserInfo from './UserInfo/UserInfo';
import Navigation from './Navigation/Navigation';
import Layout from './Layout/Layout';
import { connect } from 'react-redux';
import authSelectors from '../redux/auth/authSelectors';
import userOperation from '../redux/user/userOperation';
import { setToken } from '../redux/auth/authOperations';

import axios from 'axios';
import Background from './Background/Background';
axios.defaults.baseURL = `http://kidslike-v2.top/`;

class App extends Component {
  /*
   *temporary state for leftSideBar.
   */
  state = {
    family: false,
  };
  /*
   *temporary method for leftSideBar.
   */
  familyRender = () => {
    this.setState({ family: !this.state.family });
  };
  familyRenderAnotherLinks = () => {
    this.setState({ family: false });
  };

  componentDidMount() {
    setToken(this.props.isAuthenticated);
    // this.props.onGetUserInfo();
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <BrowserRouter>
        <Background>
          <Header privatePage={isAuthenticated}>
            <Logo privatePage={isAuthenticated} />
            {isAuthenticated && (
              <Navigation
                familyRender={this.familyRender}
                familyRenderAnotherLinks={this.familyRenderAnotherLinks}
                family={this.state.family}
              />
            )}
            {isAuthenticated && <UserInfo />}
          </Header>
          <Layout>
            <Suspense fallback={<CustomLoader />}>
              <Switch>
                {routes.map(route =>
                  route.private ? (
                    <PrivateRoute
                      key={route.label}
                      {...route}
                      family={this.state.family}
                      familyRenderAnotherLinks={this.familyRenderAnotherLinks}
                    />
                  ) : (
                    <PublicRoute key={route.label} {...route} />
                  ),
                )}
                {/* <Route component={NotFound} /> */}
                <Redirect to="/home" />
              </Switch>
            </Suspense>
          </Layout>
        </Background>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
});

export default connect(mapStateToProps)(App);

// export default App;
