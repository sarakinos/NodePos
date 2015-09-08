// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/',adminRegister, function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
    app.get('/users',isLoggedIn,function(req,res){
        res.render('users.ejs');
    });
    app.get('/categories',isLoggedIn,function(req,res){
        res.render('categories.ejs');
    });
    app.get('/products',isLoggedIn,function(req,res){
        res.render('products.ejs');
    });
    app.get('/statistic',isLoggedIn,function(req,res){
        res.render('statistic.ejs');
    });
    app.get('/settings',isLoggedIn,function(req,res){
        res.render('settings.ejs');
    });
     app.get('/tables',isLoggedIn,function(req,res){
        res.render('tables.ejs');
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/admin', isLoggedIn, function(req, res) {
        res.render('admin.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
     app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
      app.post('/login', passport.authenticate('local-login',{ failureRedirect: '/login' }), 
        function(req, res) {
            // successful auth, user is set at req.user.  redirect as necessary.
            if (req.user.local.admin) { 
                return res.redirect('/admin'); 
                console.log('admin');
            }
            res.redirect('/profile');
                }
    );
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


function adminRegister (req,res,next){
        var User = require('./models/user');

        User.findOne({ 'local.admin' :  true }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return err;
            // check to see if theres already an admin
            if (user) {
                console.log('admin found');
            } else {
                // if there is no user with that email
                // create the user
                var newUser            = new User();
                // set the user's local credentials
                newUser.local.email    = '';
                newUser.local.password = newUser.generateHash('admin');
                newUser.local.name = '';
                newUser.local.surname = '';
                newUser.local.phone = '';
                newUser.local.address = '';
                newUser.local.am = '';
                newUser.local.afm = '';
                newUser.local.admin = true;
                newUser.local.username = 'admin';

                // save the admin
                newUser.save(function(err) {
                    if (err) throw err;
                    console.log('admin created');
                });
            }
        });    
        next();
    }