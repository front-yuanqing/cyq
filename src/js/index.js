
//轮播图
class Banner{
    constructor(ele){
        this.ele=document.querySelector(ele)
        this.ul=this.ele.querySelector('.imgBox')
        this.ol=this.ele.querySelector('.point')
        this.list=this.ele.querySelector('.leftRight')
        this.index=0
        this.time=0
        this.init()
    }
    init(){
        this.setPoin()
        this.autoPlay()
        this.overOut()
        this.leftRight()
        this. pointEvent ()
        this.changPage()
    }
    setPoin(){
        const sum=this.ul.children.length
        const fly=document.createDocumentFragment()
        for(let i=0;i<sum;i++){
            const li=document.createElement('li')
            if(i===0)li.classList.add('active')
            fly.appendChild(li)
            li.setAttribute('ol_index',i)
        }
        this.ol.appendChild(fly)
        this.ol.style.width=sum*30*1.5+'px'
    }
    changOne(type){
        this.ul.children[this.index].classList.remove('active')
        this.ol.children[this.index].classList.remove('active')
        if(type===true){
            this.index++
        }else if(type===false){
            this.index--
        }else{
            this.index=type
        }
        if(this.index>=this.ul.children.length)this.index=0
        if(this.index<0)this.index=this.ul.children.length-1
        this.ul.children[this.index].classList.add('active')
        this.ol.children[this.index].classList.add('active')
    }
    autoPlay(){
        this.time=setInterval(()=>{
            this.changOne(true)

        },3000)

    }
    leftRight(){
        this.list.addEventListener('click',(e)=>{
            e=e||window.event
            const target=e.target||e.srcElement
            if(target.className==='left'){
                this.changOne(false)
            }
            if(target.className==='right'){
               this.changOne(true)
            }
        })
    }
    overOut(){
        this.ele.addEventListener('mouseover',()=>{
            clearInterval(this.time)
        })
        this.ele.addEventListener('mouseout',()=>{
            this.autoPlay()
        })
    }
    pointEvent(){
        this.ol.addEventListener('click',(e)=>{
            e=e||window.event
            const target=e.target||e.srcElement
            if(target.nodeName==='LI'){
                const i=target.getAttribute('ol_index')-0
                this.changOne(i)
            }
           
        })
    }
    changPage(){
        document.addEventListener('visibilitychange',()=>{
            const yy=document.visibilityState
            if(yy=='hidden'){
                clearInterval(this.time)
            }
            if(yy==='visible'){
                this.autoPlay()
            }
        })
    }
}
new Banner('.banner')



const nickname=getCookie('nickname')
// console.log(nickname)

if(nickname){
    $('.off').addClass('active')
    $('.on').removeClass('active')
    $('.on').html(`您好：${nickname}<ul class="dd">
    <li>我的会员</li>
    <li>我的订单</li>
    <li>我的优惠券</li>
    <li>我的收藏</li>
    <li>我的积分</li>
    <li>我的预约</li>
    <li>收货地址</li>
    <li>账号设置</li>
    <li class="tui">退出登录</li>
</ul>`)
}else{
    $('.off').removeClass('active')
    $('.on').addClass('active')
}



$('.tui').on('click',function(){
    // console.log('fdf')
    setCookie('nickname', '')
    window.location.reload()
})




/////右拉列表
$('.kk>li').mouseover(function(){
    $(this).find('div').show(0,'linear',()=>{})
})
$('.kk>li').mouseout(function(){
    $(this).find('div').hide(0,'linear',()=>{})
})




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
    // console.log(res)
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



// http://mall.360.cn/h5/getSecondaryCategory?type=pc_index_category&id=20


// https://www.duitang.com/napi/blog/list/by_filter_id/?include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Csender%2Calbum%2Creply_count&filter_id=%E7%BE%8E%E9%A3%9F%E8%8F%9C%E8%B0%B1&start=24&_=1607395302305


    $(function(){
        for(let n=1;n<=9;n++){
            ajax({
                url:`/dta`,
                data:`type=pc_index_category&id=2${n-1}`,
                success(res){
                    res=JSON.parse(res)
                    decorate(res.data.secondary)
                    function decorate(arr){
                        // let str=`<div>`
                        let str=''
                        for(let i=0;i<arr.length;i++){
                            str+=`
                            <div>
                            <p>${arr[i].name}</p>
                            <ul class="goods">
                            `
                                    
                            for(let j=0;j<arr[i].item.length;j++){
                                str+=`
                                <li>
                                <img src="${arr[i].item[j].pic}" alt="">
                                    <i>${arr[i].item[j].tag}</i>
                                    <span>${arr[i].item[j].name}</span>
                                </li>
                                `
                            }
                              str+=`</ul>
                              </div>`      
                        }
                        $(`.kk>li:nth-of-type(${n})>div`).html(str)
                    }
                }
            }) 
        }
    })
    

    // http://search.mall.360.cn/search/latest?callback=jQuery110207161548584665598_1607565933520&q=*&size=20&page=0&_=1607565933522

$(function(){
   

    const script = document.createElement('script')
    const url = `http://search.mall.360.cn/search/latest?callback=kk&q=*&size=20&page=1&_=1607565933522`

    script.src=url
    document.body.appendChild(script)
    script.remove()


})
function kk(res){
    // console.log(res.data.list)
    const arr=res.data.list
    let str = ''

    for (let i = 0; i < arr.length; i++) {
            



      str += `
      <li>
      <img src="${arr[i].img}" alt="">
      <p>${arr[i].title}</p>
      <span>¥${arr[i].stock}</span>
      <a href="">直降</a>
      </li>
      `
    }
    $('.more').html(str)

    
}


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
    // console.log(cart.length)
    let count = 0
    cart.forEach(item => count += item.cart_number - 0)
    // console.log(count)
    $('.qqq').html(`(${count})`)
  
  
}
q()


  $('.ba').on('click',function(){
    window.scrollTo({
        left: 0,
        top:0,
        behavior: 'smooth'
      })
  })
    
//   var t=document.querySelectorAll('.lou')
//   console.log(t)
$('.ba').addClass('hide')
  $('.stairs').on('click','li',function () {

    $('html').animate({ scrollTop: $('.lou').eq($(this).index()).offset().top })
    $(this).next().addClass('active').siblings().removeClass('active')
  })

  $(window).on('scroll',function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const window_height = document.documentElement.clientHeight

    if(scrollTop<=200){
        $('.stairs').addClass('hide')
        $('.ba').addClass('hide')
    }else{
        $('.stairs').removeClass('hide')
        $('.ba').removeClass('hide')
    }
    const lis = $('.lou')
    // console.log(lis)
    for (let i = 0; i < lis.length; i++) {
      const li_top = $(lis[i]).offset().top
      

      const li_height = $(lis[i]).outerHeight()
      if (li_top <= scrollTop + window_height) {
        $('.stairs> li').eq(i).addClass('active').siblings().removeClass('active')
      }
    }
  })



