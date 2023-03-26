const initState = {
  userData: {
    maCB: "VGK",
    email: "khang1@gmail.com",
  },
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      console.log("check case");
      return {
        // ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
