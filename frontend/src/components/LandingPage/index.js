import React, { useEffect } from 'react';
import { getAllSpots, getSpotbyId } from '../../store/spots'
import { useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import './spots.css'
import { Link } from 'react-router-dom/';
function LandingPage() {
    // const [shouldRefresh, setShouldRefresh] = useState(false);
    const arr =
        [
            'https://png-files-for-api.s3.us-east-2.amazonaws.com/png/depositphotos_57659575-stock-photo-beach-house.jpg',
            'https://png-files-for-api.s3.us-east-2.amazonaws.com/png/istockphoto-1393537665-612x612.jpg',
            'https://png-files-for-api.s3.us-east-2.amazonaws.com/png/photo-1600596542815-ffad4c1539a9.jpg',
            'https://png-files-for-api.s3.us-east-2.amazonaws.com/png/pexels-simon-sikorski-1131573.jpg',
            'https://png-files-for-api.s3.us-east-2.amazonaws.com/png/istockphoto-522540838-612x612.jpg',
            'https://png-files-for-api.s3.us-east-2.amazonaws.com/png/istockphoto-922534026-612x612.jpg',
            'https://png-files-for-api.s3.us-east-2.amazonaws.com/png/Screen-Shot-2017-02-16-at-4.08.29-PM.png'
        ]
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spots.spots.Spots);
    // useEffect(() => {
    //     if (shouldRefresh) {
    //       setShouldRefresh(false);
    //       window.location.reload();
    //     }
    //   }, [shouldRefresh]);

//   const handleSpotClick = () => {
//     setShouldRefresh(true);
//   };
//     let spot;
    useEffect(() => {
        dispatch(getAllSpots())
        
    }, [dispatch]);
     // Check if the spots array is null or empty
  if (!spots || spots.length === 0) {
    return <div>Loading...</div>; // Display a loading state until spots are fetched
  }
    return (
        <>
                {console.log("Spots:", spots)}
            <div className='wrapper'>
                {spots && (
                    <>
                        {spots.map((spot, index) => (
                            <Link to={`/spots/${spot.id}`} key={spot.id} className='spot-item'>
                                {console.log(spot.id)}
                                <img className='image' src={spot.previewImage}
                                    alt="Spot" />
                                <div className='info'>
                                    <div className='inner-info'>
                                        <p><strong>{spot.city}, {spot.state}</strong></p>
                                        <p>${spot.price} night</p>
                                    </div>
                                    <div className='rating'>
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                        {spot.avgRating === 0 ? (
                                            <p>new</p>
                                        ) : (<p>{spot.avgRating}</p>)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default LandingPage
