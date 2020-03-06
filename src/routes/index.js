import React from 'react';
import { Route, withRouter, Switch,Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import Home from './home';

import styles from './styles.scss';

const MainApp = ({ match }) => {

	return (
    <div className={styles.root}>
      <div className={styles.main}>
        <Switch>
          <Route path={`${match.url}/`} component={Home} />
          <Redirect to="/error" />
        </Switch>
      </div>
    </div>
  );
};

MainApp.propTypes = {
	match: PropTypes.object,
};

export default withRouter(MainApp);
