import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotbyId, getSpotsReviews, clearSpotData, clearSpotReviews } from '../../store/spots';
import { useModal } from "../../context/Modal";
import { thunkSetReviews } from "../../store/spots";
import { useHistory } from "react-router-dom";
import "./reviewModal.css";

function ReviewModal(props) {
  const { spotId } = props
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [hover, setHover] = useState(0);
  const [stars, setStars] = useState(0);
  const [Errors, setErrors] = useState({})
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const spotReview = useSelector((state) => state.spots.spotsReview);
  const handleMouseEnter = (num) => {
    setHover(num);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  const handleStarClick = (num) => {
    setStars(num);
  };

  const handleSubmit = (e) => {
    // ... your code for submitting the review

    // Clear spot and reviews state when changing spots
    e.preventDefault()
    const hasUserIdOne = spotReview.Reviews && spotReview.Reviews.some((obj) => obj.userId === sessionUser.id);

    if (hasUserIdOne) {
      setErrors({ error: "Review already exists for this spot" })
      return
    }
    dispatch(thunkSetReviews(spotId, { review, stars }))
    closeModal()
    
    dispatch(getSpotbyId(spotId))
      .then(() => dispatch(getSpotsReviews(spotId)))
      .catch((error) => {
        console.error('Error Fetching Spot and Reviews:', error);
      });

    // Return a cleanup function to clear spot and reviews when unmounting
    return () => {
      dispatch(clearSpotData());
      dispatch(clearSpotReviews());
      setHover(0);
      setStars(0);
    };

  };
  const isFormValid =
    review.length < 10 ||
    stars === 0;

  return (

    <div className="reviewModal">

      <h1 className="review-header">How was your stay?</h1>
      <div className="review-info">
        {Errors.error && <p className="review-error">{Errors.error}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            value={review}
            cols={40}
            rows={40}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Leave your Review Here..."

          ></textarea>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                onMouseEnter={() => handleMouseEnter(num)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleStarClick(num)}
                className={num <= (hover || stars) ? "filled" : "empty"}
              >
                <i className="fa-sharp fa-solid fa-star"></i>
              </div>
            ))}
            <label>Stars</label>
          </div>
          <button onSubmit={handleSubmit} type="submit" disabled={isFormValid}>Submit your review</button>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
