import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../assets/routes';
import { connect } from 'react-redux';

const Navigation = ({ authUser }) =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

 const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

 const NavigationNonAuth = () =>
  <div>
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);

