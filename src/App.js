import React, { Component } from 'react';
import './App.css';
import { 
  Router,
  Route,
  Redirect,
  withRouter
} from 'react-router'
import  { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'

import Modal from 'react-responsive-modal';
import Home from './components/home';
import Profile from './components/profile';
import { Hangman } from './components/hangman';
import Signup from './components/signup';
import Login from './components/login';
import { Api } from './utils/Api';
import { fonts } from './theme';
import { authenticate, logoutUser } from './utils/action';

const history = createBrowserHistory()

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.user
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

class App extends Component {
  state = {open: false, user: null, modalType: "signup"}

  async componentDidMount() {
    const userId = localStorage.getItem("userId")
    if (userId) {
      this.props.dispatchAuthenticate(userId);
    }
    else this.onOpenModal();
}

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onModalSwitch = (modalType) => {
    this.setState({modalType})
  }

  render() {
    let { open, modalType } = this.state;
    const { user } = this.props.auth;

    return (
      <Router history={history}>
        <div className="App">
          <header className="App-navbar">
            <Link to="/" replace>
              <img className="App-logo" src={require("./hangman.png")} />
            </Link>
            {user ? 
              <div className="nav-links">
                <Link to="/profile" className="link" replace>
                  <h4>Profile</h4>
                </Link>
                <h4 className="link" onClick={this.props.dispatchLogout}>Logout</h4>
              </div>
              :
              <div className="nav-links">
                <h4 className="link" onClick={() => {this.setState({modalType: "signup"});this.onOpenModal()}}>Signup</h4>
                <h4 className="link" onClick={() => {this.setState({modalType: "login"});this.onOpenModal()}}>Login</h4>
              </div>
            }
          </header>
          <Route exact path="/" component={Home}/>
          <PrivateRoute path="/profile" user={user} component={Profile}/>
          <Modal open={open} onClose={this.onCloseModal}>
            {modalType === "signup" ? <Signup onClose={this.onCloseModal} onModalSwitch={this.onModalSwitch} /> : <Login onClose={this.onCloseModal} onModalSwitch={this.onModalSwitch} />}
          </Modal>
        </div>
      </Router>
        
    );
  }
}

const styles = {
  modal: {
    width: 400,
    height: 400
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  dispatchAuthenticate: (userId) => authenticate(userId),
  dispatchLogout: () => logoutUser()
}

export default connect(mapStateToProps, mapDispatchToProps)(App)