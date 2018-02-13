/**
 * Name  : index.js
 * Purpose : All Routes of the application 
 */
var express = require('express');
var router = express.Router();

// import all controllers for the routes 
var {createZap,getZaps,deleteZap,updateZap}         = require('../controllers/zapController');
var {saveScriptData}                                = require('../controllers/scriptController');
var {usersZaps,getScriptZaps}                       = require('../controllers/zapierController');
var {isAuthorized , isUserExists, isUserSubscribed} = require('./middleware');
var {getAllPlansCtrl}                               = require('../controllers/stripeController');
var { userLogin, 
      userRegister,
      getAllUsers,
      updateUser, 
      userForgetPassword,
      userResetPassword}                           = require('../controllers/authController');

/**
 * Users Registration, Login, Forget Password and Reset Password 
 */
  router.post('/register',isUserExists,userRegister); 
  router.post('/login',userLogin);
  router.post('/forget-password',userForgetPassword);
  router.post('/reset-password',userResetPassword)

/**
 * Create, read, update and delete Zaps
 */
  router.post('/zaps',isUserSubscribed,createZap)
  router.get('/zaps',isUserSubscribed,getZaps);
  router.delete('/zaps/:id',isUserSubscribed,deleteZap);
  router.put('/zaps/:id',isUserSubscribed,updateZap);

// Saves script's data to database  
  router.post('/script-data',saveScriptData);

/**
 * Zapier Authenicate and send data to zapier
 */
  router.get('/users_script_zap/:zapId',getScriptZaps);
  router.get('/users_zaps/:api_key',usersZaps);

/**
 * Admin get users and active , deactive users's activety
 */
  router.get('/users',isAuthorized,getAllUsers);
  router.put('/users/:id', isAuthorized,updateUser);
  
/**
 * Stripe 
 */
  router.get('/plans',getAllPlansCtrl);
  router.post("/stripe/webhook/customer/subscription/trial_will_end", function(request, response) {
    // Retrieve the request's body and parse it as JSON
    //var event_json = JSON.parse(request.body);
    console.log(typeof request.body);
    //var body = request.body;
    //console.log('event id ', body.id);
    // Do something with event_json
  
    response.status(200).send('success');
  });
  
module.exports = router;
