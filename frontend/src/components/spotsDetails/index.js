import React, { useEffect } from 'react';
import { getSpotbyId } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './spotsDetails.css'
function SpotsDetails() {
    const img = <img src='https://png-files-for-api.s3.us-east-2.amazonaws.com/png/photo-1600596542815-ffad4c1539a9.jpg'></img>
    const insideImg = <img src='https://png-files-for-api.s3.us-east-2.amazonaws.com/png/photo-1600596542815-ffad4c1539a9.jpg'></img>
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.spotsbyId)
    useEffect(() => {
        dispatch(getSpotbyId(spotId))
        console.log(spot);
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
                            {img}
                            <div className='right-pics'>
                                {img}
                                {img}
                                {img}
                                {img}
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
                                            <div className='rating-info'>
                                                <div>
                                                    <i id='first-star' class="fa-sharp fa-solid fa-star"></i>
                                                    <h2>{spot.avgStarRating}</h2>
                                                </div>
                                            </div>
                                            <div className='reviews'>
                                                {spot.numReviews <= 1 ?
                                                    <>
                                                        <h2>{spot.numReviews}</h2>
                                                        <p>review</p>
                                                    </> :
                                                    <>
                                                        <h2>{spot.numReviews}</h2>
                                                        <p>reviews</p>
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

                            <div className='review-info'>
                                <div className='left-review-info'>
                                    <i id='second-star' class="fa-sharp fa-solid fa-star"></i>
                                    <h2>{spot.avgStarRating}</h2>
                                </div>
                                <div className='reviews'>
                                    {spot.numReviews <= 1 ?
                                        <>
                                            <h2>{spot.numReviews}</h2>
                                            <p>review</p>
                                        </> :
                                        <>
                                            <h2>{spot.numReviews}</h2>
                                            <p>reviews</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default SpotsDetails
