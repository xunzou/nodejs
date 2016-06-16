// 全站命名空间
'use strict';
$(function() {
    var uploadAvator = function() {
        this.init()
    }
    uploadAvator.prototype = {
        init: function() {
            this.eventBind()
        },
        eventBind: function() {
            var self = this
            $('#uploadFile').on('click', function() {
                self.uploadImg();
            })
        },
        uploadImg: function() {
            /* var self = this,
                 formData = new FormData($("#frmUploadFile")[0]),
                 obj = {
                     url: '/uploadAvator',
                     params:formData,
                     async:false,
                     success: function(data) {
                         console.log(data)
                     },
                     error: function() {
                         //console.log('error')
                     }
                 }
             XZ.ajax(obj)*/
            var formData = new FormData($("#frmUploadFile")[0]);
            $.ajax({
                url: '/uploadAvator',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    if (200 === data.code) {
                        $("#imgShow").attr('src', data.msg.url);
                        $("#spanMessage").html("上传成功");
                    } else {
                        $("#spanMessage").html("上传失败");
                    }
                    console.log('imgUploader upload success, data:', data);
                },
                error: function() {
                    $("#spanMessage").html("与服务器通信发生错误");
                }
            });
        }
    }
    var myUploadAvator = new uploadAvator()
});