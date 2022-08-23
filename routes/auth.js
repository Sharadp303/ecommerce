const express= require('express');
const routes=express.Router()
const {signUp,signIn} = require('../controller/auth');
const { checkDuplicateUsernameAndEmail, checkRoles } = require('../middleware');

routes.post('/ecom/api/v1/auth/Signup',[checkDuplicateUsernameAndEmail,checkRoles],signUp)
routes.post('/ecom/api/v1/auth/Signin',signIn)

module.exports ={authRoutes : routes}




