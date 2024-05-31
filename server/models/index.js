// Imports the class objects made within the models
const User = require('./User')
const Thread = require('./Thread')
const Comments = require('./Comments')


User.hasMany(Thread, {
foreignKey: 'user_id'
});

User.hasMany(Comments, {
foreignKey: 'user_id'
});

Thread.belongsTo(User, {
foreignKey: 'user_id'
});

Thread.hasMany(Comments, {
foreignKey: 'thread_id'    
});

Comments.belongsTo(User, {
foreignKey: 'user_id'
});

Comments.belongsTo(Thread, {
foreignKey: 'thread_id'
});
