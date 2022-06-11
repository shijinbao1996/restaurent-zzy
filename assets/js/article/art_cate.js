$(function () {
    //获取文章列表
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取文章分类列表失败')
                //调用模板引擎
                const htmlStr = template('tpl-table', res)
                $('tbody').empty().html(htmlStr)
            }
        })
    }

    initArtCateList()
    let indexAdd = null;
    $('#btnAddCate').click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html()
        });
    })

    //事件委托给新添加的form表单添加submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('添加失败')
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })

})