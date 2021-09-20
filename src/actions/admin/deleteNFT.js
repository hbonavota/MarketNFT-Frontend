import axios from "axios";

//
export function deleteNFT(ids) {
  console.log("esto me llega como ids", ids);
  return function () {
    try {
      ids.map((id) => axios.delete("https://nft-e-commerce11.herokuapp.com/" + id));
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteUser(id) {
  return function () {
    try {
      const users = id.map((id) =>
        axios.delete("https://nft-e-commerce11.herokuapp.com/deleteUser/" + id)
      );
      console.log(users.data, "ACA USERS");
    } catch (error) {
      console.log(error);
    }
  };
}
