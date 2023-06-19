const express = require('express');
const router = express.Router();
const { Spot, Review, ReviewImage, SpotImage, User, Booking } = require('../../db/models');
const { requireAuth, getAvg } = require('../../utils/auth')
const { Op, Sequelize } = require('sequelize')
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { user } = require('pg/lib/defaults');
//gets all spots
router.get('/', async (req, res) => {
  const {
    page = 1,
    size = 20,
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice,
  } = req.query;

  // Validate query parameters
  if (page < 1 || size < 1) {
    return res.status(400).json({
      message: 'Bad Request',
      errors: {
        page: 'Page must be greater than or equal to 1',
        size: 'Size must be greater than or equal to 1',
      },
    });
  }

  // Build filters
  const filters = {};

  if (minLat && maxLat) {
    filters.lat = { [Op.between]: [minLat, maxLat] };
  }

  if (minLng && maxLng) {
    filters.lng = { [Op.between]: [minLng, maxLng] };
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    filters.price = { [Op.between]: [minPrice, maxPrice] };
  }

    const spots = await Spot.findAll({
      where: filters,
      limit: size,
      offset: (page - 1) * size,
    });
    const userId = req.user.id
  const spot = await Spot.unscoped().findAll({
    where: {
      ownerId: userId
    }
  })
  const spotsData = []
  for (const spot of spots) {
      const count = await Review.count({ where: { spotId: spot.id } })
      const previewImage = await SpotImage.findOne({
        where: {
          spotId: spot.id,
          preview: true,
        },
      });
      
      const avgRating = await getAvg(spot.id, count)
      spotsData.push({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: avgRating,
        previewImage: previewImage ? previewImage.url : null,
      });
    }
  if (!spot) {
    res.status(404).json({ message: 'Spot couldn\'t be found' }) 
  } else {
    return res.status(200).json({
      Spots:spotsData,
      page: Number(page),
      size: Number(size),
    });
  }
});

const validateValues = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid address.'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a city.'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a state.'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a country.'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Please provide a name that is less than 50 characters.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description.'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a price.'),
  handleValidationErrors
];
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];
const validateBookings = [
  body('endDate')
    .isISO8601().toDate(),
 body('startDate')
    .isISO8601()
    .toDate(),
  handleValidationErrors
];
//gets spots of current user
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id
  const spot = await Spot.unscoped().findAll({
    where: {
      ownerId: userId
    }
  })
  const count = await Review.count({ where: { spotId: userId } })
  
  const PreviewImage = await SpotImage.findOne({
  where:{
    spotId:userId
  }
})
const previewImage = await PreviewImage ? PreviewImage.url : null;
const averageRating = await getAvg(userId, count)
const avgRating = averageRating
const Spots = spot.map(e => ({
  id:e.id,
  ownerId: spot.ownerId,
  address: spot.address,
  city: e.city,
  state: e.state,
  country: e.country,
  lat: e.lat,
  lng: e.lng,
  name: e.name,
  description: e.description,
  price: e.price,
  createdAt: e.createdAt,
  updatedAt:e.updatedAt,
  avgRating: avgRating,
  previewImage: previewImage
}))
  if (!spot) {
    res.status(404).json({ message: 'Spot couldn\'t be found' }) 
  } else {
    res.status(200).json({ Spots })
  }
});

//creates a spot
router.post('/', validateValues, requireAuth, async (req, res) => {
  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    lat: req.body.lat,
    lng: req.body.lng,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  })
  res.json(newSpot)
})
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const spotId = req.params.spotId
  const userSpots = await Spot.findOne({
    where: {
      id: spotId,
      ownerId: req.user.id
    }
  })
  if (!userSpots) {
    res.status(404).json({ message: 'Spot couldn\'t be found' })
  } else {
    const newSpotImage = await SpotImage.create({
      spotId: spotId,
      url: req.body.url,
      preview: req.body.preview
    }
    )
    const response = {
      id: newSpotImage.id,
      url: newSpotImage.url,
      preview: newSpotImage.preview,
    };
    res.status(200).json(response)
  }
})

// get details of a Spot from an ID
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId

  const count = await Review.count({ where: { spotId: spotId } })

  const averageStarRating =  await getAvg(spotId, count)
  console.log('this is the avg rating', averageStarRating);
  
  const spot = await Spot.unscoped().findOne({
    where: { id: spotId },
    include: [SpotImage, User]
  })
  const user = await User.findOne({
    where:{
        id:req.user.id
    },
    attributes:{
        exclude:["username"]
    }
})

  if (!spot) {
    res.status(404).json({ message: 'Spot couldn\'t be found' })
  }
  else {

    const result = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.city,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews: count,
      avgStarRating: averageStarRating,
      SpotImages: spot.SpotImages,
      Owners: user
    }
    res.status(200).json(result)
  }
})
//update a spot
router.put('/:spotId', validateValues, requireAuth, async (req, res) => {
  const spotId = req.params.spotId
  console.log(spotId);
  const spot = await Spot.unscoped().findOne({
    where: {
      id: spotId,
      ownerId: req.user.id
    }
  })
  if (!spot) {
    return res.status(404).json({ message: 'Spot couldn\'t be found' })
  }
  else {
    const update = await spot.update({
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      lat: req.body.lat,
      lng: req.body.lng,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    })
    const result = {
      id: update.id,
      ownerId: update.ownerId,
      address: update.address,
      city: update.city,
      state: update.state,
      country: update.country,
      lat: update.lat,
      lng: update.lng,
      name: update.name,
      description: update.description,
      price: update.price,
      createdAt: update.createdAt,
      updatedAt: update.updatedAt
    }
    res.status(200).json(result)
  }
})
//delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findOne({
    where: {
      ownerId: req.user.id,
      id: spotId
    }
  })
  if (!spot) {
    res.status(404).json({ message: 'Spot couldn\'t be found' })
  }
  else {
    await spot.destroy()
    res.status(200).json({ message: 'successfully deleted' })
  }
})
//get all reviews based on spots ID
router.get('/:spotId/reviews', async (req, res) => {
  const spotId = req.params.spotId
  const Reviews = await Review.unscoped().findAll({
    where: {
      spotId: spotId
    },
    include: [{model:User,
      attributes:{
      exclude:['username', 'hashedPassword', 
              'email','createdAt', 'updatedAt']
      }},
      ReviewImage]
  })

  if (!Reviews.length) {
    res.status(404).json({ message: 'Spot couldn\'t be found' })
  }
  else {
    res.status(200).json({ Reviews })
  }
})
//create a review for a spot based on spots ID
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  const spotId = parseInt(req.params.spotId)
  const userId = req.user.id
  const spot = await Spot.findOne({
    where: {
      id: spotId
    }
  })
  const reviewSpot = await Review.findOne({
    where: {
      spotId: spotId,
      userId: req.user.id

    }
  })
  
  if (!spot) res.status(404).json({ message: "spot couldn\'t be found" })
  if (reviewSpot) res.status(500).json({ message: "User already has a review for this spot" })
  else {
    const newReview = await Review.create({
      spotId: spotId,
      userId: userId,
      review: req.body.review,
      stars: req.body.stars,
    })
    console.log(newReview);
    res.status(201).json(newReview)
  }
})
//get all bookings for a spot based on the spots id
router.get('/:spotId/bookings', async (req, res) => {

  
  const spotId = req.params.spotId
  const BookingsUser = await Booking.unscoped().findAll({
    where: {
      spotId: spotId
    }
  })

  if(!BookingsUser.length) {
    return res.status(404).json({message:"Spot couldn't be found"})
  }

  if (BookingsUser[0].userId !== req.user.id) {
    const Bookings = await BookingsUser.map(e => ({
      spotId:e.spotId,
      startDate:e.startDate,
      endDate:e.endDate,
    }))
    return res.status(200).json({ Bookings })
  }
  
    const bookings = await Booking.unscoped().findAll({
      where: {
        userId:req.user.id,
        spotId: spotId
      },
      include:[User]
    })
    const user = await User.findOne({
      where:{
        id:req.user.id
      },
      attributes:{
        exclude:["username"]
      }
    })
    const Bookings = await bookings.map(e => ({
      User:user,
      id:e.id,
      spotId:e.spotId,
      userId:e.userId,
      startDate:e.startDate,
      endDate:e.endDate,
      createdAt:e.createdAt,
      updatedAt:e.updatedAt
    }))
    res.status(200).json({ Bookings })
})
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const spotId = parseInt(req.params.spotId);
  const { startDate, endDate } = req.body;

  // Check if the spot exists
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  // Check if the spot belongs to the current user
  if (spot.userId === req.user.id) {
    return res.status(403).json({ message: "Spot can't be booked by the owner" });
  }

  // Validate start and end dates
  const bookingStartDate = new Date(startDate);
  const bookingEndDate = new Date(endDate);

  if (bookingEndDate <= bookingStartDate) {
    return res.status(400).json({
      message: 'Bad Request',
      errors: {
        endDate: 'endDate cannot be on or before startDate',
      },
    });
  }

  // Check for booking conflicts
  const existingBooking = await Booking.findOne({
    where: {
      spotId: spotId,
      [Op.or]: [
        {
          startDate: {
            [Op.lte]: bookingStartDate,
          },
          endDate: {
            [Op.gte]: bookingStartDate,
          },
        },
        {
          startDate: {
            [Op.lte]: bookingEndDate,
          },
          endDate: {
            [Op.gte]: bookingEndDate,
          },
        },
        {
          startDate: {
            [Op.gte]: bookingStartDate,
          },
          endDate: {
            [Op.lte]: bookingEndDate,
          },
        },
      ],
    },
  });

  if (existingBooking) {
    return res.status(403).json({
      message: 'Sorry, this spot is already booked for the specified dates',
      errors: {
        startDate: 'Start date conflicts with an existing booking',
        endDate: 'End date conflicts with an existing booking',
      },
    });
  }

  // Create the new booking
  const newBooking = await Booking.create({
    spotId: spotId,
    userId: req.user.id,
    startDate: bookingStartDate,
    endDate: bookingEndDate,
  });

  // Return the created booking
  res.status(200).json({
    id: newBooking.id,
    spotId: newBooking.spotId,
    userId: newBooking.userId,
    startDate: newBooking.startDate,
    endDate: newBooking.endDate,
    createdAt: newBooking.createdAt,
    updatedAt: newBooking.updatedAt,
  });
});


module.exports = router;
