// Resources

import {Resource} from './_types';

const {randomDate, randomId, randomInteger, randomText} = require('./_random');
const {resolveOne, getAll, getOne, postOne, updateOne, deleteOne} = require('./_crud');


const resources: Resource[] = [];
for (let i=0; i<randomInteger(16, 32); i++) {
  resources.push({
    _id: randomId(),
    created: randomDate(),
    name: `${randomText(4)} ${randomText(8)}`,
    value: randomInteger(1, 1000)
  });
}

function resolveOneResource() {
  return resolveOne(resources);
}

function getAllResources() {
  return getAll(resources);
}

function getOneResource() {
  return getOne(resources);
}

function postOneResource() {
  return postOne(resources);
}

function updateOneResource() {
  return updateOne(resources);
}

function deleteOneResource() {
  return deleteOne(resources);
}

module.exports = {
  resolveOneResource,
  getAllResources,
  getOneResource,
  postOneResource,
  updateOneResource,
  deleteOneResource
};
