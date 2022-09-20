import axios from "./base.service";

export const getSingleCardByIdBoard = (payload) => {
  return axios
    .get(`/card/getSingleCardByIdBoard/${payload}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => [err]);
};

export const createCard = (payload) => {
  return axios
    .post(`/card/createCard/`, payload)
    .then((res) => {
      return res.data;
    })
    .catch((err) => [err]);
};

export const updateCardById = (payload) => {
  return axios
    .patch(`/card/updateCardById/${payload.id}`, payload.data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => [err]);
};

export const deleteCardById = (payload) => {
  return axios
    .delete(
      `/card/deleteCardById/${payload._id}/idCardTrello/${payload.idCardTrello}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => [err]);
};
