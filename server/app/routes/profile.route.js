var utils = require('../services/utils.service');

module.exports = function(app) {
    // User Routes
    var profile = require('../controllers/profile.controller.js');
    app.get('/profile/:id',profile.profile);

    app.get('/profile/poster/:id'.getPoster);

    app.get('/profile/activity/:id',utils.ensureAuthenticated,profile.getActivity);


    app.post('/profile/follow',utils.ensureAuthenticated,profile.follow);
    app.post('/profile/unfollow',utils.ensureAuthenticated,profile.unfollow);

    app.post('/profile/password',utils.ensureAuthenticated,profile.changePassword);

    app.put('/profile/:id',utils.ensureAuthenticated,profile.update);

//	app.route('/profile/accounts').delete(users.removeOAuthProvider);
    app.get('/me',utils.ensureAuthenticated,profile.me);
    app.route('/users')
        .get(profile.fetchAll)
        .put(utils.ensureAuthenticated,profile.update);
};