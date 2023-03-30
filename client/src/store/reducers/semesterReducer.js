const initState = {
  listSemester: [],
};

const semesterReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LIST_SEMESTER":
      return {
        ...state,
        listSemester: action.payload,
      };

    default:
      return state;
  }
};

export default semesterReducer;
