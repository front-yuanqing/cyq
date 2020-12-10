
$(function(){
    const nickname=getCookie('nickname')
    if(!nickname){
        $('.n').removeClass('active')
        $('.on').addClass('active')
        return window.location.href='./login.html'
    }else if(nickname){
        $('.off').addClass('active')
        $('.on').removeClass('active')
        $('.on').html(`您好：${nickname}`)
        // $('.user>.zhu').addClass('avtive')
    }



    if (!nickname) return window.location.href = './login.html'

    const cart = JSON.parse(window.localStorage.getItem('cart')) || []
  
    if (!cart.length) {
      $('.no').addClass('hide')
      $('.kong').removeClass('hide')
      return
    }
  
    $('.kong').addClass('hide')
    $('.no').removeClass('hide')
  
    bindHtml()
    function bindHtml() {
      const selectAll = cart.every(item => item.is_select == 1)
      console.log(selectAll)
      let total = 0
      let totalMoney = 0
      cart.forEach(item => {
        if (item.is_select == 1) {
          total += item.cart_number - 0
          totalMoney += item.cart_number * item.goods_price
        }
      })
  
      // <input type="checkbox" class="all" ${selectAll? "checked" :""}>
      let str = `
      <ul class="top">
        <li class="allto" >
        <input type="checkbox" class="all" ${selectAll? "checked" :""}>
        全选
        </li>
        <li>商品</li>
        <li>属性</li>
        <li>单价</li>
        <li>数量</li>
        <li>小计</li>
        <li>操作</li>
        </ul>
        <p>360自营</p>
        <ul class="goods">
        <p>满399元，可领取赠品一件</p>
      `
      cart.forEach(item => {
        str += `
        <li>
        <input class="select item" data-id="${ item.goods_id }" type="checkbox" ${ item.is_select == 0 ? '' : 'checked' } >
        <ul>
            <li class="goodsImg">
                <img src="${ item.goods_small_logo }" alt="">
            </li>
            <li class="goodsDesc">
                <p>${ item.goods_name }</p>
            </li>
            <li>${ item.cat_three_id }</li>
            <li class="price">¥${ item.goods_price}.00</li>
            <li>
                <div class="num"> <button class="subNum" data-id="${ item.goods_id }">-</button><input type="text" value="${ item.cart_number }"><button class="addNum" data-id="${ item.goods_id }">+</button>
                </div>
            </li>
            <li>¥${ (item.goods_price * item.cart_number).toFixed(2) }</li>

            <li class="k"><button class="del" data-id="${ item.goods_id }">删除</button></li>
        </ul>
    </li>
        `
      })
  
      str += `
      </ul>
      <div class="pay">
          <div>
          <span><a href="./list.html">继续购物</a></span>
              <span class="w">删除全部商品</span>
          </div>
          <div>
              已选<span class="jj">${ total }</span>商品<span>合计：¥${ totalMoney.toFixed(2) }</span>
              <span class="jie">去结算</span>
          </div>
      </div>
      `
      // <input type="checkbox" class="all" ${ selectAll ? 'checked' : '' }>
      $('.carts').html(str)
      // console.log(str)
    }


    $('.carts').on('click', '.select', function () {
      

            const type = this.checked
            const id = $(this).data('id')
            const info = cart.filter(item => item.goods_id == id)[0]
            info.is_select = type ? '1' : '0'
            bindHtml()
            window.localStorage.setItem('cart', JSON.stringify(cart))
          })





            
    $('.carts').on('click', '.addNum', function () {
      
      const id = $(this).data('id')
      
      const info = cart.filter(item => item.goods_id == id)[0]
     
      info.cart_number = info.cart_number - 0 + 1
     
      bindHtml()
      
      window.localStorage.setItem('cart', JSON.stringify(cart))
    })

    $('.carts').on('click', '.subNum', function () {
           
            const id = $(this).data('id')
            
            const info = cart.filter(item => item.goods_id == id)[0]
            if (info.cart_number == 1) return
            info.cart_number = info.cart_number - 0 - 1
           
            bindHtml()
            window.localStorage.setItem('cart', JSON.stringify(cart))
          })

          

          $('.carts').on('click', '.del', function () {
              const id = $(this).data('id')
              for (let i = 0; i < cart.length; i++) {
                  if (cart[i].goods_id == id) {
                    cart.splice(i, 1)
                      break
                  }
                }
                  bindHtml()
                  window.localStorage.setItem('cart', JSON.stringify(cart))
  
        if (!cart.length) return window.location.reload()
    })


    $(".w").on('click',function(){
      window.localStorage.removeItem('cart') 
      window.location.reload()
     })


     $(".carts").on('click','.allto>input',function(){
       console.log('efdsf')
      if(!this.checked) {
        cart.forEach(item =>{
          item.is_select=0
        })
      }else{
        cart.forEach(item =>{
            item.is_select=1
        })
      }
        bindHtml()
        window.localStorage.setItem('cart',JSON.stringify(cart)) 
     })
})



