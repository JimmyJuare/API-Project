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

      const previewImage = await SpotImage.findOne({
        where: {
          spotId: req.user.id,
          preview: true,
        },
      });

    const Bookings = bookingsUser.map(booking => ({
        id: booking.id,
        spotId: booking.spotId,
        Spot: {
            id:booking.Spot.id,
            ownerId:booking.Spot.ownerId,
            address:booking.Spot.address,
            city:booking.Spot.city,
            state:booking.Spot.state,
            country:booking.Spot.country,
            lat:booking.Spot.lat,
            lng:booking.Spot.lng,
            name:booking.Spot.name,
            price:booking.Spot.price,
            previewImage:previewImage ? previewImage.url : null,
        },
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      }));
    res.status(200).json( {Bookings} )
})
router.put('/:bookingId', requireAuth, async (req, res) => {
    try{
    const bookingId = parseInt(req.params.bookingId)
    const {startDate, endDate } = req.body
    const bookings = await Booking.findOne({
        where: {
            id:bookingId,
            userId: req.user.id
        }
    })
    if(!bookings) return  res.status(404).json({ message: "Booking couldn't be found" });
    const currTime = new Date()
    const bookingEndDate = new Date(bookings.endDate)
    if(bookingEndDate < currTime) return res.status(403).json({message:"Past Bookings cannot be edited"})
    
    if (new Date(endDate) < new Date(startDate)) {
        return res.status(400).json({
          message: "Bad Request",
          errors: {
            endDate: "endDate cannot come before startDate",
          },
        });
      }
      bookings.startDate = startDate;
      bookings.endDate = endDate;
      
      await bookings.save()

      res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})
router.delete('/:bookingId', requireAuth, async (req, res) => {

        const bookingId = req.params.bookingId
        const booking = await Booking.findOne({
            where:{
                id:bookingId,
                userId: req.user.id
            }
        })
        if(!booking) return res.status(404).json({message:"Booking couldn't be found"})
        const start =new Date(booking.startDate)
        const end = new Date(booking.endDate)
        const currentDate = new Date()
        if((currentDate.getTime() >= start.getTime())) return res.status(403).json({message:"Bookings that have been started can't be deleted"})
        await booking.destroy()
        return res.status(200).json({message:'Successfully deleted'})
    
})
module.exports = router;
