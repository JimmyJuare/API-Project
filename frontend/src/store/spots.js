// frontend/src/store/session.js
import { csrfFetch } from "./csrf";

const SET_SPOTS = 'spots/setSpots'
const SET_SPOTS_IMAGES = 'spots/setSpotImages'
const SET_SPOTS_REVIEWS = 'spots/setSpotReviews'
const GET_ONE_SPOT = 'spots/getSpotbyId'
const GET_ALL_SPOTS = 'spots/getAllSpots'
const GET_SPOT_REVIEWS = 'spots/getSpotReview'
const GET_CURRENT_SPOT = 'spots/getCurrentSpot'
const DELETE_SPOT = 'spots/deleteSpot'
const DELETE_SPOT_REVIEW = 'spots/deleteSpot'
const UPDATE_SPOT = 'spots/updateSpot'
const CLEAR_SPOT_DATA = 'CLEAR_SPOT_DATA';
const CLEAR_SPOT_REVIEWS = 'CLEAR_SPOT_REVIEWS';
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
const setSpotsImages = (spotImages) => {
  return {
    type: SET_SPOTS_IMAGES,
    payload: spotImages
  };
};
const setSpotsReviews = (reviews) => {
  return {
    type: SET_SPOTS_REVIEWS,
    payload: reviews
  };
};
const getOneSpot = (spotsbyId) => {
  return {
    type: GET_ONE_SPOT,
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
    type: GET_CURRENT_SPOT,
    payload: currentSpot
  };
};
const deleteSpot = (spot) => {
  return {
    type: DELETE_SPOT,
    payload: spot
  };
};
const deleteSpotReview = (review) => {
  return {
    type: DELETE_SPOT_REVIEW,
    payload: review
  };
};
const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    payload: spot
  };
};
export const clearSpotData = () => ({
  type: CLEAR_SPOT_DATA,
});

export const clearSpotReviews = () => ({
  type: CLEAR_SPOT_REVIEWS,
});

//thunks
export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  if (response.ok) {
    const spots = await response.json()
    dispatch(getSpots(spots))
  }
}
export const thunkSetSpot = (spot) => async (dispatch) => {
  const { address, city, state, country, name, description, price } = spot
  const response = await csrfFetch(`/api/spots`, {
    method: 'POST',
    body: JSON.stringify({
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
export const thunkUpdateSpot = (spotId, spotData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spotData),
    });

    if (!response.ok) {
      throw new Error('Failed to update spot');
    }

    const updatedSpot = await response.json();
    dispatch(updateSpot(updatedSpot));
    return updatedSpot;
  } catch (error) {
    console.error('Error updating spot:', error);
  }
};
export const thunkSetReviews = (spotId, Review) => async (dispatch) => {
  const { review, stars } = Review
  console.log('Spot ID:', spotId);
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',

    body: JSON.stringify({
      review,
      stars
    })
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(setSpotsReviews(data))

    return data
  }
}
export const thunkSetSpotImages = (url, spotId, preview = false) => async (dispatch) => {

  console.log('this is the url');

  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify({ url, preview })
  });
  if (response.ok) {
    const data = await response.json()
    console.log(data);
    dispatch(setSpotsImages(data))

    return data
  } else {
    // Handle the case when the response is not ok (e.g., error status)
    console.error('Error occurred:', response);
  }
}
export const getSpotbyId = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
      const spot = await response.json()
      dispatch(getOneSpot(spot))
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
export const thunkDeleteSpot = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      dispatch(deleteSpot(spotId))
    } else {
      // Handle the case when the response is not ok (e.g., error status)
      console.error('Error occurred:', response);
    }
  } catch (error) {
    // Handle any other errors that occurred during the request
    console.error('Error occurred:', error);
  }
}
export const thunkDeleteSpotReview = (reviewId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      dispatch(deleteSpotReview(reviewId))
    } else {
      // Handle the case when the response is not ok (e.g., error status)
      console.error('Error occurred:', response);
    }
  } catch (error) {
    // Handle any other errors that occurred during the request
    console.error('Error occurred:', error);
  }
}
const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;

  const totalRating = reviews.reduce((sum, review) => sum + review.stars, 0);
  return totalRating / reviews.length;
};

const initialState = { spots: {}, spotsReview: [],  avgStarRating: 0};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      return {
        ...state,
        spots: action.payload
      }
    case GET_ONE_SPOT:
      newState = Object.assign({}, state)
      newState['spotsbyId'] = action.payload
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
    case SET_SPOTS_IMAGES:
      newState = Object.assign({}, state)
      newState.SpotImages = action.payload
      return newState
    case SET_SPOTS_REVIEWS:
      newState = Object.assign({}, state)
      newState.spotsReview = action.payload
      return newState
    case DELETE_SPOT:
      newState = { ...state };
      newState.spotsReview = newState.spotsReview.filter(
        (review) => review.id !== action.payload
      );

      // Calculate the average spot rating after deleting the review
      newState.avgStarRating = calculateAverageRating(newState.spotsReview);

      return newState;
    case DELETE_SPOT_REVIEW:
      newState = { ...state };
      newState.spotsReview = newState.spotsReview.filter(
        (review) => review.id !== action.payload
      );
      return newState;
    case UPDATE_SPOT:
      newState = Object.assign({}, state)
      newState.spots = action.payload
      return newState
    case CLEAR_SPOT_DATA:
      return {
        ...state,
        spotsbyId: null,
      };
    case CLEAR_SPOT_REVIEWS:
      return {
        ...state,
        spotsReview: [],
      };
    default:
      return state;
  }
};

export default spotsReducer;
