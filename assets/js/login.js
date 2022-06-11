$(function () {
    //注册点击切换功能
    $('#link_reg').click(() => {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').click(() => {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 获取layui里面的form
    const form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
        repwd: (value) => {
            const pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return "两次密码不一致"
        }
    })
    // 基本路径
    // const baseUrl = 'http://www.liulongbin.top:3007'
    //监听注册form表单
    $('#form_reg').submit((e) => {
        e.preventDefault();
        // 发起请求
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功')
                $('#link_login').click()
                $('#form_reg [name=username]').val('')
                $('#form_reg [name=password]').val('')
                $('#form_reg [name=repassword]').val('')
            }
        })


    })

    //监听登录form表单
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('登陆失败')
                layer.msg('登陆成功')
                //把token存在本地
                localStorage.setItem('token', res.token)
                //跳转岛首页
                location.href = '/index.html'
            }
        })
    })

})