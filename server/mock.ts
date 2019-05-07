import {Express} from 'express';
const express = require('express');
const {inputTextBody, parseJsonBody, setCorsHeaders, optionsResponse} = require('./_server');
const {loginStatusCheck, loginUser, logoutUser, authCheck} = require('./_auth');
const {resolveOneResource, getAllResources, getOneResource, updateOneResource, postOneResource, deleteOneResource} = require('./_resource');

// General

const app: Express = express();

app.use(setCorsHeaders);
app.use(inputTextBody);
app.use(parseJsonBody);

// Authentication

app.route('/me')
  .get(loginStatusCheck);

app.route('/login')
  .post(loginUser);

app.route('/logout')
  .post(logoutUser);

// Resources

app.route('/resource')
  .options(optionsResponse(['get', 'post']))
  .all(authCheck)
  .get(getAllResources())
  .post(postOneResource());

app.route('/resource/:ResourceId')
  .options(optionsResponse(['get', 'put','delete']))
  .all(authCheck)
  .get(getOneResource())
  .put(updateOneResource())
  .delete(deleteOneResource());

app.param('ResourceId', resolveOneResource());

// Start server

app.listen(3000);
