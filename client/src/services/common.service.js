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
