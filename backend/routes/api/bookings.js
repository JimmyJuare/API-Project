const express = require('express');
const router = express.Router();
const { Spot, Review, User, SpotImage, Booking} = require('../../db/models');
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
//get all bookings by current user
router.get('/current', requireAuth, async (req, res) => {
    
    const bookingsUser = await Booking.unscoped().findAll({
        where: {
            userId: req.user.id
        }
        , include:[Spot]
    })
    const PreviewImage = await SpotImage.findOne({
        where:{
          spotId:req.user.id
        }
      })

      const previewImage = await PreviewImage.url

    const Bookings = bookingsUser.map(booking => ({
        id: booking.id,
        spotId: booking.spotId,
        Spot: {
            id:booking.Spot.id,
            spotId:booking.Spot.spotId,
            address:booking.Spot.address,
            city:booking.Spot.city,
            state:booking.Spot.state,
            country:booking.Spot.country,
            lat:booking.Spot.lat,
            lng:booking.Spot.lng,
            name:booking.Spot.name,
            price:booking.Spot.price,
            preview:previewImage
        },
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      }));
    res.status(200).json( {Bookings} )
})
module.exports = router;
