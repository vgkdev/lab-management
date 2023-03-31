const initState = {
  listClassroom: [],
};

const classroomReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LIST_CLASSROOM":
      return {
        ...state,
        listClassroom: action.payload,
      };

    default:
      return state;
  }
};

export default classroomReducer;
