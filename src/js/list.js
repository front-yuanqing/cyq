const nickname=getCookie('nickname')


if(nickname){
    $('.off').addClass('active')
    $('.on').removeClass('active')
    $('.on').html(`您好：${nickname}`)
    // $('.user>.zhu').addClass('avtive')
}else{
    $('.off').removeClass('active')
    $('.on').addClass('active')
}









  const ul=document.querySelector('.find>ul')
const inp=document.querySelector('.find>input')


inp.addEventListener('input',function(){
    const value =this.value.trim()
    if(!value){
        ul.classList.remove('active')

        return
    }
    const script = document.createElement('script')
    const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`

    script.src=url
    document.body.appendChild(script)
    script.remove()
})

function bindHtml(res){
    if(!res.g){
        ul.classList.remove('active')
        return
    }
    let str = ''

      for (let i = 0; i < res.g.length; i++) {
        str += `
          <li>${ res.g[i].q }</li>
        `
      }

      ul.innerHTML = str
      // 让 ul 显示出来
      ul.classList.add('active')
}


$(function(){

  let list=null

  const list_info={
    cat_one: 'all',
    cat_two: 'all',
    sort_method: '默认',
    sort_type: 'ASC',
    current: 1,
    pagesize:20
  }

  getCateOne()
  async function getCateOne() {
    const cat_one_list = await $.get('../servers/getCateOne.php', null, null, 'json')
    
    let str = `<span data-type="all" class="active">全部</span>`
    cat_one_list.list.forEach(item => {
      str += `
        <span data-type="${ item.cat_one_id }">${ item.cat_one_id }</span>
      `
    })
    $('.cateOneBox > .right').html(str)
  }



  
  async function getCateTwo() {
    
    const cate_two_list = await $.get('../servers/getCateTwo.php', { cat_one: list_info.cat_one }, null, 'json')
    

    let str = '<span data-type="all" class="active">全部</span>'
    cate_two_list.list.forEach(item => {
      str += `<span data-type="${ item.cat_two_id }">${ item.cat_two_id }</span>`
    })
    $('.catTwoBox >.right').html(str)

  }



  getTotalPage()
  async function getTotalPage() {
    const totalInfo = await $.get('../servers/getTotalPage.php', list_info, null, 'json')
    $('.pagination').pagination({
      pageCount: 100, 
      current: 1, 
      prevContent:'上一页',
      prevCls: 'prevBox', 
      nextContent: '下一页', 
      coping: true,
      homePage: '首页', 
      endPage: '末页',
      pageCount: totalInfo.total,
      callback (index) {
        list_info.current = index.getCurrent()
        getGoodsList()
      }
    })
  }


  getGoodsList()
  async function getGoodsList() {
    const goodsList = await $.get('../servers/getGoodsList.php', list_info, null, 'json')
    list = goodsList.list

    let str = ''
    goodsList.list.forEach(item => {
      str += `
      <div>
      <img src="${item.goods_big_logo}" alt="">
      <p data-id="${ item.goods_id }">${item.goods_name}</p>
      <span>¥${item.goods_price}</span>
      <a href="" class="glyphicon glyphicon-shopping-cart addCart" data-id="${ item.goods_id }">加入购物车</a>
      </div>
      `
    })
    
    $('.shopBox').html(str)
  }



  $('.cateOneBox').on('click', 'span', function () {
    $(this).addClass('active').siblings().removeClass('active')

    const type = $(this).data('type')

    list_info.cat_two = 'all'

    list_info.current = 1

    list_info.cat_one = type

    getTotalPage()
    getGoodsList()
    $('.catThreeBox .right').html('<span data-type="all" class="active">全部</span>')

   
    if (type === 'all') {
  
      $('.catTwoBox .right').html('<span data-type="all" class="active">全部</span>')
    } else {
      getCateTwo()
    }
  })



  $('.sortBox').on('click','span',function () {
   
    const method = $(this).attr('data-method')
    const type = $(this).attr('data-type')

    $(this).addClass('active').siblings().removeClass('active')
    
    list_info.sort_method = method
    list_info.sort_type = type

    getTotalPage()
    getGoodsList()

    $(this).attr('data-type', type === 'ASC' ? 'DESC' : 'ASC').siblings().attr('data-type', 'ASC')
  })




  $('.catTwoBox').on('click', 'span', function () {
    const type = $(this).data('type')

    $(this).addClass('active').siblings().removeClass('active')

    list_info.current = 1
    list_info.cat_two = type
  
    getTotalPage()
    getGoodsList()
  })




  $('.shopBox').on('click', 'div', function () {
    const id = $(this).find('p').data('id')
    setCookie('goods_id', id)

    console.log(id)
    window.location.href = './details.html'
  })


  $('.shopBox').on('click','.addCart', function () {
    alert('加入购物车成功')
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []


    const id = $(this).data('id')

    const flag = cart.some(item => item.goods_id == id)
    if (flag) {
      const cart_goods = cart.filter(item => item.goods_id == id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + 1
    } else {
      const info = list.filter(item => item.goods_id == id)[0]
      info.cart_number = 1
      cart.push(info)
    }
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })


  

})

function q() {
  // 拿到 localStorage 里面的那个数组
  const cart = JSON.parse(window.localStorage.getItem('cart')) || []
  // 3-2. 判断 cart 是一个 [], 那么就用 0 填充到指定位置
  if (!cart.length) {
    $('.qqq').html(`(1)`)
    return
  }
  // 3-3. 能来到这里, 表示购物车里面有数据
  // 需要把每一条数据的 cartNum 叠加咋一起
  console.log(cart.length)
  let count = 0
  cart.forEach(item => count += item.cart_number - 0)
  console.log(count)
  $('.qqq').html(`(${count})`)


}
q()


