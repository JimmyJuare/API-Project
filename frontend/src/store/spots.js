// frontend/src/store/session.js
import { csrfFetch } from "./csrf";

const SET_SPOTS = 'spots/setSpots'
const GET_SPOTS = 'spots/getSpotbyId'
const GET_ALL_SPOTS = 'spots/getAllSpots'
const GET_SPOT_REVIEWS = 'spots/getSpotReview'
const GET_CURRENT_SPOT = 'spots/getCurrentSpot'
//action creators

const getSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spots
  };
};
const setSpots = (spot) => {
  return {
    type: SET_SPOTS,
    payload: spot
  };
};
const getSpot = (spotsbyId) => {
  return {
    type: GET_SPOTS,
    payload: spotsbyId
  };
};
const getReview = (spotsReview) => {
  return {
    type: GET_SPOT_REVIEWS,
    payload: spotsReview
  };
};
const getCurrentSpots = (currentSpot) => {
  return {
    type:GET_CURRENT_SPOT,
    payload: currentSpot
  };
};

//thunks
export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  if (response.ok) {
    const spots = await response.json()
    console.log(spots);
    dispatch(getSpots(spots))
  }
}
export const thunkSetSpot = (spot) => async (dispatch) => {
  const {address, city,state,country, name, description,price} = spot
  const response = await csrfFetch('/api/spots', {
    method:'POST',
    body:JSON.stringify({
      address,
      city,
      state,
      country,
      name,
      description,
      price
    })
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(setSpots(data.spot))

    return data
  }
}
export const getSpotbyId = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
      const spot = await response.json()
      dispatch(getSpot(spot))
    } else {
      // Handle the case when the response is not ok (e.g., error status)
      console.error('Error occurred:', response);
    }
  } catch (error) {
    // Handle any other errors that occurred during the request
    console.error('Error occurred:', error);
  }
}
export const getSpotsReviews = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
      const spot = await response.json()
      dispatch(getReview(spot))
    } else {
      // Handle the case when the response is not ok (e.g., error status)
      console.error('Error occurred:', response);
    }
  } catch (error) {
    // Handle any other errors that occurred during the request
    console.error('Error occurred:', error);
  }
}
export const getCurrSpots = () => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/current`);
    if (response.ok) {
      const spot = await response.json()
      dispatch(getCurrentSpots(spot))
    } else {
      // Handle the case when the response is not ok (e.g., error status)
      console.error('Error occurred:', response);
    }
  } catch (error) {
    // Handle any other errors that occurred during the request
    console.error('Error occurred:', error);
  }
}

const initialState = { spots: {} };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      return {
        ...state,
        spots: action.payload
      }
    case GET_SPOTS:
      newState = Object.assign({}, state)
      newState.spotsbyId = action.payload
      return newState
    case GET_SPOT_REVIEWS:
      newState = Object.assign({}, state)
      newState.spotsReview = action.payload
      return newState
    case GET_CURRENT_SPOT:
      newState = Object.assign({}, state)
      newState.currentSpot = action.payload
      return newState
    case SET_SPOTS:
      newState = Object.assign({}, state)
      newState.newSpot = action.payload
      return newState
    default:
      return state;
  }
};

export default spotsReducer;
