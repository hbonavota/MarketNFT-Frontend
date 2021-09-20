import axios from "axios";


export function deleteCategory(id) {
  return async function () {
    try {
      const category = await axios.delete('https://nft-e-commerce11.herokuapp.com/'+id);
    } catch (error) {
      console.log(error);
    }
  };
};

