var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
	// res.send('TodoApp Backend is Running');
	res.send('App is Running');
});

module.exports = router;
