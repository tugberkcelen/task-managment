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
  console.log("payloadNewCard", payload);
  return axios.post(
    `${process.env.TRELLO_URL}/cards?idList=${payload.idListTrello}&name=${payload.name}&desc=${payload.desc}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
};

module.exports = {
  createBoardForTrello,
  createListOnBoardForTrello,
  createNewCardForTrello,
};
