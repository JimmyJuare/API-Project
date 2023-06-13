const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User } = require('../../db/models');
const {requireAuth} = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
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
router.delete('/:spotId', requireAuth, async(req, res) =>{
  const spotId = req.params.spotId
  const spot = await Spot.findOne({
    where:{
      id:spotId,
      ownerId:req.user.id
    }
  })
  if(!spot) res.status(404).json({message:'Spot couldn\'t be found'})
  else{
    await spot.destroy()
  res.status(200).json({message:'Successfully deleted'})
  }
})
module.exports = router;
