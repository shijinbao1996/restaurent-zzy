$.ajaxPrefilter((options) => {
    options.url = 'http://big-event-api-t.itheima.net' + options.url
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

    //解决直接输入网址进入主页未登录停留在主页问题
    options.complete = (res) => {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})