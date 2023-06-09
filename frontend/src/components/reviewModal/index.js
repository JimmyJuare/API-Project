import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSetReviews } from "../../store/spots";
import { useHistory } from "react-router-dom";
import "./reviewModal.css";

function ReviewModal(props) {
    const {spotId} = props
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [hover, setHover] = useState(0);
  const [stars, setStars] = useState(0);
  const [Errors, setErrors] = useState({})
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const spotReview = useSelector((state) => state.spots.spotsReview);
  const history = useHistory()
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

    const hasUserIdOne = spotReview.Reviews && spotReview.Reviews.some((obj) => obj.userId === sessionUser.id);
    
    if (hasUserIdOne) {
        setErrors({ error: "Review already exists for this spot" })
        return
    }
    dispatch(thunkSetReviews(spotId, { review, stars }))
    closeModal()
    // Reset hover and stars after submitting the review
    window.location.reload();
    setHover(0);
    setStars(0);
  };

  return (
    <>
      <h1>How was your stay?</h1>
    <div className="reviewModal">
      {Errors.error && <p className="review-error">{Errors.error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          cols={40}
          rows={40}
          onChange={(e) => setReview(e.target.value)}
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
        </div>
        <button type="submit">Submit your review</button>
      </form>
    </div>
    </>
  );
}

export default ReviewModal;
