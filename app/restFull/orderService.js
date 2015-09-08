module.exports = function(app,io){
	var Order = require('../models/order');

	function getOrders(callback){
		Order.find({},function(error,orders){
			if(error) throw error;
			callback(orders);
		});
	}
	function storeOrder(o){
			var order = new Order ({
				user_id 		: o.user_id,
				products_id 	: o.products_id,
				price 			: o.price,
				table 			: o.table,
				status 			: o.status,
				additional_info : o.additional_info
			});
			order.save(function(err){
				if(err) throw err;
				return 1;
			});
		}

	io.on('connection', function(socket){
		var user;
		//Print clients username
	  socket.on('Connected Client',function(data){
	  	user = data;
	  	console.log(user.username + ' has connected');
	  	io.emit('connected user', user);
	  });

	  socket.on('OrderPosted',function(data){
	  	console.log(data);
	  });

	  socket.on('disconnect',function(){
	  	if(user!=undefined) {
	  		console.log(user.username + ' has disconnected');
	  		io.emit('disconnected user', user);
	  	}
	  })
	});

};


