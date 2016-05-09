// 全站命名空间
var XZ;
(function(o) {
    /**
     * @class   XZ
     * 全站命名空间
     * @singleton
     */
    XZ = o;

    function getAjaxData(params) {
        params = params || {};
        var result = params;
        result = JSON.stringify(result);
        // 修复JQ请求多个问号BUG
        return result.replace(/\?{2,}/g, function(part) {
            var arr = part.split('');
            arr.unshift('');
            return arr.join('\\\\');
        });
    };

    /**
     * @method
     * 发送ajax请求。
     * @param   {Object}        options                     Ajax请求参数
     * @param   {string}        options.url                 请求地址
     * @param   {'POST'/'GET'}  [options.type='POST']       Ajax请求类型
     * @param   {string}        [options.dataType='json']   数据类型
     * @param   {Object}        [options.params]            请求参数
     * @param   {boolean}       [options.async='true']      是否异步请求
     * @param   {number}        [options.timeout]           请求超时时间，以毫秒为单位
     * @param   {Function}      [options.beforeSend]        请求发送前需要执行的函数
     * @param   {Function}      [options.complete]          请求完成后需要执行的函数
     * @param   {Function}      [options.success]           请求发送成功执行的函数
     * @param   {Function}      [options.error]             请求发送失败执行的函数
     * @param   {Function}      [options.onabort]           请求被中断（xhr.abort）时执行的函数
     * @param   {Function}      [options.ontimeout]         请求超时时执行的函数
     * @param   {string}        [scope]
     * 作用区域。
     *
     * 如果存在此参数，则根据其值对其xhr对象进行缓存，直到其加载完成（触发complete函数）。
     *
     * 如果在其加载完成之前对同一个scope做了路由跳转，则会对同一scope的所有xhr对象做中断处理。
     *
     * @return  {Object}    XMLHttpRequest对象
     */
    XZ.ajax = function(options, scope) {
        var isError = false
            // 默认区域
        scope = typeof scope !== 'undefined' ? scope : 'main';

        options.type = options.type ? options.type.toUpperCase() : 'POST';

        options.params = typeof options.params === 'undefined' ? {} : options.params;
        var ajaxObj = {
            // 请求类型
            type: options.type,
            // 请求地址设置
            url: options.url,
            // 请求参数设置
            data: options.type === 'GET' ? options.params : getAjaxData(options.params),
            // 数据类型
            dataType: options.dataType || 'json',
            // 是否异步
            async: typeof options.async === 'undefined' ? true : false,
            // 请求之前执行函数
            beforeSend: options.beforeSend,
            // 请求超时时间
            timeout: options.timeout || -1,
            // 请求成功执行函数
            success: function(data, status, xhr) {
                if (!data) {
                    // 错误回调
                    if (typeof options.error === 'function') {
                        options.error(xhr, status);
                    }
                    return;
                }
                if (typeof options.success === 'function') {
                    options.success(data, status, xhr);
                }
            },
            // 请求失败执行函数
            error: function(xhr, status) {
                // 请求中断回调
                if (status === 'abort') {
                    if (typeof options.onabort === 'function') {
                        options.onabort(xhr);
                    }
                }
                // 请求超时回调
                if (status === 'timeout') {
                    if (typeof options.ontimeout === 'function') {
                        options.ontimeout(xhr);
                    }
                }
                // 错误回调
                if (typeof options.error === 'function') {
                    options.error(xhr, status);
                }
            },
            // 请求完成时执行函数
            // 无论成功与失败均执行此函数
            complete: function(xhr, status) {
                isError = false
                    // 执行自定义的函数
                if (typeof options.complete === 'function') {
                    options.complete(xhr, status);
                }
            }
        };

        // 发送请求
        var xhr = $.ajax(ajaxObj);
        return xhr;
    }

    /**
     * @method
     * 退出登录，用户注销
     */
    XZ.logout = function(v) {

    }

})(XZ || {});
