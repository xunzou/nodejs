// 全站命名空间
$(function() {
    var indexFn = function() {
        this.init()
        console.log(11)
    }
    indexFn.prototype = {
        init: function() {
            this.getData()
            //this.getAjaxData()
        },
        getData: function() {
            var self = this,
                obj = {
                    url: '/getAllArticle.json',
                    params: {},
                    //type: 'post',
                    success: function(data) {
                        console.log(typeof data)
                        console.log(data)
                        var result = data.result;
                        if (data.error) {
                            $('#myArticle').text('出错了！')
                            return
                        };
                        if (result && result.length) {
                            var html = '';
                            for (var i = 0; i < result.length; i++) {
                                html += '<li><a href="/article/'+ result[i].id +'.html">' + result[i].title + '</a>['+ result[i].addDate +']</li>'
                            };
                            $('#myArticle').html('<ul>'+ html +'</ul>')
                        } else {
                            $('#myArticle').text('暂无数据')
                        };
                    }
                }
            XZ.ajax(obj)
        }
    }
    var myIndexFn = new indexFn()
});