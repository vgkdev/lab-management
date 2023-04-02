const initState = {
  listSchedule: [],
};

const scheduleReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LIST_SCHEDULE":
      return {
        ...state,
        listSchedule: action.payload,
      };

    default:
      return state;
  }
};

export default scheduleReducer;
