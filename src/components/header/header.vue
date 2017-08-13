<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliverTime}}分钟送达


        </div>
        <div v-if="seller.supports" class="support">
          <i class="icon" :class="classMap[seller.supports[0].type]"></i>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import Star from 'components/star/star'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'special']
    },
    computed: {},
    components: {Star},
    methods: {
      showDetail(){
        this.detailShow = true
      },
      hideDetail(){
        this.detailShow = false
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../common/less/mixin.less";

  .header {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
    color: #fff;
    background: rgba(7, 17, 27, 0.5);
    .content-wrapper {
      position: relative;
      display: flex;
      flex-direction: row;
      flex: 1;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .avatar {
        img {
          width: 64px;
          height: 64px;
          border-radius: 5px;
        }
      }
      .content {
        margin-left: 16px;
        font-size: 14px;
        .title {
          margin: 2px 0 8px 0;
          .brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            .bg-image('../../components/header/brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
            vertical-align: text-bottom;
          }
          .name {
            margin-left: 6px;
            line-height: 18px;
            font-size: 16px;
            font-weight: bold;
          }
        }
        .description {
          margin: 10px 0;
          line-height: 12px;
          font-size: 12px;
        }
        .support {
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: top;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              .bg-image('../../components/header/decrease_1')
            }
            &.discount {
              .bg-image('../../components/header/discount_1')
            }
            &.guarantee {
              .bg-image('../../components/header/guarantee_1')
            }
            &.invoice {
              .bg-image('../../components/header/invoice_1')
            }
            &.special {
              .bg-image('../../components/header/special_1')
            }
          }
          .text {
            line-height: 10px;
            font-size: 12px;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding: 0 8px;
        height: 24px;
        line-height: 26px;
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count {
          font-size: 10px;
          vertical-align: top;
        }
        .icon-keyboard_arrow_right {
          font-size: 10px;
          line-height: 24px;
          margin-left: 2px;
        }
      }
    }
    .bulletin-wrapper {
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(7, 17, 27, 0.2);
      .bulletin-title {
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        width: 22px;
        height: 12px;
        .bg-image('../../components/header/bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text {
        vertical-align: top;
        margin: 0 4px;
        font-size: 10px;
        line-height: 28px;
      }
      .icon-keyboard_arrow_right {
        position: absolute;
        font-size: 10px;
        right: 12px;
        top: 8px;
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .detail {
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: rgba(7, 17, 27, 0.8);
      backdrop-filter: blur(10px);
      &.fade-enter-active, &.fade-leave-active {
        transition: opacity .5s
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0
      }
      .detail-wrapper {
        min-height: 100%;
        width: 100%;
        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          .name {
            line-height: 16px;
            font-weight: 700;
            text-align: center;
            font-size: 16px;
          }
          .star-wrapper {
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
        }
      }
      .title {
        display: flex;
        width: 80%;
        margin: 28px auto;
        .line {
          flex: 1;
          position: relative;
          top: -6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .text {
          padding: 0 12px;
          font-weight: 700;
          font-size: 14px;
        }
      }
      .supports {
        width: 80%;
        margin: 0 auto;
        .support-item {
          padding: 0 12px;
          margin-bottom: 12px;
          font-size: 0;
          &:last-child {
            margin-bottom: 0;
          }
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: top;
            margin-right: 6px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            &.decrease {
              .bg-image('../../components/header/decrease_2')
            }
            &.discount {
              .bg-image('../../components/header/discount_2')
            }
            &.guarantee {
              .bg-image('../../components/header/guarantee_2')
            }
            &.invoice {
              .bg-image('../../components/header/invoice_2')
            }
            &.special {
              .bg-image('../../components/header/special_2')
            }
          }
          .text {
            line-height: 16px;
            font-size: 12px;
          }
        }
      }
      .bulletin {
        width: 80%;
        margin: 0 auto;
        .content {
          padding: 0 12px;
          line-height: 24px;
          font-size: 12px;
        }
      }
      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
      }
    }
  }
</style>
