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

            // check to see if theres already a user with that username
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
	function updateUser(u){
		User.findOne({_id : u._id},function(err,user){
			if(err) throw err;
			    user.local.email    = u.email;
                user.local.username = u.username;                
                user.local.password = user.generateHash(u.password);
                user.local.firstname= u.firstname;
                user.local.surname  = u.surname;
                user.local.afm      = u.afm;
                user.local.am       = u.am;
                user.local.addr     = u.addr;
                user.local.phone    = u.phone;
                user.local.admin    = u.admin;

                // save the user
                user.save(function(err) {
                    if (err)
                        throw err;
                    return 0;
                });
		});
	}
	function deleteUser(u){
		console.log(u._id);
		User.findByIdAndRemove(u._id, function(err) {
		  if (err) throw err;

		  // we have deleted the user
		  console.log('User deleted!');
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
	app.post('/api/user/update',function(req,res){
		var updateResult = updateUser(req.body.user);
		res.send(updateResult);
	});
	app.post('/api/user/delete',function(req,res){
		var deleteResult = deleteUser(req.body.user);
		res.send(deleteResult);
	});
}