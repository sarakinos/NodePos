module.exports = function(app){
	var Product = require('../models/product');

	function getProducts(callback){
		Product.find({},function(err,product){
			if(err) throw err;
			callback(product);
		});
	}
	function getProductById(pId){
		Product.find({id:pId},function(err,product){
			if(err) throw err;
			return product;
		});
	}
	function storeProduct(p){
			var product = new Product ({
				name : p.name,
				description : p.description,
				price : p.price,
				category :p.category,
				ingredients : p.ingredients
			});
			product.save(function(err){
				if(err) throw err;
				return 1;
			});
		}
	function updateProduct(p){
		Product.findOne({_id : p._id},function(err,product){
			if(err) throw err;
			    product.name 		= p.name,
				product.description = p.description,
				product.price 		= p.price,
				product.category 	= p.category,
				product.ingredients = p.ingredients

                // save the product
                product.save(function(err) {
                    if (err)
                        throw err;
                    return 0;
                });
		});
	}
	function deleteProduct(p){
		Product.findByIdAndRemove(p._id, function(err) {
		  if (err) throw err;

		  // we have deleted the product
		  console.log('Product deleted!');
		});
	}
	app.get('/api/product/get',function(req,res){
		getProducts(function(response){
			res.send(response);
		});
		
	});
	app.post('/api/product/store',function(req,res){
		var storeResult = storeProduct(req.body.product);
		res.send(storeResult);
	});
	app.post('/api/product/update',function(req,res){
		var updateResult = updateProduct(req.body.product);
		res.send(updateResult);
	});
	app.post('/api/product/delete',function(req,res){
		var deleteResult = deleteProduct(req.body.product);
		res.send(deleteResult);
	});
}