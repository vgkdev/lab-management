const initState = {
  listCourse: [],
};

const courseReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LIST_COURSE":
      return {
        ...state,
        listCourse: action.payload,
      };

    default:
      return state;
  }
};

export default courseReducer;
