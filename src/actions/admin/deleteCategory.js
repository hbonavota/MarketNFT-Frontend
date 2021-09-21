import axios from "axios";


export function deleteCategory(id) {
  return async function () {
    try {
      const category = await axios.delete('/'+id);
    } catch (error) {
      console.log(error);
    }
  };
};

