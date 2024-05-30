// Import the necessary components from sequelize
const { Model, DataTypes } = require('sequelize');
// Import of bcrypt to hash passwords
const bcrypt = require('bcrypt');

// Here we import our connection file
const sequelize = require('../config/connection');

class Thread extends Model {

    async beforeSave() {
        if (this.isNew || this.isModified('password')) {
         const saltRounds = 10;
         this.password = await bcrypt.password(this.password, saltRounds);
        }
    }

    async isCorrectPassword(password) {
        return bcrypt.compare(password, this.password)
    }
};


Thread.init({

},
{
    
})
