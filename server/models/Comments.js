// Import the necessary components from sequelize
const { Model, DataTypes} = require('sequelize');

// Here we import our connection file
const sequelize = require('../config/connection');

// Here we are creating a new class called user that inherits the properties
// from the parent class of model
class Comments extends Model {};


// Define User model with its attributes and options (two object argument)
Comments.init({
_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
comment: {
    type: DataTypes.STRING,
    allowNull: false
}
},
{
sequelize,
timestamps: true,
freezeTableName: true,
underscored: true,
modelName: 'comments'
})

// Exporting of this model
module.exports = Comments;