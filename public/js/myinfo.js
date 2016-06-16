// 全站命名空间
$(function() {
    var uploadAvator = function() {
        this.init()
    }
    uploadAvator.prototype = {
        init: function() {
            //this.uploadImg()
        },
        uploadImg:function(){
            var self = this,
                formData = new FormData($("#frmUploadFile")[0]),
                obj = {
                    url: '/uploadAvator.do',
                    params: {},
                    success: function(data) {
                        console.log(data)
                    },
                    error: function() {
                        //console.log('error')
                    }
                }
            XZ.ajax(obj)
        }
    }
    var myUploadAvator = new uploadAvator()
});