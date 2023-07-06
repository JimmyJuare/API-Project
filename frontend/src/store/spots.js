// frontend/src/store/session.js
import { csrfFetch } from "./csrf";

const SET_SPOTS = 'spots/setSpots'
const GET_SPOTS = 'spots/getSpotbyId'
//action creators

const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    payload:spots
  };
};
const getSpot = (spotsbyId) => {
  return {
    type: GET_SPOTS,
    payload:spotsbyId
  };
};

//thunks
export const getAllSpots = () => async(dispatch) =>{
  const response = await csrfFetch('/api/spots');
  if(response.ok){
    const spots = await response.json()
    console.log(spots);
    dispatch(setSpots(spots))
  }
}
export const getSpotbyId = (spotId) => async(dispatch) =>{
  try{
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if(response.ok){
    const spot = await response.json()
    dispatch(getSpot(spot))
  }  else {
    // Handle the case when the response is not ok (e.g., error status)
    console.error('Error occurred:', response);
  }
} catch (error) {
  // Handle any other errors that occurred during the request
  console.error('Error occurred:', error);
}
}
 
const initialState = { spots:{} };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SPOTS:
      return {
        ...state,
        spots:action.payload
      }
    case GET_SPOTS:
      newState = Object.assign({}, state)
      newState.spotsbyId = action.payload
      return newState
    default:
      return state;
  }
};

export default spotsReducer;
