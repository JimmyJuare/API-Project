import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpot } from "../../store/spots";
import "./deleteModal.css";

function DeleteModal(props) {
  const { spotId } = props;
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(thunkDeleteSpot(spotId));
    window.location.reload();
    closeModal(); // Close the modal after deleting the spot
  };

  const handleCancel = () => {
    closeModal(); // Close the modal without deleting the spot
  };

  return (
    <>
      <div className="delete-modal">
        <h2>Are you sure you want to delete this spot?</h2>
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

export default DeleteModal;
