const initState = {
  listIncident: [],
};

const incidentReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LIST_INCIDENT":
      return {
        ...state,
        listIncident: action.payload,
      };

    default:
      return state;
  }
};

export default incidentReducer;
