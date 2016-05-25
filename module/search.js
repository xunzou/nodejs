var query = require('../config/pool')
var mysql = require('mysql');
function Search() {

};

module.exports = Search

Search.prototype = {
	getArticle: function(o,callback) {
		var o = o || {},
			val = o.val,
			cp = o.currentPage,
			ps = o.pageSize;
		var m = (cp-1) * ps;

		var selectSQL = 'select * from article where title LIKE "%'+ val +'%" or summary LIKE"% '+ val +'%" order by id desc limit '+ m +','+ ps + '';
		console.log(selectSQL)
		query(selectSQL, function(err, data, fields) {
			var result = {
				error:null,
				paging:{},
				result:data
			}
			//console.log(data)
			if (err) {
				//console.log(err)
				//connection.release();
				return callback(err)
			};
			//查询总条数
			query('SELECT COUNT(id) FROM article where title LIKE "%'+ val +'%" or summary LIKE"% '+ val +'%"', function(err, countData, fields) {
				var totalRecords = countData[0]['COUNT(id)'],
					totalPages = Math.ceil(totalRecords/ps)
				//总数据
				result.paging.totalRecords = totalRecords
				//总页数
				result.paging.totalPages = totalPages
				//当前页
				result.paging.currentPage = cp
				//当前显示的数据条数
				result.paging.pageSize = ps
				//页数错误
				if (cp>totalPages) {
					return callback({message:'不存在此页'}, result)
				};
				console.log(result)
				callback(null, result)
			});
			//console.log(data)
			//callback(null, data)
		});
	}
}