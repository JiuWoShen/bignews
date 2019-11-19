$(function () {
    // 获取文章分类
    $.ajax({
        url: BigNew.category_list,
        success: function (back) {
            // console.log(back);
            if (back.code == 200) {
                // 通过模板引擎  渲染至下拉框中
                var resHtml = template('dis_temp', back);
                $('#selCategory').html(resHtml);
            }

        }
    })
    $('#pagination').next().hide();

    // 将刷新数据封装为方法
    function refresh_data(page, callback) {
        $.ajax({
            url: BigNew.article_query,
            data: {
                // key
                page: page,//显示当前点击的页码内容-----点击页码
                perpage: 8,     //每页显示几条信息
                type: $('#selCategory').val().trim(),
                state: $('#selStatus').val().trim(),
            },
            success: function (back) {
                // console.log(back);
                // 通过模板引擎渲染至页面
                if (back.code == 200) {
                    var resHtml = template('cator_temp', back);
                    $('tbody').html(resHtml);

                    // 改善一下的话就是  没有数据时提示用户没有数据    且隐藏页码插件
                    if (callback != null && back.data.data.length !=0) {
                        
                        $('#pagination').show();
                        $('#pagination').next().hide();
                        callback(back);
                    }else if(back.data.data.length == 0){
                        $('#pagination').next().show();
                        $('#pagination').hide();
                    }
                }
            }
        })
    }


    // 进入页面发送请求获取  默认条件下的  所有文章
    $.ajax({
        url: BigNew.article_query,
        success: function (back) {
            // console.log(back);
            // 通过模板引擎渲染至页面
            if (back.code == 200) {
                var resHtml = template('cator_temp', back);
                $('tbody').html(resHtml);

                var new_page = 10;
                $('#pagination').twbsPagination({
                    totalPages: back.data.totalPage,    //-----总页数
                    visiblePages: 6,        //-----每行可见的页数---li的个数
                    first: '首页',
                    prev: '上一页',
                    next: '下一页',
                    last: '尾页',
                    onPageClick: function (event, page) {
                        // console.info(page);
                        // 发送请求重新获取对应页码的数据
                        /*  $.ajax({
                             url: BigNew.article_query,
                             data: {
                                 // key
                                 page: page,//显示当前点击的页码内容-----点击页码
                                 perpage: 8,     //每页显示几条信息
                                 type: $('#selCategory').val().trim(),
                                 state: $('#selStatus').val().trim(),
                             },
                             success: function (back) {
                                 // console.log(back);
                                 // 通过模板引擎渲染至页面
                                 if (back.code == 200) {
                                     var resHtml = template('cator_temp', back);
                                     $('tbody').html(resHtml);
                                 }
                             }
                         }) */
                        refresh_data(page, null);
                    }
                })
            }

        }
    })
    // 点击 获取 对应条件的 数据
    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        /* $.ajax({
            url: BigNew.article_query,
            data: {
                page: 1,       //显示当前点击的页码内容-----点击页码
                perpage: 8,          //每页显示几条信息
                type: $('#selCategory').val().trim(),
                state: $('#selStatus').val().trim(),
            },
            success: function (back) {
                // console.log(back);
                // 通过模板引擎渲染至页面
                if (back.code == 200) {
                    var resHtml = template('cator_temp', back);
                    $('tbody').html(resHtml);
                    // 页数改变
                    // 页签模板id      调用方法        页数改变事件         现有条件下的总页数     默认跳至第几页
                    $('#pagination').twbsPagination('changeTotalPages', back.data.totalPage, 1);
                }
            }
        }) */
        refresh_data(1, function (back) {
            $('#pagination').twbsPagination('changeTotalPages', back.data.totalPage, 1);
        });
    })

    //  点击删除文章----委托注册---发送ajax请求

    $('tbody').on('click', '.delete', function () {
        var id_delet = $(this).attr('data_id');
        if (confirm('确定要删除吗？')) {
            $.ajax({
                type: 'post',
                url: BigNew.article_delete,
                data: {
                    id: id_delet
                },
                success: function (back) {
                    // console.log(back);
                    // 提示删除成功后刷新数据
                    alert('删除成功');
                    // 刷新数据
                    /* $.ajax({
                        url: BigNew.article_query,
                        data: {
                            page: 1,       //显示当前点击的页码内容-----点击页码
                            perpage: 8,          //每页显示几条信息
                            type: $('#selCategory').val().trim(),
                            state: $('#selStatus').val().trim(),
                        },
                        success: function (back) {
                            // console.log(back);
                            // 通过模板引擎渲染至页面
                            if (back.code == 200) {
                                var resHtml = template('cator_temp', back);
                                $('tbody').html(resHtml);
                                // 页数改变
                                // 页签模板id      调用方法        页数改变事件         现有条件下的总页数     默认跳至第几页
                                $('#pagination').twbsPagination('changeTotalPages', back.data.totalPage, 1);
                            }
                        }
                    }) */
                    refresh_data(1, function (back) {
                        $('#pagination').twbsPagination('changeTotalPages', back.data.totalPage, 1);
                    });
                }
            })
        }
    })


})
