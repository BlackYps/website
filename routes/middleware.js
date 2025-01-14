/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {

	var locals = res.locals;

	locals.cNavLinks = [
    { label: 'Global Leaderboards',		key: 'global',		href: '/competitive/leaderboards/global' },
    { label: '1v1 Leaderboards',		key: '1v1',		href: '/competitive/leaderboards/1v1' },
    { label: '2v2 Leaderboards',		key: '2v2',		href: '/competitive/leaderboards/2v2' },
    { label: '4v4 Full Share Leaderboards',		key: '4v4',		href: '/competitive/leaderboards/4v4' },
  ];
  
	next();

};

exports.getLatestClientRelease = function(req, res, next) {

	var locals = res.locals;
    var fs = require('fs');
    var clientLink;
    var exec = require('child_process').exec;

    fs.readFile('link.json', 'utf8', function (err, data) {

        try {
            clientLink = JSON.parse(data);
        } catch (e) {
            exec('node scripts/getLatestClientRelease.js');
            clientLink = {};
            clientLink.downlords_faf_client_link = 'https://github.com/FAForever/downlords-faf-client/releases';
        }

        locals.downlords_faf_client_download_link = clientLink.downlords_faf_client_link;

        next();
	});
};

exports.clientChecks = function(req, res, next) {

    var locals = res.locals;
    locals.removeNavigation = false;

    if (req.query.page_id) {
        res.redirect('/news');
    }
 
    var userAgent = req.headers['user-agent'];
    if (userAgent === 'FAF Client' || userAgent === 'downlords-faf-client') {
        locals.removeNavigation = true;
    }

    next();
};

exports.username = function(req, res, next) {
    var locals = res.locals;

    if (req.isAuthenticated()) {
        locals.username = req.user.data.attributes.userName;    
        locals.hasClan = 
            req.user && req.user.data.attributes.clan;
    }

    next();
};
