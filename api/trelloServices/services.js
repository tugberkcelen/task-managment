const axios = require("axios");

// https://api.trello.com/1/boards/?name={name}&key=APIKey&token=APIToken

// Board services

const createBoardForTrello = (payload) => {
  const URI = `${process.env.TRELLO_URL}/boards/?name=${payload.name}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`;
  const encodedURI = encodeURI(URI);
  return axios.post(encodedURI);
};

const updateBoardForTrello = (payload) => {
  const URI = `${process.env.TRELLO_URL}/boards/${payload.idBoardTrello}?name=${payload.name}&desc=${payload.desc}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`;
  const encodedURI = encodeURI(URI);
  return axios.put(encodedURI);
};

const createListOnBoardForTrello = (payload) => {
  return axios.post(
    `${process.env.TRELLO_URL}/boards/${payload.idBoardTrello}/lists?name=${payload.name}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
};

const updateListForTrello = (payload) => {
  const URI = `${process.env.TRELLO_URL}/lists/${payload.idListTrello}?name=${payload.name}&desc=${payload.desc}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`;
  const encodedURI = encodeURI(URI);
  return axios.put(encodedURI);
};

const deleteListForTrello = (payload) => {
  const URI = `${process.env.TRELLO_URL}/lists/${payload}/closed?value=true&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`;
  const encodedURI = encodeURI(URI);
  return axios.put(encodedURI);
};

// Card services

const createNewCardForTrello = (payload) => {
  return axios.post(
    `${process.env.TRELLO_URL}/cards?idList=${payload.idListTrello}&name=${payload.name}&desc=${payload.desc}&fileSource${payload.image}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
};

const updateCardForTrello = (payload) => {
  const URI = `${process.env.TRELLO_URL}/cards/${payload.idCardTrello}?name=${payload.name}&desc=${payload.desc}&idList=${payload.idListTrello}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`;
  const encodedURI = encodeURI(URI);
  return axios.put(encodedURI);
};

const deleteCardForTrello = (payload) => {
  return axios.delete(
    `${process.env.TRELLO_URL}/cards/${payload}?&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
};

module.exports = {
  createBoardForTrello,
  createListOnBoardForTrello,
  createNewCardForTrello,
  deleteCardForTrello,
  updateCardForTrello,
  updateBoardForTrello,
  updateListForTrello,
  deleteListForTrello,
};
