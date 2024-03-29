import React, { useState, useEffect } from 'react';

import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { thunkDeleteSpotReview, getSpotbyId, getSpotsReviews } from '../../store/spots';

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
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
        <div className="buttons">
          <button className="delete-button" onClick={handleDelete}>
            Yes (Delete Review)
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            No (Keep Review)
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteReviewModal;
