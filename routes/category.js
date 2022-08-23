const express=require('express');
const{createCategory,getAllCategory,getCategoryOnId,updateCategory,deleteCategory}=require('../controller/category')
const{checkNameForCategory ,verifyToken, isAdmin}=require('../middleware')
const routes=express.Router()

routes.post('/ecom/api/v1/categories',[checkNameForCategory,verifyToken, isAdmin],createCategory)
routes.get('/ecom/api/v1/categories',getAllCategory)
routes.get('/ecom/api/v1/categories/:id',getCategoryOnId)
routes.put('/ecom/api/v1/categories/:id',[verifyToken, isAdmin],updateCategory)
routes.delete('/ecom/api/v1/categories/:id',[verifyToken, isAdmin],deleteCategory)

//routes.delete('/ecom/api/v1/categories',)

module.exports ={categoryRoutes:routes}