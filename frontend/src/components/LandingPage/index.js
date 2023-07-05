import React, { useEffect } from 'react';
import {getAllSpots} from '../../store/spots'
import { useDispatch, useSelector } from 'react-redux';

function LandingPage(){
    const img =<img src='https://png-files-for-api.s3.us-east-2.amazonaws.com/png/photo-1600596542815-ffad4c1539a9.jpg'></img>
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spots.spots.Spots);
    {console.log(spots)}
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);
    if (!spots) {
        return <div>Loading...</div>; // Display a loading state until spots are fetched
      }
    return (
        <>
        <div className='wrapper'>
            {spots.map((spot) => (
                <div key={spot.id} className='spot-item'>
                    {img}
                    <div className='info'>
                    <h1>{spot.city}{spot.state}</h1>
                    <p>${spot.price} night</p>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default LandingPage
