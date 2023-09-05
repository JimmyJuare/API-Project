import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { clearCurrentSpot, thunkDeleteSpot } from "../../store/spots";
import "./deleteModal.css";

function DeleteModal(props) {
  const { spotId } = props;
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(thunkDeleteSpot(spotId));
    closeModal(); // Close the modal after deleting the spot
  };

  const handleCancel = () => {
    closeModal(); // Close the modal without deleting the spot
  };

  return (
    <>
      <div className="delete-modal">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this spot?</p>
        <div className="buttons">
          <button className="delete-button" onClick={handleDelete}>
            Yes (Delete Spot)
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            No (Keep Spot)
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
