<template>
  <div class="ratings" id="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="star"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select :ratings="ratings" v-on:onlycontent="changeOnlyContent" :only-content="onlyContent" :select-type="selectType" v-on:selecttype="selecttype"></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28px" height="28px">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.delivery">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="recommend in rating.recommend" class="item">{{recommend}}</span>
              </div>
            </div>
            <div class="time">
              <span>{{rating.rateTime | formatDate}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import Star from 'components/star/star'
  import Split from 'components/split/Split'
  import {getRatings} from 'api/ratings'
  import {formatDate} from 'common/js/date'
  import BScroll from 'better-scroll'
  import RatingSelect from 'components/ratingselect/RatingSelect'
  const ALL = 2;
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: false,
      }
    },
    created(){
      getRatings().then((res) => {
        res = res.data;
        if (res.errno === ERR_OK) {
          this.ratings = res.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(document.getElementById('ratings'), {
              click: true
            })
          })
        }
      })
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    computed: {},
    components: {Star, Split, RatingSelect},
    methods: {
      needShow(type,text){
        if(this.onlyContent && !text){
          return false
        }
        if(this.selectType===ALL){
          return true
        }else{
          return type===this.selectType;
        }
      },
      changeOnlyContent(arg){
        this.onlyContent=arg;
        this.$nextTick(()=>{
          this.scroll.refresh();
        })
      },
      selecttype(type){
        this.selectType=type;
        this.$nextTick(()=>{
          this.scroll.refresh();
        })
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../common/less/mixin";

  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    .overview {
      display: flex;
      padding: 18px 0;
      .overview-left {
        flex: 0 0 137px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        padding: 6px 0;
        @media only screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }
        .score {
          line-height: 28px;
          font-size: 24px;
          color: rgb(255, 153, 0);
          margin-bottom: 6px;
        }
        .title {
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        }
        .rank {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
        }
      }
      .overview-right {
        flex: 1;
        padding: 6px 0 6px 24px;
        @media only screen and (max-width: 320px) {
          padding-left: 6px;
        }
        .score-wrapper {
          margin-bottom: 8px;
          font-size: 0;
          .title {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 18px;
          }
          .star {
            display: inline-block;
            vertical-align: top;
            margin: 0 12px;
          }
          .score {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            color: rgb(255, 153, 0);
            line-height: 18px;
          }
        }
        .delivery-wrapper {
          font-size: 0;
          line-height: 16px;
          .title {
            vertical-align: top;
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 18px;
          }
          .delivery {
            font-size: 12px;
            color: rgb(147, 153, 159);
            margin-left: 12px;
          }
        }
      }
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        display: flex;
        padding: 18px 0;
        .border-1px(rgba(7, 17, 27, 0.1));
        .avatar {
          margin-right: 12px;
          width: 28px;
          img {
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            line-height: 12px;
            color: rgb(7, 17, 27);
            font-size: 10px;
            margin-bottom: 4px;
          }
          .star-wrapper {
            margin-bottom: 6px;
            font-size: 0;
            .star{
              display: inline-block;
              vertical-align: top;
              margin-right: 6px;
            }
            .delivery{
              display: inline-block;
              vertical-align: top;
              line-height: 12px;
              color: rgb(147,153,159);
              font-size: 10px;
            }
          }
          .text{
            line-height: 18px;
            color: rgb(7, 17, 27);
            margin-bottom: 8px;
            font-size: 12px;
          }
          .recommend{
            line-height: 16px;
            font-size: 0;
            .icon-thumb_up,.item{
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 12px;
            }
            .icon-thumb_up{
              color:rgb(0,160,220)
            }
            .item{
              padding: 0 6px;
              border: 1px solid rgb(7, 17, 27);
              border-radius: 1px;
              color:rgb(147,153,159);
              background: #fff;
            }
          }
        }
        .time{
          position: absolute;
          right: 18px;
          font-size: 10px;
          font-weight: 200;
          color:rgb(147,153,159);
          line-height: 12px;
        }
      }
    }
  }
</style>
