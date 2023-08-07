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
     url: 'https://a0.muscache.com/im/pictures/e7e72c42-3268-4e06-992b-bb75b6aa0a00.jpg?im_w=720',
     preview:true
   },
     {
     spotId: 1,
     url: 'https://a0.muscache.com/im/pictures/612115b3-ab1e-49f5-8c29-976148485acb.jpg?im_w=720',
     preview: false
   },
     {
     spotId: 1,
     url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46677438/original/e1ea285e-f417-43e3-80ae-b1d6114c9d90.jpeg?im_w=720',
     preview: false
   },
     {
     spotId: 2,
     url: 'https://a0.muscache.com/im/pictures/710dd9a0-e996-4a51-b494-e3f37eed4924.jpg?im_w=720',
     preview:true
   },
     {
     spotId: 3,
     url: 'https://a0.muscache.com/im/pictures/2659b431-8ddd-47b4-8dd3-28f9bc313abe.jpg?im_w=720',
     preview:true
   },
     {
     spotId: 4,
     url: 'https://a0.muscache.com/im/pictures/miso/Hosting-637090369513451459/original/1782d9d6-4a11-4d4b-b416-69c18e363f5a.jpeg?im_w=720',
     preview:true
   },
     {
     spotId: 5,
     url: 'https://a0.muscache.com/im/pictures/miso/Hosting-32668074/original/c1922bc6-bc5f-4094-ad69-22029c5ef32b.jpeg?im_w=720',
     preview:true
   },
     {
     spotId: 6,
     url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48192916/original/4fb28503-a593-460d-b322-74e44117cbec.jpeg?im_w=720',
     preview:true
   },
     {
     spotId: 7,
     url: 'https://a0.muscache.com/im/pictures/59f21f52-02bb-4a23-9aa1-93676786cb60.jpg?im_w=720',
     preview:true
   },
     {
     spotId: 8,
     url: 'https://a0.muscache.com/im/pictures/e7e72c42-3268-4e06-992b-bb75b6aa0a00.jpg?im_w=720',
     preview:true
   },
     {
     spotId: 9,
     url: 'https://a0.muscache.com/im/pictures/e7e72c42-3268-4e06-992b-bb75b6aa0a00.jpg?im_w=720',
     preview:true
   },
     {
     spotId: 10,
     url: 'https://a0.muscache.com/im/pictures/e7e72c42-3268-4e06-992b-bb75b6aa0a00.jpg?im_w=720',
     preview:true
   },
     {
     spotId: 11,
     url: 'https://a0.muscache.com/im/pictures/e7e72c42-3268-4e06-992b-bb75b6aa0a00.jpg?im_w=720',
     preview:true
   },
     {
     spotId: 12,
     url: 'https://a0.muscache.com/im/pictures/e7e72c42-3268-4e06-992b-bb75b6aa0a00.jpg?im_w=720',
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
