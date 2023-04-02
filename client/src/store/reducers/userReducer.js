const initState = {
  userData: null,
  token: null,
  listUser: [],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      console.log("check data action: ", action.payload);
      localStorage.setItem("tokenUser", JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload,
      };

    case "SAVE_TOKEN_USER":
      return {
        ...state,
        token: action.payload,
      };

    case "USER_LOGOUT":
      localStorage.setItem("tokenUser", "");
      return {
        ...state,
        token: null,
        userData: null,
      };

    case "SET_LIST_USER":
      return {
        ...state,
        listUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
