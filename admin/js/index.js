$(function(){
    // 怎样携带token令牌
    // 1.ajax请求----设置请求头
    $.ajax({
        url:BigNew.user_info,
        //设置请求头,把token令牌带过去
        /* headers:{
            Authorization:window.localStorage.getItem('token')//----------这样的话  每次发送请求   都需要   设置请求头
        }, */
        success:function(back){
            // 此时是禁止访问数据的-----将登录时ajax请求返回的token令牌携带即可
            // console.log(back);

            // // 将返回的数据渲染至页面
            $('.sider>.user_info>span>i').text(back.data.nickname);
            $('.sider .user_info img').attr('src',back.data.userPic);
            $('.header_bar .user_center_link img').attr('src',back.data.userPic);
        }
    })

    // 2.原生js携带token令牌-----依然设置一个请求头
    /* var xhr=new XMLHttpRequest();
    xhr.open('get','http://localhost:8080/api/v1/admin/user/info'),
    
    //设置一个请求头
    xhr.setRequestHeader('Authorization',window.localStorage.getItem('token'));


    xhr.onload=function(){
        var data=JSON.parse(xhr.responseText);//-------将json数据转换为js数据
        console.log(data);//-----返回的是json数据
        $('.sider .user_info i').val(data.data.nickname);
        $('.sider .user_info img').attr('src',data.data.userPic);
        $('.header_bar .user_center_link img').attr('src',data.data.userPic);
    }
    xhr.send();//原生js的ajax请求send只能放在onload后面  */

    //退出功能---清除localStorage中的token令牌-----跳转到登录页面
    $('.header_bar .user_center_link .logout').on('click',function(){
        window.localStorage.removeItem('token');
        window.location.href='./login_self.html';
    })


    // 首页的一级菜单点击事件----添加active类
    $('.level01').on('click',function(){
        $(this).addClass('active').siblings('div').removeClass('active');
        // 如果点击到文章管理----则显示ul
        if($(this).index()==1){
            $('.level02').slideToggle();//----显示则隐藏---隐藏则显示

            // 默认选择一个二级菜单          其实直接设置不就得了
            // 学习方法吧
            $('.level02>li:eq(0)>a')[0].click();
            //jQuery对象的click()事件,他只会触发js单击事件,而不会触发a标签的默认跳转事件. 
            //dom对象的click()事件,他不仅会触发js单击事件,还会触发a标签的默认跳转事件

            // 小箭头的缓动旋转
            $('.icon-arrowdownl').toggleClass('rotate0');//----显示则隐藏---隐藏则显示
        }
    })

    // 首页  文章管理 二级菜单点击事件-----添加
    $('.level02>li').on('click',function(){
        $(this).addClass('active').siblings('li').removeClass('active');
    })
})
