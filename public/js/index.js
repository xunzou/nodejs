// 全站命名空间
$(function() {
    var indexFn = function() {
        this.init()
    }
    indexFn.prototype = {
        init: function() {
            this.getData()
            //this.getAjaxData()

            /*for (var i = 1; i < 13; i++) {
                console.log(i,md5(i).substring(5,17))
            };*/
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
                                html += '<li><a href="/article/'+ result[i].path +'">' + result[i].title + '</a>['+ result[i].addDate +']</li>'
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