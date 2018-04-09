import * as api from '../../api/HotelsApi';

// #region "Get Hotels"
export function getHotelsSuccess(data) {
  return {
    type: 'GET_HOTELS_SUCCESS',
    data,
  };
}

export function getHotelsFailed() {
  return {
    type: 'GET_HOTELS_FAILED',
  };
}

export function getHotelsLoading() {
  return {
    type: 'GET_HOTELS_LOADING',
  };
}

export function getAllHotels() {
  return dispatch => {
    dispatch(getHotelsLoading());
    api
      .getAllHotels()
      .then(response => {
        dispatch(getHotelsSuccess(response.data));
      })
      .catch(error => {
        dispatch(getHotelsFailed());
      });
  };
}
// #endregion

// #region "Filter Hotels"
export function setfilterHotels(Hotels, filter, type) {
  return {
    type: type,
    Hotels,
    filter,
  };
}

export function filterHotels(Hotels, filter) {
  return dispatch => {
    dispatch(setfilterHotels(Hotels, filter, 'FILTER_HOTELS'));
  };
}

export function filterStars(Hotels, filter) {
  return dispatch => {
    dispatch(setfilterHotels(Hotels, filter, 'FILTER_HOTEL_STARS'));
  };
}
// #endregion
