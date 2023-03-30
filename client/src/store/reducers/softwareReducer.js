const initState = {
  listSoftware: [],
};

const softwareReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LIST_SOFTWARE":
      return {
        ...state,
        listSoftware: action.payload,
      };

    default:
      return state;
  }
};

export default softwareReducer;
