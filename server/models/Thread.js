// Import the necessary components from sequelize
const { Model, DataTypes } = require('sequelize');

// Here we import our connection file
const sequelize = require('../config/connection');


// Here we are creating a new class called user that inherits the properties
// from the parent class of model
class Thread extends Model {};


// Define User model with its attributes and options (two object argument)
Thread.init({
   _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
   },
   name: {
    type: DataTypes.STRING,
    allowNull: false
   },
   user_id: {
      type: DataTypes.INTEGER,
      references: {
         model: 'user',
         key: 'id'
      }
   },
   comment_id: {
      type: DataTypes.INTEGER,
      references: {
         model: 'comments',
         key: 'id'
      }
   }
},
{
sequelize,
timestamps: true,
freezeTableName: true,
underscored: true,
modelName: 'thread'
});

// Exporting of this model
module.exports =  Thread;
