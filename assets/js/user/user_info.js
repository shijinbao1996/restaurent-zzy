$(function () {
    const form = layui.form
    //自定义校验规则
    form.verify({
        nickname: (value) => {
            if (value.length > 7) return "昵称长度不能大于6个字符"
        }
    })

    //进页面自动获取用户信息渲染至input框
    const initUserInfo = () => {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                layer.msg('获取用户信息成功')
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置用户信息
    $('#btnReset').click((e) => {
        e.preventDefault()
        initUserInfo()
    })

    //监听提交事件，进行用户信息修改
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            //获取from所有带有name上传至服务器
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('修改用户名失败')
                layer.msg('修改用户名成功')
                //通知父级重新获取已修改数据
                parent.getUserInfo()
            }
        })
    })

    initUserInfo()

})