$(function () {
    //调用getUserInfo 获取用户基本信息
    getUserInfo()

    var layer = layui.layer
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登陆？', { icon: 3, title: '提示' },
            function (index) {
                // 清空本地存储中token
                localStorage.removeItem('token')
                // 重新跳转到登录页面
                location.href = 'login.html'
                // 关闭conifirm询问框
                layer.close(index)
            })
    })


})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar() 渲染用户的头像
            renderAvatar(res.data)
        }
    })
}
// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需求渲染用户的头像
    // 注意：此处的判断条件一定要根据拿到的返回值的数据对应类型做判断
    if (user.user_pic !== null) {
        // 渲染图片头像            
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        // 渲染文字头像
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
        $('.layui-nav-img').hide()
    }
}