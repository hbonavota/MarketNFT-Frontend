import axios from "axios";

export function filterByCategories(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get("http://localhost:8001/nfts");
      const filterCat = await response.data.filter((i) =>
        i.categories.includes(payload)
      );
      console.log(filterCat, "FILTEEER");
      return dispatch({
        type: "FILTER_BY_CATEGORY",
        payload: filterCat,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// if(action.payload!=="all"){
//                 for(let i = 0; i<arr.length; i++) {
//                     if(arr[i].temperaments){
//                        if(arr[i].temperaments.filter(e => e.toLowerCase().includes(action.payload.toLowerCase()) === true ).length > 0) {
//                         aux.push(arr[i])
//                    }
//                 }
//             }

//         }
