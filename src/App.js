import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAnSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

//### CODE SPECIFIC FOR ONE TIME LOAD TO FIREBASE
// import { auth, createUserProfileDocument, AddCollectionAndDocuments } from './firebase/firebase.utils';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

//### CODE SPECIFIC FOR ONE TIME LOAD TO FIREBASE
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
  unsubsribeFromAuth = null;

  componentDidMount() {

    //### CODE SPECIFIC FOR ONE TIME LOAD TO FIREBASE
    // const { setCurrentUser, collectionsArray } = this.props;
    const { setCurrentUser } = this.props;

    this.unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      
      setCurrentUser(userAuth);

      //### CODE SPECIFIC FOR ONE TIME LOAD TO FIREBASE
      // AddCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
    })
  }

  componentWillUnmount() {
    this.unsubsribeFromAuth();
  }

  render() {
    return (
      <div>
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route 
              exact 
              path='/signin' 
              render={() => 
                this.props.currentUser ? (
                  <Redirect to='/' />
                ) : (
                  <SignInAnSignUpPage />
                )
              } 
            />
          </Switch>
      </div>
    );
  }
}

//### CODE SPECIFIC FOR ONE TIME LOAD TO FIREBASE
// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   collectionsArray: selectCollectionsForPreview
// });

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});


const mapDispatchtoProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchtoProps)(App);
