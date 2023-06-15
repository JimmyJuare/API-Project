'use strict';
const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('06/15/2023'),
        endDate: new Date('06/20/2023'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('07/01/2023'),
        endDate: new Date('07/07/2023'),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        spotId: 3,
        userId: 3,
        startDate: new Date('08/01/2023'),
        endDate: new Date('08/07/2023'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more dummy data as needed
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName ="Bookings";
    await queryInterface.bulkDelete(options)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
