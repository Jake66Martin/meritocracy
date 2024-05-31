// Here we import the necessary components from sequelize
const { Model, DataTypes } = require("sequelize");
// Here we are importing the bcrypt library to hash passwords
const bcrypt = require("bcrypt");

// Here we import our connection file
const sequelize = require("../config/connection");

// Here we are creating a new class called user that inherits the properties
// from the parent class of model
class User extends Model {
  // This is a hook that runs before saving a user. It checks if the password field is new
  // or has been modified. If so, it hashes the new password with the specified number of salt
  // rounds
  async beforeSave() {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
  // This is a componenet that checks for password validation with stored hashed value
  async isCorrectPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

// Define User model with its attributes and options (two object argument)
User.init(
  {
// _id attribute is auto-incrementing integer and serves as primary key    
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
// Unique string that cannot be null    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
// Unique string that cannot be null and must match email format    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail(value) {
          if (!/.+@.+\..+/.test(value)) {
            throw new Error("Must enter a valid email format.");
          }
        },
      },
    },
// String that cannot be null and must match password format    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isPassword(value) {
          if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              value
            )
          ) {
            throw new Error("Password must conform to the proper format.");
          }
        },
      },
    },
  },
  {
    sequelize, // Connect model to sequelize instance
    timestamps: false, //  Disable automatic created and updated at fields
    freezeTableName: true, // Ensure the table name is exactly as defined
    underscored: true, // Use snake case for automatically added attributes
    modelName: "user",  // Set the model name to user
  }
);

// Adds a hooke that hashes the password before saving the user
User.addHook('beforeSave', async(user) => {
    if (user.password) {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
});

// Exporting of this model
module.exports = User;
