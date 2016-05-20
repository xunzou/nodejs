// 全站命名空间
$(function() {
    var getArticle = function() {
        this.init()
    }
    getArticle.prototype = {
        init: function() {
            this.getData()
            //this.getAjaxData()
        },
        getData: function() {
            var self = this,
                obj = {
                    url: '/home/getArticle.json',
                    params: {},
                    success: function(data) {
                        var result = data.result;
                        if (data.error) {
                            $('#myArticle').text('出错了！')
                            return
                        };
                        if (result && result.length) {
                            var html = '';
                            for (var i = 0; i < result.length; i++) {
                                html += '<li><a href="/p/'+ result[i].path +'">' + result[i].title + '</a>['+ XZ.formatDate(result[i].addDate,'YYYY/MM/DD') +'] <a href="/editPost/'+ result[i].path +'" class="edit_post" title="编辑">编辑</a> <a href="#" path="'+ result[i].path +'" class="del_post" title="删除">删除</a></li>'
                            };
                            $('#myArticle').html('<ul>'+ html +'</ul>')

                            $('#myArticle li a.del_post').click(function(e){
                                e.preventDefault()
                                var path = $(this).attr('path');
                                self.delPost(path);
                            })
                        } else {
                            $('#myArticle').text('暂无数据')
                        };
                    },
                    error: function() {
                        //console.log('error')
                    }
                }
                //console.log(obj)
            XZ.ajax(obj)
        },
        delPost:function(path){
            var self = this,
                obj = {
                    url: '/post/del.json',
                    params: {
                        path:path
                    },
                    success: function(data) {
                        var result = data.result;
                        if (data.error) {
                            console.log(data.error)
                            //$('#myPost').text('出错了！')
                            return
                        };
                        if (result) {
                            if (result.affectedRows != 0) {
                                window.location.reload()
                            } else {
                                console.log('删除木有成功')
                            };
                        }
                    },
                    error: function() {
                        //console.log('error')
                    }
                }
            XZ.ajax(obj)
        },
        getAjaxData: function() {
            var self = this,
                request;
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                request = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            request.open('post', '/home/getArticle.json')
            //request.setRequestHeader('Content-Type','text/plain')
            //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200) {
                    var type = request.getResponseHeader('Content-Type');
                    console.log(type)
                    /*if (type.match(/^text/)) {
                            console.log(request.responseText,1)
                        } else {
                            console.log(request.responseText,2)
                        };*/
                    console.log(typeof request.responseText)
                    console.log(request.responseText)
                    console.log(JSON.parse(request.responseText))
                    //self.createDom(JSON.parse(request.responseText))
                };
            }
            request.setRequestHeader('Content-Type', 'application/json')
            request.send()
            //request.send(JSON.stringify({userId: 1}))
            //request.send(JSON.stringify("fname=Bill&lname=Gates"))
        }
    }
    var myGetArticle = new getArticle()
});