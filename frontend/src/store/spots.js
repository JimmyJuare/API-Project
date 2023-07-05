// frontend/src/store/session.js
import { csrfFetch } from "./csrf";

const SET_SPOTS = 'spots/setSpots'
//action creators

const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    payload:spots
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
 
const initialState = { spots:[] };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SPOTS:
      return {
        ...state,
        spots:action.payload
      }
    default:
      return state;
  }
};

export default spotsReducer;
