const _ = require('lodash');
const {randomId} = require('./_random');
import {PagingParams} from './_types';

function pagingParamsFromRequest(req): PagingParams {
  let {limit, offset} = req.query;
  if (!isFinite(limit))
    limit = null;
  if (!isFinite(offset))
    offset = null;
  return {offset, limit};
}

function resolveOne(resources: any[]): any {
  return function (req, res, next, id: string) {
    const foundIndex = resources.findIndex(res => res._id === id);
    if (foundIndex === -1) {
      return res.status(404).json({
        message: "Resource has not been found",
        name: "NotFoundError"
      });
    }

    req.documentIndex = foundIndex;
    req.document = resources[foundIndex];
    next();
  };
}

function getAll(resources: any[]) {
  return function (req, res) {
    const paging: PagingParams = pagingParamsFromRequest(req);
    const skipped = resources.slice(paging.offset === null ? 0 : paging.offset);
    const limited = paging.limit === null ? skipped : skipped.slice(0, paging.limit);
    res.setHeader('Access-Control-Expose-Headers', 'Pro-Documents-Total');
    res.setHeader('Pro-Documents-Total', resources.length);
    res.json(limited);
  }
}

function getOne(resource: any[]) {
  return function (req, res) {
    res.json(req.document);
  }
}

function deleteOne(resources: any[]) {
  return function (req, res) {
    const item = resources.splice(req.documentIndex, 1);
    res.json(item);
  }
}

function updateOne(resources: any[]) {
  return function(req, res) {
    _.extend(req.document, req.body);
    res.json(req.document);
  }
}

function postOne(resources: any[]) {
  return function(req, res) {
    req.body._id = randomId();
    req.body.created = new Date();
    resources.unshift(req.body);
    res.json(resources[0]);
  }
}

module.exports = {
  resolveOne,
  getAll,
  getOne,
  postOne,
  updateOne,
  deleteOne
};
