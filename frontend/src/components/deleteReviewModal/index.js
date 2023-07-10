import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpotReview } from "../../store/spots";
import "./DeleteReviewModal.css";

function DeleteReviewModal(props) {
  const { reviewId } = props;
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(thunkDeleteSpotReview(reviewId));
    closeModal(); // Close the modal after deleting the review
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
