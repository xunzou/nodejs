// 全站命名空间
$(function() {
    var cateFn = function() {
        this.init()
    }
    cateFn.prototype = {
        init: function() {
            var self = this;
            //this.getData()

            $('#cateList .cate_change').click(function(e){
                e.preventDefault()
                var parentLi = $(this).closest('li.cate_item'),
                    cateId = $(this).attr('vid'),
                    cateName = parentLi.find('span').text(),
                    cateDesc = parentLi.find('p').text();
                $('#cateName').val(cateName)
                $('#cateDesc').val(cateDesc)
                $('#cateForm').attr('action','/cate?cateId='+ cateId)
            })
        },
        getPost: function() {
            var self = this,
                obj = {
                    url: '/getArticle.json',
                    params: {},
                    //type: 'post',
                    success: function(data) {
                        console.log(typeof data)
                        console.log(data)
                        var result = data.result;
                        if (data.error) {
                            $('#myPost').text('出错了！')
                            return
                        };
                        if (result && result.length) {
                            var html = '';
                            for (var i = 0; i < result.length; i++) {
                                html += '<li><a href="/p/'+ result[i].path +'">' + result[i].title + '</a>['+ XZ.formatDate(result[i].addDate,'YYYY/MM/DD') +']</li>'
                            };
                            $('#myPost').html('<ul>'+ html +'</ul>')
                        } else {
                            $('#myPost').text('暂无数据')
                        };
                    }
                }
            XZ.ajax(obj)
        }
    }
    var myCateFn = new cateFn()
});