const axios = require("axios");

// https://api.trello.com/1/boards/?name={name}&key=APIKey&token=APIToken

const createBoardForTrello = (payload) => {
  console.log("payload");
  return axios
    .post(
      `${process.env.TRELLO_URL}/boards/?name=${payload.name}&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
    )
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

module.exports = {
  createBoardForTrello,
};
