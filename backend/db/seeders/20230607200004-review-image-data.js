'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await ReviewImage.bulkCreate([
    {
    reviewId: 1,
    url: 'image url',
  },
    {
    reviewId: 2,
    url: 'image url 2',
  },
    {
    reviewId: 3,
    url: 'image url 3',
  },
], {validate:true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName ="ReviewImages";
    await queryInterface.bulkDelete(options)
  }
};
