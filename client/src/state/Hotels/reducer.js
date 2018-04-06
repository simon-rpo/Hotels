const initialState = {
  hotels: [],
  loading: false,
};

export default function hotelsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_HOTELS_LOADING': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GET_HOTELS_SUCCESS': {
      return {
        ...state,
        hotels: action.data,
        loading: false,
      };
    }
    case 'GET_HOTELS_FAILED': {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
