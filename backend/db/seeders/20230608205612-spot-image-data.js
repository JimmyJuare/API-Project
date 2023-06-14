'use strict'; 

const { SpotImage } = require('../models');

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
    options.tableName ="SpotImages";
    await SpotImage.bulkCreate([
     {
     spotId: 1,
     url: 'image url',
     preview:true
   },
     {
     spotId: 2,
     url: 'image url 2',
     preview:false
   },
     {
     spotId: 3,
     url: 'image url 3',
     preview:true
   },
 ], {validate:true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName ="SpotImages";
    await queryInterface.bulkDelete(options)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
