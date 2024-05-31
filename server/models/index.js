// Imports the class objects made within the models
const User = require('./User')
const Thread = require('./Thread')
const Comments = require('./Comments')


User.hasMany(Thread, {
foreignKey: ''
});

User.hasMany(Comments, {
foreignKey: 'comm'
});
