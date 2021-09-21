import axios from "axios";

//
export function deleteNFT(ids) {
  console.log("esto me llega como ids", ids);
  return function () {
    try {
      ids.map((id) => axios.delete("/" + id));
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteUser(id) {
  return function () {
    try {
      const users = id.map((id) =>
        axios.delete("/" + id)
      );
      console.log(users.data, "ACA USERS");
    } catch (error) {
      console.log(error);
    }
  };
}
