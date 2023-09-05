import React, { useEffect, useState } from "react";
import {
    getSpotbyId,
    getSpotsReviews,
    thunkDeleteSpot,
    thunkDeleteSpotReview,
} from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { clearSpotData, clearSpotReviews } from "../../store/spots";

import "./spotsDetails.css";
import ReviewModal from "../reviewModal";
import { useModal } from "../../context/Modal";
import DeleteReviewModal from "../deleteReviewModal";
function SpotsDetails() {
    const img = (
        <img src="https://png-files-for-api.s3.us-east-2.amazonaws.com/png/photo-1600596542815-ffad4c1539a9.jpg"></img>
    );
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [currentSpotId, setCurrentSpotId] = useState(null);
    const sessionUser = useSelector((state) => state.session.user);
    const spot = useSelector((state) => state.spots.spotsbyId || {});
    const spotReview = useSelector((state) => state.spots.spotsReview || []);
    const { setModalContent } = useModal();
    let hasUserIdOne = false;
    if (sessionUser) {
        const userReview = spotReview.find(
            (review) => review.userId === sessionUser.id
        );
        hasUserIdOne = !!userReview;
    }

    useEffect(() => {
        // Clear spot and reviews state when changing spots
        setLoadingReviews(true);
        dispatch(getSpotbyId(spotId))
            .then(() => dispatch(getSpotsReviews(spotId)))
            .then(() => setLoadingReviews(false))
            .catch((error) => {
                console.error("Error Fetching Spot and Reviews:", error);
                setLoadingReviews(false);
            });

        // Return a cleanup function to clear spot and reviews when unmounting
        return () => {
            dispatch(clearSpotData());
            dispatch(clearSpotReviews());
        };
    }, [dispatch, spotId]);

    const handleAlertClick = () => {
        alert("Feature Coming soon!");
    };
    const handleReviewModal = () => {
        const content = <ReviewModal spotId={spotId} />; // Save the JSX element to a variable

        setModalContent(content); // Set the modal content to be rendered
    };
    const handleDeleteModal = (reviewId, spotId) => {
        setCurrentSpotId(spotId);
        const content = <DeleteReviewModal reviewId={reviewId} spotId={spotId} />;
        setModalContent(content);
    };

    // const handleDeleteReview = (reviewId, spotId) => {
    //     handleDeleteModal(reviewId, spotId);
    //     dispatch(thunkDeleteSpotReview(reviewId))
    //         .then(() => dispatch(getSpotbyId(spotId)))
    //         .then(() => dispatch(getSpotsReviews(spotId)))
    //         .catch((error) => {
    //             console.error("Error Fetching Spot and Reviews:", error);
    //         });
    //     setModalContent(null); // Close the modal after deleting the review
    // };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };
    if (Object.keys(spot).length === 0) {
        return <div>Loading...</div>; // Display a loading state until spots are fetched
    }

    return (
        <>

            <div className="wrapper-spots">
                {spot && (
                    <>
                        <h1>{spot.name}</h1>
                        <p className="header-info">
                            {spot.city}, {spot.state}, {spot.country}{" "}
                        </p>
                        <div className="pictures">
                            <div className="left-pic">
                                {spot.SpotImages[0].url ? (
                                    <img src={spot.SpotImages[0].url} />
                                ) : (
                                    img
                                )}
                            </div>
                            {/* <div className='right-pics'> */}
                            {/* {spotImage && (
                                    <>
                                        {spotImage.url ? (<img src={spotImage.url} alt='image'></img>) : (<img src={arr} alt='image'></img>)}
                                        {spotImage.url ? (<img src={spotImage.url} alt='image'></img>) : (<img src={arr} alt='image'></img>)}
                                        {spotImage.url ? (<img src={spotImage.url} alt='image'></img>) : (<img src={arr} alt='image'></img>)}
                                        {spotImage.url ? (<img src={spotImage.url} alt='image'></img>) : (<img src={arr} alt='image'></img>)}
                                    </>
                                )} */}
                            <div className="right-pics">
                                {spot.SpotImages.slice(1).map((image, i) => {
                                    return <img src={image.url} />;
                                })}
                            </div>
                        </div>
                        <div className="host-info">
                            <div className="left-info">
                                <h3>
                                    Hosted by {spot.Owners.firstName} {spot.Owners.lastName}
                                </h3>
                                <p>
                                    {spot.description ? (
                                        spot.description
                                    ) : (
                                        <p>
                                            {" "}
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in reprehenderit in voluptate velit
                                            esse cillum dolore eu fugiat nulla pariatur. Excepteur
                                            sint occaecat cupidatat non proident, sunt in culpa qui
                                            officia deserunt mollit anim id est laborum.
                                        </p>
                                    )}
                                </p>
                            </div>
                            <div className="right-info">
                                <div className="card-info">
                                    <div className="top-info">
                                        <div className="card-left">
                                            <h2>${parseFloat(spot.price).toFixed(2)}</h2>
                                            <p>night</p>
                                        </div>
                                        <div className="card-right">
                                            {spot.avgStarRating === 0 ? (
                                                <div> </div>
                                            ) : (
                                                <>
                                                    <div className="rating-info">
                                                        <div className="inner-info">
                                                            <i
                                                                id="first-star"
                                                                className="fa-sharp fa-solid fa-star"
                                                            ></i>
                                                            <h2>
                                                                {parseFloat(spot.avgStarRating).toFixed(1)}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            <div className="card-reviews">
                                                {spot.numReviews === 0 ? (
                                                    <>
                                                        <i
                                                            id="first-star"
                                                            className="fa-sharp fa-solid fa-star"
                                                        ></i>
                                                        <p className="new">
                                                            <strong>new</strong>
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        {spot.numReviews === 1 ? (
                                                            <>
                                                                <div className="one-review">
                                                                    <h2 className="numReview">
                                                                        {spot.numReviews}
                                                                    </h2>
                                                                    <p>review</p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <h2 className="numReview">{spot.numReviews}</h2>
                                                                <p>reviews</p>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handleAlertClick} className="reserve-button">
                                        Reserve
                                    </button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="review-wrapper">
                            {/* this is the review card */}

                            {sessionUser &&
                                sessionUser.id !== spot.ownerId &&
                                spot.numReviews === 0 ? (
                                <>
                                    <div id="spotReview">
                                        <div id="left-side">
                                            <i
                                                id="second-star"
                                                className="fa-sharp fa-solid fa-star"
                                            ></i>
                                        </div>
                                        <div id="right-side">
                                            <h2>New</h2>
                                        </div>
                                    </div>
                                    <button className="review-button" onClick={handleReviewModal}>
                                        make a review
                                    </button>

                                    <p className="post-review">Be the first to post review!</p>
                                </>
                            ) : (
                                <>
                                    <div className="review-info">
                                        <div className="reviews">
                                            {sessionUser &&

                                                sessionUser.id !== spot.ownerId &&
                                                spot.numReviews >= 1 &&
                                                !hasUserIdOne ? (
                                                <>
                                                    <div id="top-review-div">
                                                        <div className="left-review-info">
                                                            <i
                                                                id="second-star"
                                                                className="fa-sharp fa-solid fa-star"
                                                            ></i>
                                                            <h2 className="new">
                                                                {parseFloat(spot.avgStarRating).toFixed(1)}
                                                            </h2>
                                                            <div className="dot-wrapper">
                                                                <div className="dot">.</div>
                                                            </div>
                                                            <h2 className="spot-review">{spot.numReviews}</h2>
                                                            <p>review</p>
                                                        </div>
                                                        <button
                                                            className="review-button"
                                                            onClick={handleReviewModal}
                                                        >
                                                            make a review
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    {spot.numReviews === 1 ? (
                                                        <>
                                                            <div className="left-review-info">
                                                                <i
                                                                    id="second-star"
                                                                    className="fa-sharp fa-solid fa-star"
                                                                ></i>
                                                                <h2 className="new">
                                                                    {parseFloat(spot.avgStarRating).toFixed(1)}
                                                                </h2>
                                                                <div className="dot-wrapper">
                                                                    <div className="dot">.</div>
                                                                </div>
                                                                <h2 className="spot-review">
                                                                    {spot.numReviews}
                                                                </h2>
                                                                <p>review</p>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {sessionUser &&
                                                                spot.ownerId &&
                                                                sessionUser.id === spot.ownerId &&
                                                                spot.numReviews === 0 ? (
                                                                <>
                                                                    <i
                                                                        id="second-star"
                                                                        className="fa-sharp fa-solid fa-star"
                                                                    ></i>
                                                                    <h2>New</h2>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {sessionUser &&

                                                                        sessionUser.id === spot.ownerId &&
                                                                        spot.numReviews >= 1 && !hasUserIdOne ? (
                                                                        <>
                                                                            <div className="left-review-info">
                                                                                <i
                                                                                    id="second-star"
                                                                                    className="fa-sharp fa-solid fa-star"
                                                                                ></i>
                                                                                <h2 className="new">
                                                                                    {parseFloat(spot.avgStarRating).toFixed(
                                                                                        1
                                                                                    )}
                                                                                </h2>
                                                                                <div className="dot-wrapper">
                                                                                    <div className="dot">.</div>
                                                                                </div>
                                                                                <h2 className="spot-review">
                                                                                    {spot.numReviews}
                                                                                </h2>
                                                                                <p>reviews</p>
                                                                            </div>
                                                                        </>

                                                                    ) : (
                                                                        <>
                                                                            {!sessionUser && spot.numReviews === 0 ? (
                                                                                <>
                                                                                    <i
                                                                                        id="second-star"
                                                                                        className="fa-sharp fa-solid fa-star"
                                                                                    ></i>
                                                                                    <h2>New</h2>
                                                                                </>
                                                                            ) : (
                                                                                <div className="left-review-info">
                                                                                    <i
                                                                                        id="second-star"
                                                                                        className="fa-sharp fa-solid fa-star"
                                                                                    ></i>
                                                                                    <h2 className="new">
                                                                                        {parseFloat(spot.avgStarRating).toFixed(
                                                                                            1
                                                                                        )}
                                                                                    </h2>
                                                                                    <div className="dot-wrapper">
                                                                                        <div className="dot">.</div>
                                                                                    </div>
                                                                                    <h2 className="spot-review">
                                                                                        {spot.numReviews}
                                                                                    </h2>
                                                                                    <p>reviews</p>
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    )}

                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* this is what shows the reviews */}
                            {loadingReviews ? (
                                <div>Loading...</div>
                            ) : (
                                <>
                                    {console.log("this is the spotReview", spotReview)}
                                    {spotReview && (
                                        <div className="review">
                                            <>
                                                {spotReview &&
                                                    spotReview.map((review) => (
                                                        <div key={review.id}>
                                                            <h2>{review.User.firstName}</h2>
                                                            <p>Time: {formatDate(review.createdAt)}</p>
                                                            <p> {review.review}</p>

                                                            {sessionUser &&
                                                                review.userId === sessionUser.id && (
                                                                    <button className="delete"
                                                                        onClick={() =>
                                                                            handleDeleteModal(review.id, spotId)
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                )}
                                                        </div>
                                                    ))}
                                            </>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default SpotsDetails;
