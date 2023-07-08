import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/';
import { thunkSetSpot } from '../../store/spots';
import { getSpotbyId } from '../../store/spots';

import './createSpot.css'
import { useDispatch, useSelector } from 'react-redux';
function CreateSpot() {
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDesrcription] = useState('')
    const [name, newName] = useState('')
    const [price, newPrice] = useState(0)
    const [prevImg, newPrevImg] = useState('')
    const [Errors, setErrors] = useState('')
    const [url1, newUrl1] = useState('')
    const [url2, newUrl2] = useState('')
    const [url3, newUrl3] = useState('')
    const [url4, newUrl4] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()
    const  handleSubmit = async(e) => {
        e.preventDefault()
        const errors = {}
        if (!country.length) {
            errors.country = 'Country is required'
        }
        if (!address.length) errors.address = 'Address is required'
        if (!city.length) errors.city = 'City is required'
        if (!state.length) errors.state = 'State is required'
        if (!description.length) errors.text = 'Description needs a minimum of 30 characters'
        if (!name.length) errors.name = 'Name is required'
        if (!price.length) errors.price = 'Price is required'
        if (!prevImg.length) errors.prevImg = 'Preview Image is required'
        if (!url1.length) errors.url1 = 'Image URL must end in .png, .jpg, or .jpeg'

        if (Object.keys(errors).length === 0) {
            // If no errors, proceed with form submission
            const spotData = {
                address,
                city,
                state,
                country,
                name,
                description,
                price,
            };
      
            const newSpot = await dispatch(thunkSetSpot(spotData));
            console.log(newSpot);
            if (newSpot) {
                
              const newSpotId = newSpot.id; // Obtain the new spot's ID
              
              // Redirect to the new spot's page
              history.push(`/spots/${newSpotId}`);
            }
          } else {
            // If there are errors, update the errors state
            setErrors(errors);
          }
      
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='upper-form'>
                    <label className='description'>
                        <h2>Create A Spot</h2>
                        <h3>Where's your place located?</h3>
                        <p>Guests will only get your exact address once they booked areservation.</p>
                    </label>
                    <div className='input-field'>
                        <label>country <p className='errors'>{Errors.country}</p></label>
                        <input type='text' value={country}
                            onChange={e => setCountry(e.target.value)}
                            placeholder='country'></input>
                    </div>
                    <div className='input-field'>
                        <label> Street Address <p className='errors'>{Errors.address}</p></label>
                        <input type='text' placeholder='Address'
                            value={address} onChange={e => setAddress(e.target.value)}></input>
                    </div>
            
                    <div className='bottom-upper-form'>
                        <div id='left' className='input-field'>
                            <label>City <p className='errors'>{Errors.city}</p></label>
                            <input type='text' placeholder='City'
                                value={city} onChange={e => setCity(e.target.value)}></input>
                        </div>
                        
                        <div id='right' className='input-field'>
                            <label>State <p className='errors'>{Errors.state}</p></label>
                            <input type='text' placeholder='STATE'
                                value={state} onChange={e => setState(e.target.value)}></input>
                        </div>
                        
                    </div>
                    <div className='middle-upper-form'>
                        <label className='description'>
                            <h2>Describe your place to guests</h2>
                            <p>Mention the best features of your space, any special
                                amentities like fast wifi or parking,<br />
                                and what you love about the neighborhood.</p>
                        </label>

                        <textarea
                            value={description}
                            onChange={e => setDesrcription(e.target.value)}
                            cols={40}
                            rows={10}
                            placeholder='Please write at least 30 characters'
                            >

                        </textarea>
                        <p className='errors'>{Errors.description}</p>
                    </div>
                    <div className='middle-upper-form'>
                        <label className='description'>
                            <h2>Create a title for your spot</h2>
                            <p>Catch guests' attention with a spot title that highlights what makes
                                your place special.
                            </p>
                        </label>
                        <input
                            value={name}
                            onChange={e => newName(e.target.value)}
                            placeholder='Name of your spot'
                        >

                        </input>
                            <p className='errors'>{Errors.name}</p>
                    </div>
                    <div className='middle-upper-form'>
                        <label className='description'>
                            <h2>Set a base price for your spot</h2>
                            <p>Competitive pricing can help your listing stand out and rank higher
                                in search results</p>
                        </label>
                        <input
                            value={price}
                            onChange={e => newPrice(e.target.value)}
                            placeholder='Price per night (USD)'
                        >

                        </input>
                        <p className='errors'>{Errors.price}</p>
                    </div>
                    <div className='middle-upper-form'>
                        <label className='description'>
                            <h2>Liven up your spot with photos</h2>
                            <p>Submit a link to at least one photo to publish your spot.</p>
                        </label>
                        <input value={prevImg} onChange={e => newPrevImg(e.target.value)} placeholder='Preview Image URL'></input>
                        <p className='errors'>{Errors.prevImg}</p>
                        <input value={url1} onChange={e => newUrl1(e.target.value)} placeholder='Image URL'></input>
                        <p className='errors'>{Errors.url1}</p>
                        <input value={url2} onChange={e => newUrl2(e.target.value)} placeholder='Image URL'></input>
                        <input value={url3} onChange={e => newUrl3(e.target.value)} placeholder='Image URL'></input>
                        <input value={url4} onChange={e => newUrl4(e.target.value)} placeholder='Image URL'></input>
                    </div>

                    <div className='button'>

                        <button className='create-spot'
                            type='submit'>
                            Create Spot
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateSpot
