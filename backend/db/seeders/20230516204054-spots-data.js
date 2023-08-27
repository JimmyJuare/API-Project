'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Spot.bulkCreate([
        {
          ownerId:1,
          address:'5555444 west street',
          city:'newyork',
          state:'newyork',
          country: "USA",
          lat:245.54443455,
          lng:44.550694229,
          name:'mansion',
          description: "best mansion ever",
          price:332.20
        },
        {
          ownerId:2,
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "USA",
          lat: 37.76453585,
          lng: -122.47303276,
          name: "App Academy",
          description: "Place where web developers are created",
          price: 123.40
        },
        {
          ownerId:3,
          address: '444455444 east street',
          city:'chicago',
          state:'Illinois',
          country: "USA",
          lat:275.34553434,
          lng:47.55444,
          name:'condo',
          description: "nice place with big rooms",
          price:443.50
        },
        {
          ownerId:3,
          address: "5345 Marlboro Lane",
          city: "San Diego",
          state: "California",
          country: "United States of America",
          name: "House",
          description: "Great WiFi",
          price: 123.00,
        },
        {
          ownerId:3,
          address: "123 Main Street",
          city: "Los Angeles",
          state: "California",
          country: "United States of America",
          name: "Apartment",
          description: "Spacious living room",
          price: 250.00,
        },
        {
          ownerId:2,
          address: "789 Elm Avenue",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          name: "Condo",
          description: "Beautiful view of the city",
          price: 400.00,
        },
        {
          ownerId:1,
          address: "432 Park Place",
          city: "New York City",
          state: "New York",
          country: "United States of America",
          name: "Townhouse",
          description: "Modern kitchen",
          price: 800.00,
        },
        {
          ownerId:1,
          address: "9876 Beach Avenue",
          city: "Miami",
          state: "Florida",
          country: "United States of America",
          name: "Beach House",
          description: "Private pool",
          price: 600.00,
        },
        {
          ownerId:3,
          address: "321 Oak Street",
          city: "Chicago",
          state: "Illinois",
          country: "United States of America",
          name: "Studio Apartment",
          description: "Close to downtown",
          price: 200.00,
        },
        {
          ownerId:2,
          address: "5678 Mountain View Drive",
          city: "Denver",
          state: "Colorado",
          country: "United States of America",
          name: "Cabin",
          description: "Surrounded by nature",
          price: 300.00,
        },
        {
          ownerId:2,
          address: "2468 Lakeside Road",
          city: "Seattle",
          state: "Washington",
          country: "United States of America",
          name: "Lake House",
          description: "Boat dock included",
          price: 700.00,
        },
        {
          ownerId:1,
          address: "1357 Maple Court",
          city: "Austin",
          state: "Texas",
          country: "United States of America",
          name: "Duplex",
          description: "Garden backyard",
          price: 350.00,
        }
      ], {validate:true})
      
    } catch (error) {
      console.log(error);
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName ="Spots";

    await queryInterface.bulkDelete(options)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
