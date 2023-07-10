import React, { useEffect, useState } from 'react';
import { getCurrSpots, thunkDeleteSpot } from '../../store/spots';
import { Link } from 'react-router-dom';
import './CurrentSpot.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import DeleteModal from '../deleteModal';

function CurrentSpots() {
    const { setModalContent } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector((state) => state.spots.currentSpot);
    const [selectedSpotId, setSelectedSpotId] = useState(null);

    useEffect(() => {
        dispatch(getCurrSpots());
    }, [dispatch]);

    const handleDelete = (spotId) => {
        setSelectedSpotId(spotId);
        const content = <DeleteModal spotId={spotId} onDelete={handleDeleteSpot} onCancel={handleCancelDelete} />;
        setModalContent(content);
    };

    const handleDeleteSpot = () => {
        dispatch(thunkDeleteSpot(selectedSpotId)).then(() => {
            dispatch(getCurrSpots()); // Fetch the updated list of spots
            closeModal();
        });
    };

    const handleCancelDelete = () => {
        closeModal();
    };

    const closeModal = () => {
        setModalContent(null);
    };

    if (!spots) {
        return <div>Loading...</div>; // Display a loading state until spots are fetched
    }

    return (
        <>
            <div className="current-wrapper">
                <div id="top-info">
                    <h2>Manage Your Spots</h2>
                    <Link id="link" to="/spots">
                        Create a spot
                    </Link>
                </div>
                <div id="inner-wrapper">
                    {spots.Spots &&
                        spots.Spots.map((spot, index) => (
                            <div id="spot-item" key={spot.id}>
                                <Link to={`/spots/${spot.id}`} key={spot.id} className="item">
                                    <img src={spot.previewImage} alt="Spot" />
                                    <div className="info">
                                        <div className="inner-info">
                                            <p>
                                                <strong>{spot.city}, {spot.state}</strong>
                                            </p>
                                            <p>${spot.price} night</p>
                                        </div>
                                        <div className="rating">
                                            <i class="fa-sharp fa-solid fa-star"></i>
                                            <p>{spot.avgRating}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="delete-and-update">
                                    <Link to={`/spots/${spot.id}/edit`} key={spot.id} className="update-button">
                                        Update
                                    </Link>
                                    <button onClick={() => handleDelete(spot.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default CurrentSpots;
