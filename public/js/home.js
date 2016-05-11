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
                                html += '<li><a href="/article/'+ result[i].id +'">' + result[i].title + '</a>['+ result[i].addDate +']</li>'
                            };
                            $('#myArticle').html('<ul>'+ html +'</ul>')
                        } else {
                            $('#myArticle').text('暂无数据')
                        };
                    },
                    error: function() {
                        console.log('error')
                    }
                }
                //console.log(obj)
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
        },
        createDom: function(data) {

            var Hello = React.createClass({
                //displayName: 'Hello',
                render: function() {
                    //return React.createElement("div", null, "Hello ", this.props.name);
                    return 1
                }
            });

            ReactDOM.render(
                React.createElement(Hello, {
                name: "World"
            }),
                document.getElementById('myArticle'));

        }
    }
    var myGetArticle = new getArticle()
});