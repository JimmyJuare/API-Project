import React, { useEffect, useState } from 'react';
import { getSpotbyId, getSpotsReviews, thunkDeleteSpot, thunkDeleteSpotReview } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './spotsDetails.css'
import ReviewModal from '../reviewModal';
import { useModal } from '../../context/Modal';
import DeleteReviewModal from '../deleteReviewModal';
function SpotsDetails() {
    const img = <img src='https://png-files-for-api.s3.us-east-2.amazonaws.com/png/photo-1600596542815-ffad4c1539a9.jpg'></img>
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.spotsbyId)
    const spotReview = useSelector(state => state.spots.spotsReview || [])
    const spotImages = useSelector(state => state.spots.spotsbyId || [])
    const { setModalContent } = useModal();
    const hasUserIdOne = spotReview.Reviews && spotReview.Reviews.some((obj) => obj.userId === sessionUser.id);
    let btn
    useEffect(() => {
        dispatch(getSpotbyId(spotId))
        dispatch(getSpotsReviews(spotId))
    }, [dispatch, spotId]);
    const handleAlertClick = () => {
        alert('Feature Coming soon!');
    };
    const handleReviewModal = () => {
        const content = <ReviewModal spotId={spotId} />; // Save the JSX element to a variable

        setModalContent(content); // Set the modal content to be rendered
    };
    const handleDeleteModal = (reviewId) => {
      const content = <DeleteReviewModal reviewId={reviewId} />;
      setModalContent(content);
    };
  
    const handleDeleteReview = (reviewId) => {
      dispatch(thunkDeleteSpotReview(reviewId));
      handleDeleteModal(null); // Close the modal after deleting the review
    };

    return (
        <>
            <div className='wrapper-spots'>
                {spot && (
                    <>
                        <h1>{spot.name}</h1>
                        <p className='header-info'>{spot.city}, {spot.state}, {spot.country} </p>
                        <div className='pictures'>
                            <div className='left-pic'>

                                {spotImages.SpotImages[0].url ? <img src={spotImages.SpotImages[0].url} /> : img}
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
                            <div className='right-pics'>
                                {spotImages.SpotImages.slice(1).map((image, i) => {

                                    return (
                                        <img src={image.url} />
                                    )
                                }
                                )}
                            </div>
                        </div>
                        <div className='host-info'>
                            <div className='left-info'>
                                <h3>Hosted by {spot.Owners.firstName} {spot.Owners.lastName}</h3>
                                <p>
                                    {spot.description ? spot.description : (<p> Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit,
                                        sed do eiusmod tempor incididunt
                                        ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute
                                        irure dolor in reprehenderit
                                        in voluptate velit esse cillum
                                        dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat
                                        non proident, sunt in culpa qui
                                        officia deserunt mollit anim id
                                        est laborum.</p>)}
                                </p>
                            </div>
                            <div className='right-info'>
                                <div className='card-info'>
                                    <div className='top-info'>

                                        <div className='card-left'>
                                            <h2>${spot.price}</h2>
                                            <p>night</p>
                                        </div>
                                        <div className='card-right'>
                                            {spot.avgStarRating === 0 ? (
                                                <div> </div>
                                            ) : (
                                                <>
                                                    <div className='rating-info'>
                                                        <div className='inner-info'>
                                                            <i id='first-star' class="fa-sharp fa-solid fa-star"></i>
                                                            <h2>{spot.avgStarRating}</h2>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            <div className='card-reviews'>
                                                {spot.numReviews === 0 ? (
                                                    <>
                                                        <i id='first-star' class="fa-sharp fa-solid fa-star"></i>
                                                        <p className='new'><strong>new</strong></p>
                                                    </>
                                                ) :
                                                    <>
                                                        {spot.numReviews === 1 ? (
                                                            <>
                                                                <div className='one-review'>
                                                                    <h2 className='numReview'>{spot.numReviews}</h2>
                                                                    <p>review</p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>

                                                                <h2 className='numReview'>{spot.numReviews}</h2>
                                                                <p>reviews</p>
                                                            </>
                                                        )}
                                                    </>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                    <button onClick={handleAlertClick} className='reserve-button'>
                                        Reserve
                                    </button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='review-wrapper'>
                            {sessionUser && (sessionUser.id !== spot.ownerId) ?
                                (
                                    <>
                                        {hasUserIdOne ? (
                                            <>
                                                <button className="review-button hidden" onClick={handleReviewModal}>
                                                    make a review
                                                </button>
                                                {spot.numReviews === 1 ? (
                                                    <>
                                                        <div id='left-review-info'>
                                                            <div id='left-review'>
                                                                <i id='second-star' class="fa-sharp fa-solid fa-star"></i>
                                                                <h2 className='new'>{spot.avgStarRating}</h2>
                                                            </div>
                                                            <div id='right-review'>
                                                                <h2>{spot.numReviews}</h2>
                                                                <p>review</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div id='spotReview'>
                                                            <div id='left-side'>
                                                                <i id='second-star' class="fa-sharp fa-solid fa-star"></i>
                                                                <p className=''>{spot.avgStarRating}</p>
                                                            </div>
                                                            <div id='right-side'>
                                                                <h2>{spot.numReviews}</h2>
                                                                <p>reviews</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <div id='left-review-info'>
                                                    <i id='second-star' class="fa-sharp fa-solid fa-star"></i>
                                                    <h2 className='new'>New</h2>
                                                </div>
                                                <button className="review-button" onClick={handleReviewModal}>
                                                    make a review
                                                </button>

                                                <p className='post-review'>Be the first to post review!</p>
                                            </>
                                        )}
                                    </>
                                ) :
                                (
                                    <>

                                        <div className='review-info'>
                                            <div className='reviews'>
                                                {spot.numReviews === 0 ? (
                                                    <>
                                                        <div className='left-review-info'>
                                                            <i id='second-star' class="fa-sharp fa-solid fa-star"></i>
                                                            <h2 className='new'>New</h2>
                                                        </div>
                                                    </>
                                                ) :
                                                    <>
                                                        {spot.numReviews === 1 ? (
                                                            <>
                                                                <div className='left-review-info'>
                                                                    <i id='second-star' class="fa-sharp fa-solid fa-star"></i>
                                                                    <h2 className='new'>New</h2>
                                                                    <h2>{spot.numReviews}</h2>
                                                                    <p>review</p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>

                                                                <h2>{spot.numReviews}</h2>
                                                                <p>reviews</p>
                                                            </>
                                                        )}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </>
                                )}
                            {spotReview && spotReview.Reviews && (
                                <div className="review">
                                    {(!spotReview.Reviews ?
                                        (<div>Loading...</div>) :
                                        (<>
                                            {spotReview && spotReview.Reviews.map((review) => (
                                                <div key={review.id}>

                                                    <h2>{review.User.firstName}</h2>
                                                    <p>Time: {review.createdAt}</p>
                                                    <p> {review.review}</p>
                                                    {review.userId === sessionUser.id && (
                                                        <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                                                    )}
                                                </div>
                                            ))}
                                        </>)
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div >
        </>
    )
}

export default SpotsDetails
