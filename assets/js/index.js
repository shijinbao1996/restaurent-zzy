function getUserInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: (res) => {
            if (res.status !== 0) return layer.msg(res.message);
            // layer.msg(res.message)
            renderAvatar(res.data)
        },
        //解决直接输入网址进入主页未登录停留在主页问题,放到beseAPI统一解决
        // complete: (res) => {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}



const renderAvatar = (user) => {
    const name = user.nickname || user.username
    // 欢迎语
    $('#welcome').html('欢迎' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}

//退出
$('#btnLogout').click(() => {
    layer.confirm("是否退出登录？", { icon: 3, title: "提示" }, function (index) {
        localStorage.removeItem('token')
        location.href = '/login.html'
    })
})

getUserInfo()