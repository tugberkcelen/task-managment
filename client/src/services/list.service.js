import axios from "./base.service";

export const getSingleListByIdboard = (payload) => {
  return axios
    .get(`/list/getSingleListByIdboard/${payload}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => [err]);
};
