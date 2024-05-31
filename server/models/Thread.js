// Import the necessary components from sequelize
const { Model, DataTypes } = require('sequelize');

// Here we import our connection file
const sequelize = require('../config/connection');


// Here we are creating a new class called user that inherits the properties
// from the parent class of model
class Thread extends Model {};


// Define User model with its attributes and options (two object argument)
Thread.init({
// _id attribute is auto-incrementing integer and serves as primary key    
   _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
   },
// name attribute is a string that cannot be null  
   name: {
    type: DataTypes.STRING,
    allowNull: false
   },
// user_id is a reference to the id of the user who made the thread   
   user_id: {
      type: DataTypes.INTEGER,
      references: {
         model: 'user',
         key: 'id'
      }
   },
},
{
sequelize,  // Connect model to sequelize instance
timestamps: true,  //  Disable automatic created and updated at fields
freezeTableName: true,  // Ensure the table name is exactly as defined
underscored: true,  // Use snake case for automatically added attributes
modelName: 'thread'  // Set the model name to user
});

// Exporting of this model
module.exports =  Thread;
