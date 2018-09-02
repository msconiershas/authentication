import React, { Component } from "react"
import { render } from "react-dom"
import { Grid, Row, Col } from 'react-material-responsive-grid';

import Map from "./components/Map"
import UserLogin from "./components/UserLogin"
import UserLogout from './components/UserLogout'
import fire from './fire'
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import Toolbar from './components/Toolbar'
import * as routes from './assets/routes';
import "./styles.css"
import withAuthentication from './components/withAuthentication';


class App extends Component {
  constructor() {
    super()
    this.state = { 
      center: [0, 0], 
      authUser: null
    }

    this.authListener = this.authListener.bind(this);
  }
  changeCenter = center => () => {
    this.setState({ center })
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
    console.log(this.state.authUser)
  }


  componentWillMount() {
    console.log("counteedssdsd")
    this.authListener();
  }

  authListener() {
    this.fireBaseListener = fire.auth().onAuthStateChanged((user) => {
      if (user) {

        console.log('user changed..', user);
         this.setState({
            loading: false,  // For the loader maybe
            user, // User Details
            isAuth: true
      });
      } else {
        console.log('user does not exist')
        console.log(this.props.isEmpty)
        this.setState({
          user
        })
      }
    });
    }

  componentWillUnmount() {
     this.fireBaseListener && this.fireBaseListener();
     this.authListener = undefined;
  }
  onLogout(e) {
      fire.auth().signOut();
      
    }
  render() {
    return (
      <div>

        <div>
          <Router>
          <div id="navigation">

        <hr/>
          
          <header className="toolbar">
          <nav className="toolbar_nav">
            <div className="toolbar_logo"><Link to="/">Logo</Link></div>
            <div className="spacer" />
            <div className="toolbar_nav_items">
              <Link  to={routes.SIGN_IN}>Sign In </Link>
              <Link to={'/components/Map'}>Map </Link>
            </div>
     </nav>
   </header>

   <Route
            exact path={routes.SIGN_UP}
            component={SignUpPage}
          />
          <Route
            exact path={routes.SIGN_IN}
            component={SignInPage}
          />
          <Route
            exact path={routes.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route
            exact path={routes.HOME}
            component={HomePage}
          />
          <Route
            exact path={routes.ACCOUNT}
            component={AccountPage}
          />
          <Route exact path='/components/Map' component={Map} />
                {this.state.user ? 
                 <button id="btnLogout" className="btn btn-action" onClick={this.onLogout}>
                      Log Out
                </button>
                   : null}
          </div>
        </Router>
      </div>
      <Grid>
         <Row>
            <Col xs4={4} lg={6}>
               <p>This column consumes the entire row for extra-small,
               small, and medium screens.  For large and extra-large
               screens, it consumes half of the row.</p>
            </Col>
            <Col xs4={4} lg={6}>
               <p>This column consumes the entire row for extra-small,
               small, and medium screens.  For large and extra-large
               screens, it consumes half of the row.</p>
            </Col>
          </Row>
          <Row>
            <Col xs4={2} lg={4}>
               <p>This column consumes the entire row for extra-small,
               small, and medium screens.  For large and extra-large
               screens, it consumes half of the row.</p>
            </Col>
          </Row>
      </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.firebase.profile,
  isEmpty: state.firebase.profile.isEmpty
})

export default withAuthentication(App);
