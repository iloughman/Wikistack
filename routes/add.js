var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET add route listing. */
router.get('/', function(req, res, next) {
  res.render('add', {title: 'Add a Page'});
});

router.post('/submit', function(req,res) {
	var models = require('../models/');

	//add definitions of the 'title', 'body' and 'url_name' variables here

	var pageTitle = req.body.pageTitle;
	var pageText = req.body.pageText;

	var generateUrlName = function(name) { 
		if (typeof name != "undefined" && name !== "") { 
			return name.replace(/\s/ig,"_").replace(/\W/ig,""); 
		} else { 
			return Math.random().toString(36).substring(2,7); 
		} 
	};

	var urlName = generateUrlName(pageTitle);

	var p = new models.Page({"title": pageTitle, "body":pageText, "url_name":urlName});
	p.save();
	res.redirect('/');
});

module.exports = router;
