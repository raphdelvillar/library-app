const nano = require('nano')('http://localhost:5984')
const passwordHash = require('password-hash')
const dbuser = nano.use('hcg_library_users')
const dbbook = nano.use('hcg_library_book')

module.exports = (app) => {
	//get auto increment api route
	app.get('/admin/getUserID', (req, res) => {
		dbuser.view('all', 'view_ai', (err, body) => {
			if(!err){
				res.send(body.rows)
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})
	//get username
	app.post('/admin/getUsername', (req, res) => {
		dbuser.view('all', 'getusername', {'key': req.body._id}, (err, body) => {
			if (!err) {
				if (body.rows[0]) {
					res.send({
						id: body._id,
						username: body.rows[0].value
					})
				}
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})

	//login
	app.post('/login', (req, res) => {
		dbuser.get(req.body.username, (err, body) => {
			if (passwordHash.verify(req.body.password, body.password)) {
				if(body.status == 'Active') {
				    res.send({
				    	username: req.body.username,
				    	name: body.firstname + ' ' + body.lastname,
					    role: body.role,
					    message: 'success'
				    })
				} else {
					res.send({
						message: 'failure'
					})
				}
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})

	//library register
	app.post('/register', (req, res) => {
		req.body.password = passwordHash.generate(req.body.password)
		dbuser.insert(req.body, req.body._id, (err, body) => {
		    if (!err) {
		    	res.send({
		    		message: 'success'
		    	})
		    } else {
		    	res.send({
		    		message: 'failure'
		    	})
		    }
		})
	})

	/** ADMIN **/
	//read user
	app.get('/admin/get', (req, res) => {
		var container = []
		dbuser.view('all', 'view_all', (err, body) => {
			if (!err) {
				body.rows.forEach( (v, k) => {
					var list = {}
			        list.value = false
			        list.id = v['key']['_id']
			        list.rev = v['key']['_rev']
			        list.name = v['key']['firstname'] + ' ' + v['key']['lastname']
			        list.password = v['key']['password']
			        list.firstname = v['key']['firstname']
			        list.lastname = v['key']['lastname']
			        list.email = v['key']['email']
			        list.phone = v['key']['phone']
			        list.role = v['key']['role']
			        list.status = v['key']['status']
		        	container.push(list)
			    })	
			    res.send(container)
		    } else {
		    	res.send({
		    		message: 'failure'
		    	})
		    }
		})
	})
	//delete user
	app.post('/admin/deleteUser', (req, res) => {
		dbuser.destroy(req.body._id, req.body._rev, (err, body) => {
			if (!err) {
				res.send({
					message: 'success'
				})
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})
	//update user
	app.post('/admin/updateUser', (req, res) => {
		if (!passwordHash.isHashed(req.body.password)) {
			req.body.password = passwordHash.generate(req.body.password)
		}
		dbuser.insert(req.body, req.body._id, (err, body) => {
			if (!err) {
				res.send({
					message: 'success'
				})
			} else {
				console.log(err)
				res.send({
					message: 'failure'
				})
			}
		})
	})

	/** LIBRARIAN **/
	//read book
	app.get('/librarian/get', (req, res) => {
		var container = []
		dbbook.view('all', 'view_all', (err, body) => {
			if (!err) {
				body.rows.forEach( (v, k) => {
					var list = {}
					list.value = false
		        	list._id = v['key']['_id']
		        	list.id = v['key']['_id']
		        	list.name = v['key']['name']
		        	list.isbn = v['key']['isbn']
		        	list.gencat = v['key']['gencat']
		        	list.genre = v['key']['genre']
		        	list.category = v['key']['category']
		        	list.author = v['key']['author']
		        	list.published_date = v['key']['published_date']
		        	list.reader = v['key']['reader']
		        	list.comments = v['key']['comments']
		        	list.rev = v['key']['_rev']
		        	container.push(list)
			    })
			    res.send(container)
		    } else {
		    	res.send({
		    		message: 'failure'
		    	})
		    }
		})
	})
	//create book
	app.post('/librarian/createBook', (req,res) => {
		dbbook.insert(req.body, req.body._id, (err, body) => {
			if (!err) {
				res.send({
					message: 'success'
				})
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})
	//update book
	app.post('/librarian/updateBook', (req, res) => {
		dbbook.insert(req.body, req.body._id, (err, body) => {
			if (!err) {
				res.send({
					message: 'success'
				})
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})
	//delete book
	app.post('/librarian/deleteBook', (req, res) => {
		dbbook.destroy(req.body._id, req.body._rev, (err, body) => {
			if (!err) {
				res.send({
					message: 'success'
				})
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})

	/** READER **/
	//checkout book
	app.post('/reader/checkout', (req, res) => {
		dbbook.insert(req.body, req.body._id, (err, body) => {
			console.log(err)
			if (!err) {
				res.send({
					message: 'success'
				})
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})
	//return book
	app.post('/reader/return', (req, res) => {
		dbbook.insert(req.body, req.body._id, (err, body) => {
			if (!err) {
				res.send({
					message: 'success'
				})
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})


	//comment book
	app.post('/reader/createComment', (req, res) => {
		dbbook.insert(req.body, req.body._id, (err, body) => {
			console.log(req.body)
			if (!err) {
				res.send({
					message: 'success'
				})
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})
	//get comment
	app.post('/reader/get', (req, res) => {
		dbbook.view('all', 'getcomment', {'key': req.body.id}, (err, body) => {
			if (!err) {
				res.send(body.rows[0].value)
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})
}
