const express=require('express');
const{createProduct, getProducts,updateProduct, filterBasedOnProduct, getProductOnId, deleteProduct}=require('../controller/product')
const{validateProductdata}=require('../middleware/product')
const{verifyToken, isAdmin}=require('../middleware/authJwt')
const routes=express.Router()

routes.post('/ecom/api/v1/products',createProduct)
routes.get('/ecom/api/v1/products',[validateProductdata],getProducts)
routes.get('/ecom/api/v1/products/filter',filterBasedOnProduct)
 routes.get('/ecom/api/v1/products/:id',getProductOnId)
routes.put('/ecom/api/v1/products/:id',[verifyToken, isAdmin],updateProduct)
 routes.delete('/ecom/api/v1/products/:id',deleteProduct)



module.exports = {productRoutes : routes}