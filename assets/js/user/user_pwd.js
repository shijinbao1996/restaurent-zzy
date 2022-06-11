$(function () {
    const form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
        samePwd: (value) => {
            if (value === $('[name=oldPwd]').val()) return "新密码和原密码不能一致"
        },
        rePwd: (value) => {
            if (value !== $('[name=newPwd]').val()) return "新密码和确认密码不一致"
        }
    })


    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('修改密码失败')
                layer.msg('修改密码成功')
                //强制清空token
                localStorage.removeItem('token')
                //让客户端返回到登陆页面
                parent.location.href = '/login.html'
            }
        })
    })
})