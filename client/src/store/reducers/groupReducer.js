const initState = {
  listGroup: [],
};

const groupReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LIST_GROUP":
      return {
        ...state,
        listGroup: action.payload,
      };

    default:
      return state;
  }
};

export default groupReducer;
