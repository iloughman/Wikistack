var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET home page. */
router.get('/', function(req, res, next) {
	models.Page.find(function(err,docs){
		//console.log(docs);
		res.render('index', { title: 'BROWSE MY WIKISTACK' , docs: docs });
	});
});

router.get('/wiki/:urlName', function(req, res, next) {
	var urlName = req.params.urlName;
	models.Page.findOne({"url_name": urlName},function(err,page){
		//console.log(page);
		res.render('show', { title: page.title , page: page });
	});
});


module.exports = router;
