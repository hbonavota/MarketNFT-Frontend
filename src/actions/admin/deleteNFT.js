import axios from "axios";

//
export function deleteNFT(ids) {
  return function () {
    try {
      ids.map((id) => axios.delete("/admin/" + id));
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteUser(id) {
  return function () {
    try {
      /* const users = id.map((id) => axios.delete("/deleteUser/" + id)); */
    } catch (error) {
      console.log(error);
    }
  };
}
