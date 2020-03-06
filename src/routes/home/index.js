import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";

import { logoutUser } from "Redux/actions";

import styles from './styles.scss';

class Home extends Component {
  
  handleLogOut = e => {
    e.preventDefault();

    this.props.logoutUser();
  };

  render() {
    return (
      <div className={styles.root}>
        <h1>You are logged in.</h1>
        <div className={styles.logout}>
          <Button variant="contained" color="primary" onClick={e => this.handleLogOut(e)}>
            Log out
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, { logoutUser })(Home)
);
