const initState = {
  listYear: [],
};

const yearReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LIST_YEAR":
      return {
        ...state,
        listYear: action.payload,
      };

    default:
      return state;
  }
};

export default yearReducer;
