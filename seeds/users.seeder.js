const connection = require('../models/index');
const Users = require('../models/users');

var superAdmin = new Users({
    name : 'Super Admin',
    email: 'admin@amagiczap.com',
    password: 123456,
    isAdmin:true
});

superAdmin.save().then((doc)=>{
    process.exit(1);
}).catch((err)=>{
    console.log(err);
    process.exit(1);
})

