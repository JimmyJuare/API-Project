const express = require('express');
const router = express.Router();
const { Spot, Review, User, ReviewImage, Booking} = require('../../db/models');
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
    const Bookings = bookingsUser.map(booking => ({
        id: booking.id,
        spotId: booking.spotId,
        Spot: booking.Spot,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      }));
    res.status(200).json( {Bookings} )
})

module.exports = router;
