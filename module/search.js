var query = require('../config/pool')
function Search(options) {
	this.val = options && options.val;
	this.pageNum = options && options.pageNum || 0;
};

module.exports = Search

Search.prototype = {
	getArticle: function(callback) {
		var selectSQL = 'select * from article where title LIKE "%'+ this.val +'%" or summary LIKE"% '+ this.val +'%" order by id desc limit '+this.pageNum+',10';
		console.log(selectSQL)
		query(selectSQL, function(err, data, fields) {
			//console.log(data)
			if (err) {
				//console.log(err)
				//connection.release();
				return callback(err)
			};
			//console.log(data)
			callback(null, data)
		});
	}
}