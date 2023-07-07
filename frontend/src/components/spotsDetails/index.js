import React, { useEffect } from 'react';
import { getSpotbyId, getSpotsReviews } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './spotsDetails.css'
function SpotsDetails() {
    const img = <img src='https://png-files-for-api.s3.us-east-2.amazonaws.com/png/photo-1600596542815-ffad4c1539a9.jpg'></img>
    const insideImg = <img src='https://png-files-for-api.s3.us-east-2.amazonaws.com/png/inside-house.jpg'></img>
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.spotsbyId)
    const spotReview = useSelector(state => state.spots.spotsReview)
    useEffect(() => {
        dispatch(getSpotbyId(spotId))
        dispatch(getSpotsReviews(spotId))
    }, [dispatch, spotId]);
    const handleAlertClick = () => {
        alert('Feature Coming soon!');
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
                                {img}
                            </div>
                            <div className='right-pics'>
                                {insideImg}
                                {insideImg}
                                {insideImg}
                                {insideImg}
                            </div>
                        </div>
                        <div className='host-info'>
                            <div className='left-info'>
                                <h3>Hosted by {spot.Owners.firstName} {spot.Owners.lastName}</h3>
                                <p>
                                    {spot.description}
                                    Lorem ipsum dolor sit amet,
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
                                    est laborum.
                                </p>
                            </div>
                            <div className='right-info'>
                                <div className='card-info'>
                                    <div className='top-info'>

                                        <div className='card-left'>
                                            <h2>${spot.price}0</h2>
                                            <p>night</p>
                                        </div>
                                        <div className='card-right'>
                                            {spot.avgStarRating === 0 ? (
                                                <div> </div>
                                            ) : (
                                                <>
                                                    <div className='rating-info'>
                                                        <div>
                                                            <i id='first-star' class="fa-sharp fa-solid fa-star"></i>
                                                            <h2>{spot.avgStarRating}</h2>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            <div className='reviews'>
                                                {spot.numReviews === 0 ? (
                                                    <p className='new'>new</p>
                                                ) :
                                                    <>
                                                        {spot.numReviews === 1 ? (
                                                            <>
                                                            
                                                                <h2 className='numReview'>{spot.numReviews}</h2>
                                                                <p>review</p>
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
                            {sessionUser && (sessionUser.id  !==  spot.ownerId) ?
                                (
                                    <>
                                        <button>
                                            make a review
                                        </button>
                                    </>
                                ) :
                                (
                                    <>

                                        <div className='review-info'>
                                            <div className='left-review-info'>
                                                <i id='second-star' class="fa-sharp fa-solid fa-star"></i>
                                                <h2>{spot.avgStarRating}</h2>
                                            </div>
                                            <div className='reviews'>
                                            {spot.numReviews === 0 ? (
                                                    <p className='new'>new</p>
                                                ) :
                                                    <>
                                                        {spot.numReviews === 1 ? (
                                                            <>

                                                                <h2>{spot.numReviews}</h2>
                                                                <p>review</p>
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
                            {spotReview && (
                                <div className="review">
                                    {spotReview.Reviews.map((review) => (
                                        <div key={review.id}>

                                            <h2>{review.User.firstName}</h2>
                                            <p>Time: {review.createdAt}</p>
                                            <p> {review.review}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default SpotsDetails
