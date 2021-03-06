import {
  GET_NFTs,
  GET_NFT_BY_NAME,
  GET_NFT_BY_ID,
  GET_CATEGORIES,
  FILTER_BY_NAME,
  FILTER_BY_CATEGORY,
  SORT_BY_PRICE,
  POST_NFT,
  IS_AUTHENTICATED,
  TRANSACTION_METAMASK,
  TRANSACTION_MERCADO_PAGO,
  TRANSACTION_STRIPE,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  ADD_SHOPPING_TROLLEY,
  CONECT_LS,
  POST_ORDER_SHOPPING_CART,
  GET_ORDER_SHOPPING_CART,
  SHOPPING_CART_PAYMENT,
  PUT_PROFILE_USER,
  GET_PROFILE_USER,
  GET_USERS,
  UPDATE_PROFILE,
  DB_SHOPPING_HISTORY,
} from "../actions/constants";

import {
  alertOk,
  alertError,
  favOk,
  favError,
} from "../actions/sweetAlert/alerts";
import Cookies from "js-cookie";

const initialState = {
  allNFTs: [], // all NFTS from API openSea
  filtered: [],
  userIsAuthenticated: [],
  userLogged: null,
  nftDetail: [],
  Nfts: [],
  filters: [],
  transactions: [],
  categories: [],
  shoppingTrolley: [],
  shoppingCart: [],
  shoppingCartPayment: [],
  profileUserData: [],
  allUsers: [],
  role: "",
  shoppingHistoryDB: [],
  favorites: [],
  alert: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NFTs:
      return {
        ...state,
        allNFTs: action.payload,
        filtered: action.payload,
        Nfts: action.payload,
      };
    case GET_NFT_BY_NAME:
      return {
        ...state,
        allNFTs: action.payload,
      };
    case GET_NFT_BY_ID:
      return {
        ...state,
        nftDetail: action.payload,
      };
    case FILTER_BY_NAME:
      const ascDescFilter =
        action.payload === "za"
          ? state.allNFTs.sort((a, b) => {
              if (
                a.name?.charAt(0).toLowerCase() <
                b.name?.charAt(0).toLowerCase()
              )
                return 1;
              return -1;
            })
          : state.allNFTs.sort((a, b) => {
              if (
                a.name?.charAt(0).toLowerCase() >
                b.name?.charAt(0).toLowerCase()
              )
                return 1;
              return -1;
            });
      return {
        ...state,
        allNFTs: [...ascDescFilter],
      };
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        allNFTs: action.payload,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case SORT_BY_PRICE:
      const priceFilter =
        action.payload === "max"
          ? [...state.Nfts].sort(
              (b, a) => a.price - b.price
            )
          : [...state.Nfts].sort(
              (b, a) => b.price - a.price
            );

      // action.payload === "max"
      //   ? [...state.allNFTs].sort((b, a) => a.price - b.price)
      //   : [...state.allNFTs].sort((b, a) => b.price - a.price);

      return {
        ...state,
        allNFTs: priceFilter,
      };
    case POST_NFT:
      return {
        ...state,
        allNFTs: [state.allNFTs, action.payload],
      };
    case IS_AUTHENTICATED:
      return {
        ...state,
        userIsAuthenticated: action.payload,
      };
    case TRANSACTION_METAMASK:
      return {
        ...state,
        transactions: action.payload,
      };
    case TRANSACTION_MERCADO_PAGO:
      return state;
    case TRANSACTION_STRIPE:
      return state;
    case LOGIN_SUCCESS:
      let role = Cookies.get("role");
      let islogged = Cookies.get("token");
      return {
        ...state,
        role: role,
        userLogged: islogged,
      };
    case "USER_SESSION":
      let token = Cookies.get("token");
      if (token) {
        return {
          ...state,
          userLogged: Cookies.get("token"),
          role: Cookies.get("role"),
        };
      } else {
        return state;
      }

    case LOGOUT:
      Cookies.remove("token");
      Cookies.remove("role");
      return {
        ...state,
        role: null,
        userLogged: null,
        shoppingTrolley: [],
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        userLogged: {
          email: action.payload.email,
          firstName: action.payload.firstName,
        },
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        userLogged: null,
      };
    case "ADD_FAVORITE":
      action.payload.forEach((e) => {
        state.favorites.includes(e) ? favError() : favOk();
      });
      return {
        ...state,
        favorites: action.payload,
      };
    case "GET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };
    case "DELETE_FAV":
      return {
        ...state,
        favorites: action.payload,
      };
      case ADD_SHOPPING_TROLLEY:
        const myStorage = window.localStorage;
        let getmyStorage = myStorage.getItem("user");
        let parsLocal = JSON.parse(getmyStorage);
        alertOk();
        if (!parsLocal) {
          myStorage.setItem(
            "user",
            JSON.stringify(state.shoppingTrolley.concat(action.payload))
            );
            let infoLocalS = state.shoppingTrolley.concat(JSON.parse(myStorage.getItem("user")))
            return {
              ...state,
              shoppingTrolley: infoLocalS,
            };
          }
          if (parsLocal) {
          let productAction = action.payload;
          let isrepeat = parsLocal ? parsLocal.includes(productAction) : null;
          if (isrepeat) {
            alertError();
            return {
              ...state,
            };
          } else {
            let cart = state.shoppingTrolley.concat(action.payload);
            myStorage.setItem("user",JSON.stringify(JSON.parse(window.localStorage.getItem("user")).concat(action.payload)));
                    return {
              ...state,
              shoppingTrolley: cart,
            };
          }
        }
        break;
    case CONECT_LS:
      if (!window.localStorage.getItem("user")) {
        return {
          ...state,
          shoppingTrolley: state.shoppingTrolley,
        };
      } else {
        return {
          ...state,
          shoppingTrolley: JSON.parse(window.localStorage.getItem("user")),
        };
      }
    case POST_ORDER_SHOPPING_CART:
      return {
        ...state,
        shoppingTrolley: action.payload,
      };
    case GET_ORDER_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: action.payload,
      };
    case SHOPPING_CART_PAYMENT:
      return {
        ...state,
        shoppingCartPayment: action.payload,
      };
    case PUT_PROFILE_USER:
      return {
        ...state,
        profileUser: action.payload,
      };

    case GET_PROFILE_USER:
      return {
        ...state,
        profileUserData: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        profileUserData: action.payload,
      };

    case "DB_SHOPPING_CART":
      return {
        ...state,
        shoppingTrolley: action.payload,
      };

    case "JOIN_SHOPPING_CART":
      return {
        ...state,
        shoppingTrolley: action.payload,
      };

    case "CLICK_USER_LOGGED":
      action.payload.forEach((e) => {
        state.shoppingTrolley.includes(e) ? alertError() : alertOk();
      });
      return {
        ...state,
        shoppingTrolley: action.payload,
      };
    case "ALERT":
      return {
        ...state,
        alert: action.payload,
      };
    case DB_SHOPPING_HISTORY:
      return {
        ...state,
        shoppingHistoryDB: action.payload,
      };
      case 'SUCCESS_PURCHASE':
        return{
          ...state,
          shoppingTrolley:[],
          shoppingHistoryDB:action.payload
        }
      case "UPDATE_NFTS":
        return{
          ...state,
          allNFTs:action.payload
        }

    default:
      return state;
  }
}

export default rootReducer;
