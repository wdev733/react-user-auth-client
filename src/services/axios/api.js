import { getClient } from './apiConfig'

const loginAPI = (email, password) => {
  return getClient(false).post("account/login", {
    email: email,
    password: password
  });
}

export {
  loginAPI,
}