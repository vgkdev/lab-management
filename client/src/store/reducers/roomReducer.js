const initState = {
  listRoom: [],
};

const roomReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LIST_ROOM":
      return {
        ...state,
        listRoom: action.payload,
      };

    default:
      return state;
  }
};

export default roomReducer;
