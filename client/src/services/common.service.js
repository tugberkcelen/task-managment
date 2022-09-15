import axios from "./base.service";

export const fetchBoards = () => {
  return axios
    .get("/board/getAllBoard")
    .then((res) => {
      return res.data.boards;
    })
    .catch((err) => [err]);
};
