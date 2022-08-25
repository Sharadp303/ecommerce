const { serverPort } = require('./config/server.config')
const express = require('express')
const { routes } = require('./routes/category')
const jwt = require('jsonwebtoken')

//const {productRoutes,categoryRoutes}=require('./routes')
//var bodyParser = require('body-parser')

//require('dotenv').config()
const { Categories, Products, sequelize, Role } = require('./models')
const app = express()


const { authRoutes, cartRoutes, productRoutes, categoryRoutes } = require('./routes/index')

//const { INITIALLY_DEFERRED } = require('sequelize/types/deferrable')


app.use(express.json())

//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())

app.use(productRoutes)
app.use(categoryRoutes)
app.use(authRoutes)
app.use(cartRoutes)

app.listen(serverPort, async () => {
	console.log('server is running on this port', serverPort)

	await init()
})
async function init() {
	try {
		await sequelize.sync({ force: true })
		//await sequelize.authenticate()

		const defaultProducts = [
			{
				"description": "NYKaa products",
				"name": "beauty",
				"cost": 870,
				"quantity": 20,
				"CategoryId": 1
			}, {
				"description": "DEo fogg",
				"name": "Foggg",
				"cost": 1200,
				"quantity": 20,
				"CategoryId": 2
			},
			{
				"description": "BEst clothes",
				"name": "female shirts",
				"cost": 1200,
				"quantity": 20,
				"CategoryId": 3

			}

		]

		const defaultCategories = [
			{
				name: 'beauty',
				description: 'beautiful'
			},
			{
				name: 'Fragrance',
				description: 'About your presence'
			},
			{
				name: 'Clothes',
				description: 'About  your confidence'
			}
		]
		const defaultRoles = [{ name: 'User' }, { name: 'Admin' }]
		await Categories.bulkCreate(defaultCategories)
		await Products.bulkCreate(defaultProducts)
		await Role.bulkCreate(defaultRoles)
	}
	catch (err) {
		console.log(err)
	}

}