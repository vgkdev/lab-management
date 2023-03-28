const initState = {
  listFaculty: [],
};

const facultyReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LIST_FACULTY":
      return {
        ...state,
        listFaculty: action.payload,
      };

    default:
      return state;
  }
};

export default facultyReducer;
