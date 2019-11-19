$(function () {
    // 发送ajax请求将详细信息渲染至该页面
    $.ajax({
        url: BigNew.user_detail,
        success: function (backData) {
            // console.log(backData);
            /* $('#inputEmail1').val(backData.data.username);
            $('#inputEmail2').val(backData.data.nickname);
            $('#inputEmail3').val(backData.data.email);
            $('.user_pic').attr('src',backData.data.userPic);
            $('#inputEmail4').val(backData.data.password); */

            // 以上设置代码都差不多----可用对象遍历方法   进行赋值
            for (var key in backData.data) {
                // $('#inputEmail'+ ).val(backData.data.username);
                $('input.' + key).val(backData.data[key]);
                // jquery允许这种操作----当然也可以判断一下在进行赋值操作
                $('.user_pic').attr('src', backData.data.userPic);
            }
        }
    })

    // 编辑头像---图片预览功能
    //给选择图片的input:file按钮设置一个值改变事件
    $('#exampleInputFile').on('change', function () {
        // 1.获取改变的图片
        var fileIcon = this.files[0];
        // console.log(fileIcon);
        // 2.生成一个地址
        var iconUrl = URL.createObjectURL(fileIcon);
        // console.log(iconUrl);
        // 3.给目标区域设置
        $('.user_pic').attr('src', iconUrl);
    })

    // 点击修改按钮---完成用户信息修改
    // 发送ajax请求
    $('.btn-edit').on('click', function (e) {
        e.preventDefault();//form表单里的submit---阻止默认跳转
        var fd = new FormData($('#form')[0]);//创建formdata数据传入DOM对象
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,

            contentType: false,//formdata为参数发送ajax请求注意这两个参数的设置
            processData: false,//

            data: fd,

            success: function (back) {
                // console.log(back);
                alert('修改成功');
                // 修改成功后刷新页面数据
                // 1.整个页面刷新
                // parent.window.location.reload();

                // 2.发送ajax请求重新获取数据---及渲染
                // 1.ajax请求----设置请求头
                $.ajax({
                    url: BigNew.user_info,
                    success: function (back) {
                        parent.$('.sider>.user_info>span>i').text(back.data.nickname);
                        parent.$('.sider .user_info img').attr('src', back.data.userPic);
                        parent.$('.header_bar .user_center_link img').attr('src', back.data.userPic);
                    }
                })
            }
        })
    })


})