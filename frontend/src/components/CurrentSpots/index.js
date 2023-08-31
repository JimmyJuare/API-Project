import React, { useEffect, useState } from "react";
import { getCurrSpots, thunkDeleteSpot } from "../../store/spots";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tippy";
import "./CurrentSpot.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import DeleteModal from "../deleteModal";

function CurrentSpots() {
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state.spots.currentSpot?.Spots);
  const [selectedSpotId, setSelectedSpotId] = useState(null);

  useEffect(() => {
    dispatch(getCurrSpots());
  }, [dispatch]);

  const handleDelete = (spotId) => {
    setSelectedSpotId(spotId);
    const content = (
      <DeleteModal
        spotId={spotId}
        onDelete={handleDeleteSpot}
        onCancel={handleCancelDelete}
      />
    );
    setModalContent(content);
  };

  const handleDeleteSpot = () => {
    dispatch(thunkDeleteSpot(selectedSpotId)).then(() => {
        dispatch(getCurrSpots(selectedSpotId))
      closeModal();
      
    });
  };

  const handleCancelDelete = () => {
    closeModal();
  };

  const closeModal = () => {
    setModalContent(null);
  };

  if (!spots || spots.length === 0) {
    return (
      <>
        <div id="top-info">
          <h2>Manage Your Spots</h2>
          <Link id="link" to="/spots">
            Create a spot
          </Link>
        </div>
        <div style={{ textAlign: "center", fontSize: "20px" }}>no spots</div>;
      </>
    );
  }

  return (
    <>
    {spots && (
        <div className="current-wrapper">
        <div id="top-info">
          <h2>Manage Your Spots</h2>
          <Link id="link" to="/spots">
            Create a spot
          </Link>
        </div>
        <div id="inner-wrapper">
          {console.log("these are the spots", spots)}
          {spots &&
            spots.map((spot, index) => (
              <div id="spot-item" key={spot.id}>
                <Tooltip title={spot.name} arrow>
                  <Link to={`/spots/${spot.id}`} key={spot.id} className="item">
                    <div class="hover-text"></div>
                    <img className="image" src={spot.previewImage} alt="Spot" />
                    <div className="info">
                      <div className="inner-info">
                        <p>
                          <strong>
                            {spot.city}, {spot.state}
                          </strong>
                        </p>
                        {console.log("price", spot.price)}
                        {console.log("Type of spot.price:", typeof spot.price)}
                        <p>${parseFloat(spot.price).toFixed(2)} night</p>
                      </div>
                      <div className="rating">
                        <i className="fa-sharp fa-solid fa-star"></i>
                        {console.log(spot)}
                        {spot.avgRating === null || spot.avgRating === 0 ? (
                          <p>new</p>
                        ) : (
                          <p>{parseFloat(spot.avgRating).toFixed(1)}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </Tooltip>
                <div className="delete-and-update">
                  <Link
                    to={`/spots/${spot.id}/edit`}
                    key={spot.id}
                    className="update-button"
                  >
                    Update
                  </Link>
                  <button onClick={() => handleDelete(spot.id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    )}
    
    </>
      
  );
}

export default CurrentSpots;
