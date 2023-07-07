import React, { useState } from 'react';
import './createSpot.css'
function CreateSpot() {
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [text, setText] = useState('')
    const [spotName, newSpotName] = useState('')
    const [price, newPrice] = useState('')
    const [prevImg, newPrevImg] = useState('')
    const [url1, newUrl1] = useState('')
    const [url2, newUrl2] = useState('')
    const [url3, newUrl3] = useState('')
    const [url4, newUrl4] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()

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
                        <label>country</label>
                        <input type='text' value={country}
                            onChange={e => setCountry(e.target.value)}
                            placeholder='country'></input>
                    </div>
                    <div className='input-field'>
                        <label> Street Address</label>
                        <input type='text' placeholder='Address'
                            value={address} onChange={e => setAddress(e.target.value)}></input>
                    </div>
                    <div className='bottom-upper-form'>
                        <div id='left' className='input-field'>
                            <label>City</label>
                            <input type='text' placeholder='City'
                                value={city} onChange={e => setCity(e.target.value)}></input>
                        </div>
                        <div id='right' className='input-field'>
                            <label>State</label>
                            <input type='text' placeholder='STATE'
                                value={state} onChange={e => setState(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='middle-upper-form'>
                        <label>
                            <h2>Describe your place to guests</h2>
                            <p>Mention the best features of your space, any special
                                amentities like fast wifi or parking,<br />
                                and what you love about the neighborhood.</p>
                        </label>
                        <textarea
                            value={text}
                            onChange={e => setText(e.target.value)}
                            cols={40}
                            rows={10}
                            placeholder='Please write at least 30 characters'
                        >

                        </textarea>
                    </div>
                    <div className='middle-upper-form'>
                        <label>
                            <h2>Create a title for your spot</h2>
                            <p>Catch guests' attention with a spot title that highlights what makes
                                your place special.
                            </p>
                        </label>
                        <input
                            value={spotName}
                            onChange={e => newSpotName(e.target.value)}
                            placeholder='Name of your spot'
                        >

                        </input>
                    </div>
                    <div className='middle-upper-form'>
                        <label>
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
                    </div>
                    <div className='middle-upper-form'>
                        <label>
                            <h2>Liven up your spot with photos</h2>
                            <p>Submit a link to at least one photo to publish your spot.</p>
                        </label>
                        <input value={prevImg} onChange={e => newPrevImg(e.target.value)}placeholder='Preview Image URL'></input>
                        <input value={url1} onChange={e => newUrl1(e.target.value)}placeholder='Image URL'></input>
                        <input value={url2} onChange={e => newUrl2(e.target.value)}placeholder='Image URL'></input>
                        <input value={url3} onChange={e => newUrl3(e.target.value)}placeholder='Image URL'></input>
                        <input value={url4} onChange={e => newUrl4(e.target.value)}placeholder='Image URL'></input>
                    </div>
                    <div className='button'>

                    <button>
                        Create Spot
                    </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateSpot
