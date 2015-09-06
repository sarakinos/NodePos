module.exports = function(app){
	var User = require('../models/user');

	function getUsers(callback){
		User.find({},function(err,user){
			if(err) throw err;
			callback(user);
		});
	}
	function getUserById(uId){
		User.find({id:uId},function(err,user){
			if(err) throw err;
			return user;
		});
	}
	function storeUser(u){
			User.findOne({ 'local.username' :  u.username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return err;

            // check to see if theres already a user with that email
            if (user) {
                console.log(user);
                return 1;
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.email    = u.email;
                newUser.local.username = u.username;                
                newUser.local.password = newUser.generateHash(u.password);
                newUser.local.firstname= u.firstname;
                newUser.local.surname  = u.surname;
                newUser.local.afm      = u.afm;
                newUser.local.am       = u.am;
                newUser.local.addr     = u.addr;
                newUser.local.phone    = u.phone;
                newUser.local.admin    = u.admin;

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return 0;
                });
            }
        });    
		}
	app.get('/api/user/get',function(req,res){
		getUsers(function(response){
			res.send(response);
		});
		
	});
	app.post('/api/user/store',function(req,res){
		var storeResult = storeUser(req.body.user);
		res.send(storeResult);
	});
}