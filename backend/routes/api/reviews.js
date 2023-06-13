const express = require('express');
const router = express.Router();
const { Spot, Review, User, ReviewImage } = require('../../db/models');
const {requireAuth} = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/current', requireAuth, async(req, res) => {
    const Reviews = await Review.unscoped().findAll({
        where:{
            userId:req.user.id
        },
        include:[User, Spot, ReviewImage]
    })
    res.status(200).json({Reviews})
})
//Add an Image to a Review based on the Reviews id
router.post('/:reviewId/images', requireAuth, async(req, res) =>{
    const reviewId = parseInt(req.params.reviewId)
    const userId = req.user.id
    
    const review = await Review.findByPk(reviewId)

    const reviewImageMax = await ReviewImage.count({where:{reviewId}})
    const max = 10
    if(!review) res.status(404).json({message: "Review couldn\'t be found"})
    if(reviewImageMax >= 10) res.status(403).json({message: "Maximum number of images for this resource was reached"})
    else{
        const newReviewImage = await ReviewImage.create({
            reviewId:reviewId,
            url:req.body.url
        })

        const result = {
            id:newReviewImage.id,
            url:newReviewImage.url
        }
        
    //   console.log(newReviewImage);
      res.status(201).json(result)
    }
  })
module.exports = router;
