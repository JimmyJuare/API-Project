const express = require('express');
const router = express.Router();
const { Spot, Review, User, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

router.get('/current', requireAuth, async (req, res) => {
    const Reviews = await Review.unscoped().findAll({
        where: {
            userId: req.user.id
        },
        include: [User, Spot, ReviewImage]
    })
    res.status(200).json({ Reviews })
})
//Add an Image to a Review based on the Reviews id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const reviewId = parseInt(req.params.reviewId)
    const userId = req.user.id

    const review = await Review.findByPk(reviewId)

    const reviewImageMax = await ReviewImage.count({ where: { reviewId } })
    const max = 10
    if (!review) res.status(404).json({ message: "Review couldn\'t be found" })
    if (reviewImageMax >= 10) res.status(403).json({ message: "Maximum number of images for this resource was reached" })
    else {
        const newReviewImage = await ReviewImage.create({
            reviewId: reviewId,
            url: req.body.url
        })

        const result = {
            id: newReviewImage.id,
            url: newReviewImage.url
        }

        //   console.log(newReviewImage);
        res.status(201).json(result)
    }
})
//edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const reviewId = req.params.reviewId
    const review = await Review.findOne({
        where: {
            userId: req.user.id,
            id: reviewId
        }
    })
    if (!review) {
        return res.status(404).json({ message: 'Review couldn\'t be found' })
    }
    else {
        const update = await review.update({
            review: req.body.review,
            stars: req.body.stars,
        })
        const result = {
            id: update.id,
            userId: update.userId,
            spotId: update.spotId,
            review: update.review,
            stars: update.stars,
            createdAt: update.createdAt,
            updatedAt: update.updatedAt
        }
        res.status(200).json(result)
    }
})
router.delete('/:reviewId', requireAuth, async(req, res) =>{
    const reviewId = req.params.reviewId
    const review = await Review.findOne({
      where:{
        userId:req.user.id,
        id:reviewId
      }
    })
    if(!review){
       res.status(404).json({message:'Review couldn\'t be found'})
    } 
    else{
      await review.destroy()
    res.status(200).json({message:'successfully deleted'})
    }
  })
module.exports = router;
