<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount>0}">
              <i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliverPrice}}元 </div>
        </div>
        <div class="content-right" @click.stop.prevernt="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls" v-show="ball.show"></div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" id="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fadeIn">
      <div @click="hideList" class="list-mark" v-show="listShow"></div>
    </transition>
  </div>
</template>
<script>
  import BSscroll from 'better-scroll';
  import cartControl from 'components/cartcontrol/cartControl'
  export default {
    props: {
      selectFoods: {
        type: Array,
        default(){
          return []
        }
      },
      deliverPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        fold: false,
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ]
      }
    },
    computed: {
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        });
        return total
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count
      },
      payDesc(){
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass(){
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow(){
        if (!this.totalCount) {
          this.fold = true;
          return false
        }
        let show = !this.fold;
        if(show){
            this.$nextTick(()=>{
                if(!this.scroll){
                  this.scroll=new BSscroll(document.getElementById('listContent'),{
                    click:true
                  })
                }else{
                    this.scroll.refresh()
                }
            })
        }
        return show
      }
    },
    components: {cartControl},
    methods: {
      toggleList(){
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold
      },
      empty(){
          this.selectFoods.forEach((food)=>{
              food.count=0
          })
      },
      hideList(){
          this.fold=true;
      },
      pay(){
          if(this.totalPrice<this.minPrice){
              return;
          }
          window.alert(`支付${this.totalPrice}元`)
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../common/less/mixin";
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content {
      display: flex;
      background: #141d27;
      font-size: 0;
      color: rgba(255, 255, 255, 0.4);
      .content-left {
        flex: 1;
        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          vertical-align: top;
          border-radius: 50%;
          background: #000;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #2b343c;
            text-align: center;
            .icon-shopping_cart {
              font-size: 24px;
              color: #80858a;
              line-height: 44px;
              &.highlight {
                color: #fff;
              }
            }
            &.highlight {
              background: rgb(0, 160, 220);
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            text-align: center;
            border-radius: 16px;
            font-weight: 700;
            font-size: 9px;
            color: #fff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
            line-height: 17px;
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin-top: 12px;
          box-sizing: border-box;
          padding-right: 12px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 16px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          &.highlight {
            color: #fff;
          }
        }
        .desc {
          display: inline-block;
          line-height: 24px;
          vertical-align: top;
          margin: 12px 0 0 12px;
          font-size: 10px;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        background: #2b333b;
        .pay {
          line-height: 48px;
          height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          &.not-enough {
            background: #2b333b;
          }
          &.enough {
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .shopcart-list {
      position: absolute;
      bottom: 48px;
      left: 0;
      z-index: -1;
      width: 100%;
      &.fold-enter-active,&.fold-leave-active{
        transition: all 0.5s;
      }
      &.fold-enter{
        transform: translate3d(0, 100%, 0)
      }
      &.fold-leave-to{
        transform:translate3d(0, 100%, 0)
      }
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220)
        }
      }
      .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
        .food{
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          .border-1px(rgba(7,17,27,0.1));
          .name{
            line-height: 24px;
            font-size: 14px;
            color:rgb(7,17,27);
          }
          .price{
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color:rgb(240,20,20);
          }
          .cartcontrol-wrapper{
            position: absolute;
            right:0;
            bottom: 6px;
          }
        }
      }
    }
  }
  .list-mark{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height:100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    background: rgba(7,17,27,0.6);
  }
  .fadeIn-enter,.fadeIn-leave{
    opacity: 0;
  }
  .fadeIn-enter-active,.fadeIn-leave-active{
    transition: all 0.5s;
  }
</style
>
