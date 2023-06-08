'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    try {
      await queryInterface.bulkInsert(options, [
        {
          spotId: 1,
          userId: 1,
          review: 'best place ever',
          stars: 5
        },
        {
          spotId: 2,
          userId: 2,
          review: 'it wasnt bad but it wasnt great',
          stars: 3
        },
        {
          spotId: 3,
          userId: 3,
          review: 'it was good',
          stars: 4
        }
      ]);
    } catch (error) {
      console.error('Error seeding Reviews:', error);
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName ="Reviews";

    await queryInterface.bulkDelete(options)
  }
};
