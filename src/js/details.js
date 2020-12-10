

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









$(function () {


    let info = null
  

    const id = getCookie('goods_id')
  
    getGoodsInfo()
    async function getGoodsInfo() {
      const goodsInfo = await $.get('../servers/getGoodsInfo.php', { goods_id: id }, null, 'json')
  
      bindHtml(goodsInfo.info)
  
      class Enlaege{
        constructor(ele){
            this.ele=document.querySelector('.box')
            this.shadow=this.ele.querySelector('.shadow')
           
            this.small=this.ele.querySelector('.small')
            this.show=this.ele.querySelector('.show')
            this.big=this.ele.querySelector('.big')
        
            this.show_w=this.show.clientWidth
            this.show_h=this.show.clientHeight
    
            this.shadow_w=this.shadow.clientWidth
            this.shadow_h=this.shadow.clientHeight
    
            this.big_w=parseInt(window.getComputedStyle(this.big).width)
            this.big_h=parseInt(window.getComputedStyle(this.big).height)
    
            this.bg_w=parseInt(window.getComputedStyle(this.big).backgroundSize.split(' ')[0])
            this.bg_h=parseInt(window.getComputedStyle(this.big).backgroundSize.split(' ')[1])
            
            this.inite()
        }
        inite(){
            this.setShadow()
            this.overout()
            this.shadowMove()
            // this.change()
        }
    
        setShadow(){
            // console.log(this.shadow_w)
            this.shadow_w=this.big_w*this.show_w/this.bg_w
            this.shadow_h=this.big_h*this.show_h/this.bg_h
            
            this.shadow.style.width=this.shadow_w+'px'
            this.shadow.style.height=this.shadow_h+'px'
            // console.log(this.bg_w)
        }
        overout(){
            this.show.addEventListener('mouseover',()=>{
                this.shadow.style.display='block'
                this.big.style.display='block'
            })
            this.show.addEventListener('mouseout',()=>{
                this.shadow.style.display='none'
                this.big.style.display='none'
            
    
            })
        }
        shadowMove(){
            this.show.addEventListener('mousemove',(e)=>{
                
                this.shadow.style.display='block'
                console.log(this.show)
                e=e||window.event
                let x=e.offsetX-this.shadow_w/2
                let y=e.offsetY-this.shadow_h/2
    
    
                if(x<=0)  x=0
                if(y<=0)  y=0
                if(x>this.show_w-this.shadow_w) x=this.show_w-this.shadow_w
                if(y>this.show_h-this.shadow_h) y=this.show_h-this.shadow_h
                
                this.shadow.style.left=x+'px'
                this.shadow.style.top=y+'px'
    
                const bgw=x*this.big_w/this.shadow_w
                const bgh=y*this.big_h/this.shadow_h
                
                this.big.style.backgroundPosition = `-${ bgw }px -${ bgh }px`
                
                console.log(this.shadow)
            })
        }
    }
    
    new Enlaege('.box')
    


      info = goodsInfo.info
     
    }
  
    function bindHtml(info) {
      console.log(info)
    
      
      $('.box').html(`
      <div class="show">
                <img src="${ info.goods_big_logo }" alt="">
                <div class="shadow"></div>
            </div>
            <div class="small">
                <div class="active">
                    <img src="${ info.goods_big_logo }" show="${ info.goods_big_logo }" big="${ info.goods_big_logo }">
                    <i></i>
                </div>
            </div>
            <div class="big" style="background-image:url('${ info.goods_big_logo }');">
            </div>
      `)
  
      

      $('.box2').html(`
      <h4>${ info.goods_name }</h4>
      <P>${ info.cat_id }</P>
      <a href="">${ info.cat_one_id }${ info.cat_two_id }${ info.cat_three_id }>></a>
      <div class="price">
          <p>价格<span>¥${ info.goods_price }</span></p>
          <p>促销<span>双12全场优惠</span><i>8折</i></p>
      </div>
      <p>分类<span>${ info.cat_three_id }</span></p>
      <div class="num">
                数量 
                <button class="sub">-</button>
                <input type="text" value="1" class="cartNum">
                <button class="add">+</button>
            </div>
      <p><span class="jixu">继续购物</span><span class="btn btn-success addCart">加入购物车</span></p>
      `)
      $('.num').on('click', '.sub', function () {
        console.log('dsa')
        let num = $('.cartNum').val() - 0
        if (num === 1) return
        $('.cartNum').val(num - 1)
      }).on('click', '.add', function () {
        let num = $('.cartNum').val() - 0
        $('.cartNum').val(num + 1)
      })
      $('.jixu').on('click',function(){
          window.location.href='./list.html'
      })
      
    }
    
    $('.right').on('click', '.addCart', function () {
      alert('加入购物车')
      const cart = JSON.parse(window.localStorage.getItem('cart')) || []
  
      const flag = cart.some(item => item.goods_id === id)
      if (flag) {
        const cart_goods = cart.filter(item => item.goods_id === id)[0]
        cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
      } else {
        info.cart_number = 1
        cart.push(info)
      }
  
      
      window.localStorage.setItem('cart', JSON.stringify(cart))
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
   
  })










































//放大境















  

