// 全站命名空间
$(function() {
    var getArticle = function() {
        this.init()
    }
    getArticle.prototype = {
        init: function() {
            this.getData()
        },
        getData: function() {
            var self = this,
                obj = {
                    url: '/home/getArticle.json',
                    params: {
                        userId:1
                    },
                    type: 'post',
                    success: function(data) {
                        console.log('success')
                        console.log(data)
                    },
                    error: function() {
                        console.log('error')
                    }
                }
            console.log(obj)
            XZ.ajax(obj)
        }
    }
    var myGetArticle = new getArticle()
});