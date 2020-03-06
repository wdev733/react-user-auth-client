import React, { Component } from "react";

import { connect } from "react-redux";
import { loginUser, loginUserFailed } from "Redux/actions";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { loginErrorType, loginErrorTypeText } from 'Constants/defaultValues'

import styles from './styles.scss'

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }
  handleUserLogin() {
    const { email, password } = this.state;
    const { loginUser, loginUserFailed } = this.props;

    if (email === "") {
      loginUserFailed(loginErrorType.EMAIL);
      return;
    }

    if (password === "") {
      loginUserFailed(loginErrorType.PASSWORD);
      return;
    }
    if (email !== "" && password !== "") {
      loginUser(this.state, this.props.history);
    }
  }

  handleInputChange = (e) => {
    const { loginUserFailed } = this.props;

    loginUserFailed(loginErrorType.AUTH_SUCCESS);

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentWillReceiveProps(props) {
    const { authStatus } = props;

    this.setState({
      error: loginErrorTypeText(authStatus)
    });
  }

  render() {
    const { authStatus } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles["login-container"]}>
          <img src="/assets/img/logo.png" className={styles.logo} alt="logo" />
          <div className={styles["no-account-link"]}>
            Ai nevoie de un cont? Înregistrează-te!
          </div>
          <div className={styles["form-section"]}>
            <span className={styles.header}>Intră în contul tău Confidas</span>
            {authStatus !== loginErrorType.AUTH_SUCCESS && (
              <span className={styles["login-error"]}>{this.state.error}</span>
            )}
            <TextField
              className={styles.email}
              label="Adresa de email"
              variant="outlined"
              name="email"
              value={this.state.email}
              onChange={e => this.handleInputChange(e)}
            />
            <TextField
              type="password"
              className={styles.password}
              label="Parolă"
              variant="outlined"
              name="password"
              value={this.state.password}
              onChange={e => this.handleInputChange(e)}
            />
            <Button
              className={styles.submit}
              onClick={e => this.handleUserLogin(e)}
              size="large"
              variant="contained"
            >
              Intră în cont!
            </Button>
          </div>
        </div>
        <div className={styles["description-container"]}>
          <h2 className={styles.title}>Verifică orice companie din România</h2>
          <h3 className={styles["sub-title"]}>
            Asigură-te că afacerea ta crește, evitând clienții rău-platnici
          </h3>
          <div className={styles["content-wrapper"]}>
            <div className={styles["content"]}>
              <div className={styles["icon-box"]}>
                <img
                  className={styles["icon"]}
                  src="/assets/img/money.png"
                  alt=""
                />
              </div>
              <h3 className={styles["content-title"]}>Găsește Clienți Noi</h3>
              <span className={styles["description"]}>
                Generează bază de date cu firme în câteva secunde
              </span>
            </div>
            <div className={styles["content"]}>
              <div className={styles["icon-box"]}>
                <img
                  className={styles["icon"]}
                  src="/assets/img/wifi.png"
                  alt=""
                />
              </div>
              <h3 className={styles["content-title"]}>
                Monitorizare și alerte
              </h3>
              <span className={styles["description"]}>
                Primești alerte atunci când intervin schimbări în situația
                clienților
              </span>
            </div>
            <div className={styles["content"]}>
              <div className={styles["icon-box"]}>
                <img
                  className={styles["icon"]}
                  src="/assets/img/report.png"
                  alt=""
                />
              </div>
              <h3 className={styles["content-title"]}>Rapoarte de credit</h3>
              <span className={styles["description"]}>
                Date complete despre toți noii și existenții tăi clienți
              </span>
            </div>
          </div>
          <div className={styles.section}>
            <a className={styles.functionality} href="#link">
              Află mai multe
            </a>
          </div>
          <div className={styles.contact}>
            <img src="/assets/img/man.jpg" alt="man.jpg" />
          </div>
          <div className={styles.notification}>
            Get Notifications
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, authStatus, loading } = authUser;
  return { user, authStatus, loading };
};

export default connect(
  mapStateToProps,
  {
    loginUser,
    loginUserFailed
  }
)(LoginLayout);
