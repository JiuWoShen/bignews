$(function () {
    // 文章类别管理-----进入页面首先获取所有的文章类别显示在页面----后面新增编辑删除都需要调用---因此封装为方法
    getData();
    function getData(){
        $.ajax({
        url: BigNew.category_list,
        success: function (back) {
            // console.log(back);
            // 通过模板引擎渲染至页面
            // 调用模板引擎核心方法
            var lis = template('temp', back.data);
            $('tbody').html(lis);
        }
    })
    };
    
    //二: 到底点击的是新增分类 /编辑 弹出来的模态框
    // show.bs.modal	show 方法调用之后立即触发该事件。如果是通过点击某个作为触发器的元素，则此元素可以通过事件的 relatedTarget 属性进行访问。
    $('#myModal').on('show.bs.modal', function (e) {
        // console.log(e.relatedTarget);
        if (e.relatedTarget.id == 'xinzengfenlei') {//获取属性名得需要触发条件----因此使用 e
            $('#exampleModalLabel').text('新增分类');
            $('.btn_queren').text('新增').addClass('btn-primary').removeClass('btn-success');

            // 如果是新增则在弹出模态框的是先清空里面的内容
            // console.log($('#myModal form'));
            $('#myModal form')[0].reset();//=========================================================需要视频加强一下

        } else {
            $('#exampleModalLabel').text('编辑分类');
            $('.btn_queren').text('编辑').addClass('btn-success').removeClass('btn-primary');

            // 编辑----将对应内容显示在模态框中
            $('#recipient-name').val($(e.relatedTarget).parent().prev().prev().text());
            $('#message-text').val($(e.relatedTarget).parent().prev().text());

            //  把当前点击的整个编辑按钮身上存放的id, 保存在隐藏域中-----input中
            $('#id_hidden').val($(e.relatedTarget).attr('data-id'));
        }
    })
    /*// 模态框按钮点击事件----完全没必要啊，在新增时清空就OK啊
     $('.btn_cancel').on('click',function(){
        $('#myModal form')[0].reset();   //注意reset方法 这里只能用  DOM对象点出来
    }) */

    // 确认按钮的点击事件
    $('.btn_queren').on('click', function () {
        if ($(this).hasClass('btn-primary')) {
            // 新增逻辑
            var name_add = $('#recipient-name').val();
            var slug_add = $('#message-text').val();
            $.ajax({
                type: 'post',
                url: BigNew.category_add,
                data: {
                    name: name_add,
                    slug: slug_add
                },
                success: function (back) {
                    // console.log(back);
                    // 隐藏模态框-----刷新数据
                    $('#myModal').modal('hide')
                    getData();
                }
            })

        } else {
            // 编辑逻辑-----需要id
            var name_add = $('#recipient-name').val();
            var slug_add = $('#message-text').val();
            var id_add = $('#id_hidden').val()
            // console.log($('#id_hidden').val());//-------这里的id是取模板引擎里记录的id
            $.ajax({
                type:'post',
                url:BigNew.category_edit,
                data:{
                    id:id_add,
                    name:name_add,
                    slug:slug_add
                },
                success:function(back){
                    // console.log(back);
                    // 隐藏模板，刷新数据
                    $('#myModal').modal('hide');
                    getData();
                }
            })

        }
    })
    // 删除动态生成的都需有此功能----委托注册------与原有数据的 最近的公共元素为tbody
        // 删除功能
        $('tbody').on('click','.btn_dele',function(){
            var id_dele=$(this).attr('data-id');
            if(confirm('真的要删除吗')){
                $.ajax({
                    type:'post',
                    url:BigNew.category_delete,
                    data:{
                        id:id_dele
                    },
                    success:function(back){
                        // console.log(back);
                        getData();
                    }
                })
            } 
        })

})