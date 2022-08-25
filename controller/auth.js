const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')


async function signUp(req, res) {
	const username = req.body.username;
	const email = req.body.email;
	const pass = bcrypt.hashSync(req.body.pass, 8);
	console.log("password", pass)
	try {
		const user = await User.create({ username, email, pass })
		if (req.body.roles) {
			const roles = req.body.roles;
			const result = await user.setRoles(roles)
			console.log('user defined roles', result)
		}
		else {
			const result = await user.setRoles([1])
			console.log('Default roles', result)
		}
		res.send({ msg: 'USer has been created Succesfuly' })

	}
	catch (err) {
		res.status(500).send({ msg: "INternl server error" })
	}

}



async function signIn(req, res) {
	const username = req.body.username;
	const password = req.body.pass;

	try {
		const user = await User.findOne({
			where: {
				username: username
			}
		})
		if (user) {
			const validPassword = bcrypt.compareSync(password, user.pass)
			if (!validPassword) {
				res.status(400).send({ msg: 'Username/password is not correct' })
			}

			const token = await jwt.sign({ id: user.id }, 'helloIamsecretkey', {
				expiresIn: '1h'
			})

			const authorities = [];
			const roles = await user.getRoles();
			for (let i = 0; i < roles.length; i++) {
				authorities.push(roles[i].name)
			}

			const finalUser = {
				id: user.id,
				name: user.name,
				email: user.email,
				username: user.username,
				token: token,
				authorities: authorities
			}

			res.send(finalUser)

		} else {
			res.status(400).send({ msg: 'Username/password is not correct' })
		}
	} catch (err) {
		res.status(500).send({ msg: 'Internal Server Error', err })
	}
}

module.exports = { signUp, signIn }