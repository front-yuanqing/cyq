
$(function () {
    $('.login').validate({
      rules: {
        username: {
          required: true,
          minlength: 5,
          maxlength: 10
        },
        password: {
          required: true,
          minlength: 6,
          maxlength: 12
        }
      },
      // 提示信息配置
      messages: {
        username: {
          required: '请填写用户名信息',
          minlength: '最少 5 个字符',
          maxlength: '最多 10 个字符'
        }
      },
      submitHandler (form) {
        const info = $(form).serialize()
        console.log(info)
        $.post('../servers/login.php',info, null, 'json').then(res => {
          console.log(res)
          if (res.code === 0) {
            $('paw_erro').addClass('active')
          } else if (res.code === 1) {
            setCookie('nickname', res.nickname)
            console.log(res.nickname)
            window.location.href = './index.html'
          }
        })
      }
    })
  })
  