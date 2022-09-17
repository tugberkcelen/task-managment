import axios from "./base.service";

export const fetchBoards = () => {
  return axios
    .get("/board/getAllBoard")
    .then((res) => {
      return res.data.boards;
    })
    .catch((err) => [err]);
};

export const createBoard = (payload) => {
  return axios
    .post("/board/createBoard", payload)
    .then((res) => {
      return res.data;
    })
    .catch((err) => [err]);
};

export const updateBoardById = (payload) => {
  return axios
    .patch(`/board/updateBoardById/${payload._id}`, payload)
    .then((res) => {
      return res.data;
    })
    .catch((err) => [err]);
};

export const deleteBoardById = (payload) => {
  return axios
    .delete(`board/deleteBoardById/${payload._id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => [err]);
};

export const getSingleBoardById = (payload) => {
  return axios
    .get(`board/getSingleBoardById/${payload}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => [err]);
};
