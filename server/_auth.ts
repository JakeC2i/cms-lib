// Authorization

import {LoginState} from '../projects/cms-core/src/lib/login/login-state';
import {LoginFormData} from '../projects/cms-core/src/lib/login/login-form-data';
import {SimpleUser} from './_types';
const {randomInteger, randomText} =  require('./_random');

const loginState: LoginState<SimpleUser> = {
  loggedIn: false
};

function loginStatusCheck(req, res) {
  console.log('login status check');
  res.json(loginState);
}

function loginUser(req, res) {
  const shouldLogin = randomInteger(0, 100) > 10;

  if (!shouldLogin) {
    console.log('mocked auth failure');
    return res.status(401)
      .json({
        message: "Incorrect username or password",
        name: "IncorrectPasswordError"
      });
  }

  const form: LoginFormData = req.body;
  loginState.loggedIn = true;
  loginState.user = {
    name: randomText(6),
    email: form.email
  };
  console.log('logged in');

  res.json(loginState);
}

function logoutUser(req, res) {
  loginState.loggedIn = false;
  delete loginState.user;
  console.log('logged out');
  res.json(loginState);
}

function authCheck(req, res, next) {
  if (!loginState.loggedIn) {
    return res.status(401).json({
      message: "You're not authorized to access this resource",
      name: "UnauthorizedError"
    })
  }
  next();
}

module.exports = {
  loginStatusCheck,
  loginUser,
  logoutUser,
  authCheck
};
