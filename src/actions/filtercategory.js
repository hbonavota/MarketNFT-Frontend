import axios from "axios";

export function filterByCategories(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get("http://localhost:8001/nfts");
      const filterCat = await response.data.filter((i) => i.categories[0] === payload);
        console.log(payload);
      return dispatch({
        type: "FILTER_BY_CATEGORY",
        payload: filterCat,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

