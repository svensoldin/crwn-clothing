import React, { useEffect, lazy, Suspense } from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Spinner from './components/spinner/spinner.component';
import Header from './components/header/header.component.jsx';


import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

const Homepage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const ContactPage = lazy(() => import('./pages/contact/contact.component'));

const App = ({ checkUserSession, currentUser }) => {

	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);

		return (
			<div>
				<Header />
				<Switch>
					<ErrorBoundary>
						<Suspense fallback={<Spinner />}>
							<Route exact path="/" component={Homepage} />
							<Route path="/shop" component={ShopPage} />
							<Route
								exact
								path="/signin"
								render={() =>
									currentUser ? (
										<Redirect to="/" />
									) : (
										<SignInAndSignUpPage />
									)
								}
							/>
							<Route exact path="/checkout" component={CheckoutPage} />
							<Route exact path='/contact' component={ContactPage} />		
						</Suspense>
					</ErrorBoundary>
				</Switch>
			</div>
		);
	}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
	checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
