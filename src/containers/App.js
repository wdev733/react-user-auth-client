import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { defaultStartPath } from 'Constants/defaultValues'

import AppLocale from '../lang';
import MainRoute from 'Routes';
import Login from 'Routes/login'
import NotFound from 'Routes/error404'


const InitialPath = ({ component: Component, ...rest, authUser }) =>
	<Route
		{...rest}
		render={props =>
			(authUser && authUser.accessToken !== '' && authUser.accessToken !== null && authUser.userId !== null)
				? <Component {...props} />
				: <Redirect
					to={{
						pathname: '/login',
						state: { from: props.location }
					}}
				/>}
	/>;

class App extends Component {
	
	render() {
		const { location, match, user, locale } = this.props;
		const currentAppLocale = AppLocale[locale];

		if (location.pathname === '/') {
			return (<Redirect to={defaultStartPath} />);
		}
		return (
				<Fragment>
					<IntlProvider
						locale={currentAppLocale.locale}
						messages={currentAppLocale.messages}
					>
						<Fragment>
							<Switch>
								<InitialPath
									path={`${match.url}home`}
									authUser={user}
									component={MainRoute}
								/>
								<Route path={`/login`} component={Login} />
								<Route path={`/error`} component={NotFound} />
								<Redirect to="/error" />
							</Switch>	
						</Fragment>
					</IntlProvider>
				</Fragment>
		);
	}
}

const mapStateToProps = ({ authUser, settings }) => {
	const { user } = authUser;
	const { locale } = settings;
	return { user, locale };
};

export default connect(mapStateToProps,{})(App);