import React, { useState, useEffect } from 'react';

import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { thunkDeleteSpotReview, getSpotbyId, getSpotsReviews, clearSpotData, clearSpotReviews } from '../../store/spots';

import "./DeleteReviewModal.css";

function DeleteReviewModal(props) {
  const { reviewId, spotId } = props;
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleDelete = async() => {
    //this deletes the spot review
    await dispatch(thunkDeleteSpotReview(reviewId));
    await dispatch(getSpotbyId(spotId))
    await dispatch(getSpotsReviews(spotId))
    closeModal();
    
        
        // return(()=>{
        //   dispatch(clearSpotData());
        //   dispatch(clearSpotReviews());
          
        // }) // Close the modal after deleting the review
  };

  const handleCancel = () => {
    closeModal(); // Close the modal without deleting the review
  };

  return (
    <>
      <div className="delete-modal">
        <h2>Are you sure you want to delete this review?</h2>
        <div className="buttons">
          <button className="delete-button" onClick={handleDelete}>
            Yes
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            No
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteReviewModal;
