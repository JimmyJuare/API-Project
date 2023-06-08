'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    try {
      await queryInterface.bulkInsert(options,[
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
        }
      ])
      
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
