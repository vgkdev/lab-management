const initState = {
  userData: {
    maCB: "VGK",
    email: "khang1@gmail.com",
  },

  listUser: [],
  listFaculty: [],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      console.log("check case");
      return {
        ...state,
        userData: action.payload,
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
