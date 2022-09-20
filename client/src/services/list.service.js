import axios from "./base.service";

export const getSingleListByIdboard = (payload) => {
  return axios
    .get(`/list/getSingleListByIdboard/${payload}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => [err]);
};

export const createList = (payload) => {
  return axios
    .post(`/list/createList/`, payload)
    .then((res) => {
      return res.data;
    })
    .catch((err) => [err]);
};

export const updateListById = (payload) => {
  console.log("update", payload);
  return axios
    .patch(`/list/updateListById/${payload._id}`, payload)
    .then((res) => {
      return res.data;
    })
    .catch((err) => [err]);
};

export const deleteListById = (payload) => {
  console.log("deletelist", payload);
  return axios.delete(
    `/list/deleteListById/${payload.list._id}/idListTrello/${payload.idListTrello}`,
    payload.idListTrello
  );
};
