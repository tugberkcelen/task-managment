const axios = require("axios");

// https://api.trello.com/1/boards/?name={name}&key=APIKey&token=APIToken

const createBoardForTrello = (payload) => {
  return axios.post(
    `${process.env.TRELLO_URL}/boards/?name=${payload.name}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
};

const createListOnBoardForTrello = (payload) => {
  return axios.post(
    `${process.env.TRELLO_URL}/boards/${payload.idBoardTrello}/lists?name=${payload.name}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
};

const createNewCardForTrello = (payload) => {
  return axios.post(
    `${process.env.TRELLO_URL}/cards?idList=${payload.idListTrello}&name=${payload.name}&desc=${payload.desc}&fileSource${payload.image}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
};

// https://api.trello.com/1/cards/{id}?key=APIKey&token=APIToken

const updateCardForTrello = (payload) => {
  console.log("servicesPayload", payload);
  return axios.put(
    `${process.env.TRELLO_URL}/cards/${payload.idCardTrello}?name=${payload.name}&desc=${payload.desc}&idList=${payload.idListTrello}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
};

const deleteCardForTrello = (payload) => {
  console.log("payload", payload);
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
};
