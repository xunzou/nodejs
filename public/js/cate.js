// 全站命名空间
$(function() {
    var cateFn = function() {
        this.init()
    }
    cateFn.prototype = {
        init: function() {
            var self = this;
            //this.getData()
            //修改
            $('#cateList .cate_change').click(function(e){
                e.preventDefault()
                var parentLi = $(this).closest('li.cate_item'),
                    cateId = $(this).attr('vid'),
                    cateName = parentLi.find('span').text(),
                    cateDesc = parentLi.find('p').text();
                $('#cateName').val(cateName)
                $('#cateDesc').val(cateDesc)
                $('#cateForm').attr('action','/cate?cateId='+ cateId)
            });
            //删除
            $('#cateList .cate_del').click(function(e){
                e.preventDefault()
                var parentLi = $(this).closest('li.cate_item'),
                    cateId = $(this).attr('vid');
                self.delCate(parentLi,cateId)
            });

        },
        delCate: function(li,id) {
            var self = this,
                obj = {
                    url: '/cate/del.json',
                    params: {
                        cateId:id
                    },
                    //type: 'post',
                    success: function(data) {
                        //console.log(typeof data)
                        //console.log(data)
                        var result = data.result;
                        if (data.error) {
                            console.log(data.error)
                            $('#myPost').text('出错了！')
                            return
                        };
                        if (result) {
                            if (result.affectedRows != 0) {
                                li.remove()
                            } else {
                                console.log('删除木有成功')
                            };
                        }
                    }
                }
            XZ.ajax(obj)
        }
    }
    var myCateFn = new cateFn()
});