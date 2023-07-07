import React, { useEffect } from 'react';
import { getCurrSpots } from '../../store/spots';
import { Link } from 'react-router-dom/';
import './CurrentSpot.css'
import { useDispatch, useSelector } from 'react-redux';
function CurrentSpots(){
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spots.currentSpot)
    useEffect(() => {
        dispatch(getCurrSpots())
    }, [dispatch]);
    if (!spots) {
        return <div>Loading...</div>; // Display a loading state until spots are fetched
    }
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
    return(
        <>
        {spots.Spots && (
            spots.Spots.map((spot, index) => (
                <>
                <div className='spot-item'>
                <Link to={`/spots/${spot.id}`} key={spot.id} className='item'>
                            
                <img src={arr[index % arr.length]} alt="Spot" />
                <div className='info'>
                    <div className='inner-info'>
                        <p><strong>{spot.city}, {spot.state}</strong></p>
                        <p>${spot.price} night</p>
                    </div>
                        <div className='rating'>
                            <i class="fa-sharp fa-solid fa-star"></i>
                            <p>{spot.avgRating}</p>
                        </div>
                </div>
            </Link>

                <div className='delete-and-update'>
                    <button>Update</button>
                    <button>Delete</button>
                </div>
                </div>
            </>
                ))
        )}
        </>
    )
}

export default CurrentSpots
