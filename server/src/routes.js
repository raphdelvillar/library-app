var nano = require('nano')('http://localhost:5984')
var passwordHash = require('password-hash')

module.exports = (app) => {
	//get auto increment api route
	app.get('/admin/getUserID', (req, res) => {
		var db = nano.use('hcg_library_users')
		db.view('all', 'view_ai', function (err, body) {
			if(!err){
				res.send(body.rows)
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})

	//login
	app.post('/login', (req, res) => {
		var db = nano.use('hcg_library_users')
		db.get(req.body.username, function (err, body) {
			if (passwordHash.verify(req.body.password, body.password)) {
				if(body.status == 'Active') {
				    res.send({
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
		var db = nano.use('hcg_library_users')
		req.body.password = passwordHash.generate(req.body.password)
		db.insert(req.body, req.body.id, function (err, body) {
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
		var db = nano.use('hcg_library_users')
		db.view('all', 'view_all', function (err, body) {
			if (!err) {
				res.send(body.rows)
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})
	//create user
	app.post('/admin/createUser', (req, res) => {
		var db = nano.use('hcg_library_users')
		req.body.password = passwordHash.generate(req.body.password)
		db.insert(req.body, req.body.username, function (err, body) {
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
	//delete user
	app.post('/admin/deleteUser', (req, res) => {
		var db = nano.use('hcg_library_users')
		db.destroy(req.body.id, req.body.rev, function(err, body) {
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
	//set user
	app.patch('/admin/setUser', (req, res) => {
	})

	/** LIBRARIAN **/
	//read book
	app.post('/librarian/get', (req, res) => {
		var db = nano.use('hcg_library_book')
		db.view('all', 'view_all', function (err, body) {
			if (!err) {
				res.send(body.rows)
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})
	//create book
	app.post('/librarian/createBook', (req,res) => {
		var db = nano.use('hcg_library_books')
		db.insert(req.body, req.body.id, function (err, body) {
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
	app.put('/librarian/updateBook', (req, res) => {
	})
	//delete book
	app.delete('/librarian/deleteBook', (req, res) => {
	})
	//set book
	app.patch('/librarian/setBook', (req, res) => {
	})

	/** READER **/
	//comment book
	app.post('/reader/comment', (req, res) => {
		var db = nano.use('hcg_library_comment')
		db.insert(req.body, req.body.id, function (err, body) {
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
	//set book
	app.patch('/reader/setBook', (req, res) => {
	})
	//get comment
	app.get('/reader/get', (req, res) => {
		var db = nano.use('hcg_library_comment')
		db.view('all', 'view_all', function (err, body) {
			if (!err) {
				res.send(body.rows)
			} else {
				res.send({
					message: 'failure'
				})
			}
		})
	})
}
