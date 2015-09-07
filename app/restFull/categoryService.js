module.exports = function(app){
	var Category = require('../models/category');

	function getCategories(callback){
		Category.find({},function(err,category){
			if(err) throw err;
			callback(category);
		});
	}
	function getCategoryById(cId){
		Category.find({id:cId},function(err,category){
			if(err) throw err;
			return category;
		});
	}
	function storeCategory(c){
			var category = new Category ({
				name 		: c.name,
				description : c.description
			});
			category.save(function(err){
				if(err) throw err;
				return 1;
			});
		}
	function updateCategory(c){
		Category.findOne({_id : c._id},function(err,category){
			if(err) throw err;
			    category.name 		= c.name,
				category.description = c.description,

                // save the category
                category.save(function(err) {
                    if (err)
                        throw err;
                    return 0;
                });
		});
	}
	function deleteCategory(c){
		Category.findByIdAndRemove(c._id, function(err) {
		  if (err) throw err;

		  // we have deleted the category
		  console.log('Category deleted!');
		});
	}
	app.get('/api/category/get',function(req,res){
		getCategories(function(response){
			res.send(response);
		});
		
	});
	app.post('/api/category/store',function(req,res){
		var storeResult = storeCategory(req.body.category);
		res.send(storeResult);
	});
	app.post('/api/category/update',function(req,res){
		var updateResult = updateCategory(req.body.category);
		res.send(updateResult);
	});
	app.post('/api/category/delete',function(req,res){
		var deleteResult = deleteCategory(req.body.category);
		res.send(deleteResult);
	});
}