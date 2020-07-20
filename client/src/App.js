import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ChatPage from './pages/chatpage/chatpage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserAuth } from './redux/user/user.actions';

const App = ({ checkUserAuth, currentUser }) => {
  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route
          exact
          path='/chat'
          render={() =>
            !currentUser ? <Redirect to='/signin' /> : <ChatPage />
          }
        />
        <Route
          exact
          path='/signin'
          render={() =>
            currentUser ? <Redirect to='/chat' /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserAuth: () => dispatch(checkUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
