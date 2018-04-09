const initialState = {
  hotels: [],
  loading: false,
  hotelsFiltered: [],
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
    case 'FILTER_HOTELS': {
      return {
        ...state,
        hotelsFiltered: action.Hotels.filter(
          a => a.name.toLowerCase().indexOf(action.filter) >= 0,
        ),
      };
    }
    case 'FILTER_HOTEL_STARS': {
      return {
        ...state,
        hotelsFiltered: action.Hotels.filter(a => a.stars === action.filter),
      };
    }
    default:
      return state;
  }
}
