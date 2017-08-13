<template>
    <div class="cartcontrol">
      <transition name="my">
        <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart"></div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>
<script>
  import Vue from 'vue'
    export default {
        props:{
          food:{
              type:Object
          }
        },
        methods: {
          addCart(event){
            if (!event._constructed) {
              return
            }
              if(!this.food.count){
                  Vue.set(this.food,'count',1)
              }else{
                  this.food.count++
              }
          },
          decreaseCart(){
            if(!event._constructed){
              return
            }
            if(this.food.count){
                this.food.count--;
            }
          }
        }
    }
</script>
<style scoped lang="less">
  .cartcontrol{
    font-size: 0;
    .cart-decrease,.cart-add{
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0,160,220);
    }
    .inner{
      display: inline-block;
    }
    .my-enter-active,.my-leave-active{
      transition: all 0.5s;
    }
    .my-leave-to{
      opacity: 0;
      transform: translateX(30px);
    }
    .my-enter{
      opacity: 0;
      transform: translateX(48px);
    }
    .cart-count{
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color:rgb(147,153,159);
    }
    .cart-add{
      display: inline-block;
    }
  }
</style>
