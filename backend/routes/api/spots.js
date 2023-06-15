const express = require('express');
const router = express.Router();
const { Spot, Review, ReviewImage, SpotImage, User } = require('../../db/models');
const {requireAuth} = require('../../utils/auth')
const { Op, Sequelize } = require('sequelize')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { user } = require('pg/lib/defaults');
//gets all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    res.json({
        Spots:spots
    })
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
      .isLength({max:50})
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
  //gets spots of current user
router.get('/current', requireAuth, async (req, res) => {
    const currentUser = await Spot.unscoped().findAll({
      where:{
        ownerId:req.user.id
      },
      include:[Review, SpotImage]
      
    })
    if(!currentUser){
      res.status(404).json({message:'Spot couldn\'t be found'})
    }else{
      res.status(200).json({currentUser})
    }
  });

  //creates a spot
  router.post('/', validateValues, requireAuth, async (req, res) => {
    const newSpot = await Spot.create({
      ownerId:req.user.id,
      address:req.body.address,
      city:req.body.city,
      state:req.body.state,
      country:req.body.country,
      lat:req.body.lat,
      lng:req.body.lng,
      name:req.body.name,
      description:req.body.description,
      price:req.body.price
    }) 
    res.json(newSpot)
  })
  router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const userSpots = await Spot.findOne({
      where:{
        id:spotId,
        ownerId:req.user.id
      }
    })
    if(!userSpots){
      res.status(404).json({message:'Spot couldn\'t be found'})
    } else{
      const newSpotImage = await SpotImage.create({
        spotId:spotId,
        url:req.body.url,
        preview:req.body.preview
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
router.get('/:spotId', async(req, res) =>{
  const spotId = req.params.spotId

  const count = await Review.count({where:{spotId:spotId}})
  
  const countSum = await Review.sum('stars',{
    where:{
      spotId:spotId
    },
    attributes: [[Sequelize.fn('SUM', Sequelize.col('stars')), 'totalRating']],
  })
  const totalRating =  countSum || 0
  
  const averageStarRating = totalRating > 0 ? parseFloat((totalRating/count).toFixed(1)) : 0

  const spot = await Spot.unscoped().findOne({
    where:{id:spotId},
    include:[SpotImage,User]
  })
  
  if(!spot){
    res.status(404).json({message:'Spot couldn\'t be found'})
  } 
  else{

  const result = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city:spot.city,
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
      avgStarRating:averageStarRating,
      SpotImages:spot.SpotImages,
      Owners:spot.User
  }
  res.status(200).json(result)
  }
})
//update a spot
router.put('/:spotId', validateValues, requireAuth, async(req, res) => {
  const spotId = req.params.spotId
  console.log(spotId);
  const spot = await Spot.unscoped().findOne({
    where:{
      id:spotId,
      ownerId:req.user.id
    }
  })
  if(!spot){
    return res.status(404).json({message:'Spot couldn\'t be found'})
  }
  else{
    const update = await spot.update({
      address:req.body.address,
      city:req.body.city,
      state:req.body.state,
      country:req.body.country,
      lat:req.body.lat,
      lng:req.body.lng,
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
    })
    const result = {
      id:update.id,
      ownerId:update.ownerId,
      address:update.address,
      city:update.city,
      state:update.state,
      country:update.country,
      lat:update.lat,
      lng:update.lng,
      name:update.name,
      description:update.description,
      price:update.price,
      createdAt:update.createdAt,
      updatedAt:update.updatedAt
    }
    res.status(200).json(result)
  }
})
//delete a spot
router.delete('/:spotId', requireAuth, async(req, res) =>{
  const spotId = req.params.spotId
  const spot = await Spot.findOne({
    where:{
      ownerId:req.user.id,
      id:spotId
    }
  })
  if(!spot){
     res.status(404).json({message:'Spot couldn\'t be found'})
  } 
  else{
    await spot.destroy()
  res.status(200).json({message:'successfully deleted'})
  }
})
//get all reviews based on spots ID
router.get('/:spotId/reviews', async(req, res) =>{
  const spotId = req.params.spotId
  const Reviews = await Review.findAll({
    where:{
      spotId:spotId
    },
    include:[User, ReviewImage]
  })
  if(!Reviews.length){
     res.status(404).json({message:'Spot couldn\'t be found'})
  } 
  else{
  res.status(200).json({Reviews})
  }
})
//create a review for a spot based on spots ID
router.post('/:spotId/reviews', requireAuth, validateReview, async(req, res) =>{
  const spotId = parseInt(req.params.spotId)
  const userId = req.user.id
  const spot = await Spot.findOne({
    where:{
      id:spotId
    }
  })
  const reviewSpot = await Review.findOne({
    where:{
      spotId:spotId,
      userId:req.user.id

    }
  })
  if(!spot) res.status(404).json({message: "spot couldn\'t be found"})
  if(reviewSpot) res.status(500).json({message: "User already has a review for this spot"})
  else{
    const newReview = await Review.create({
      spotId:spotId,
      userId:userId,
      review:req.body.review,
      stars:req.body.stars,
    })
    console.log(newReview);
    res.status(201).json(newReview)
  }
})
module.exports = router;
