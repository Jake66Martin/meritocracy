// This imports the dotenv package for environment variables
require('dotenv').config();
// This line imports sequelize and assigns it to Sequelize
const Sequelize = require('sequelize')
// This block of code opens up the connection to the database bycreating a new
// instance of sequelize using the provided environment variables for db name,
// db user, db password.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
// This line is for the database host 
    host: process.env.DB_HOST,
// This ensures the use of mysql as db dialect    
    dialect: 'mysql',
// Ensure decimal numbers are correctly handled    
    dialectOptions: {
        decimalNumbers: true,
    },
});
// Exports the instance for use in other models
module.exports = sequelize;