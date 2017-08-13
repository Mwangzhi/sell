<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="[{'active':mySelectType===2}]">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="[{'active':mySelectType===0}]">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)"
            class="block negative"
            :class="[{'active':mySelectType===1}]">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent"
         class="switch"
         :class="[{'on':myOnlyContent}]">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default(){
          return []
        }
      },
      selectType: {
        type: Number,
        default(){
          return ALL
        }
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default(){
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data(){
      return {
        mySelectType: this.selectType,
        myOnlyContent: this.onlyContent
      }
    },
    computed: {
        positives(){
            return this.ratings.filter((rating)=>{
                return rating.rateType===POSITIVE;
            })
        },
      negatives(){
        return this.ratings.filter((rating)=>{
          return rating.rateType===NEGATIVE;
        })
      }
    },
    components: {},
    methods: {
      select(type, event){
        if (!event._constructed) {
          return;
        }
        this.mySelectType= type;
        this.$emit('selecttype', type)
      },
      toggleContent(){
        if (!event._constructed) {
          return;
        }
        this.myOnlyContent = !this.myOnlyContent;
        this.$emit('onlycontent', this.myOnlyContent)
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../common/less/mixin";

  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      .border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;
      .block {
        display: inline-block;
        padding: 8px 12px;
        border-radius: 2px;
        margin-right: 8px;
        line-height: 16px;
        color: rgb(77, 85, 93);
        font-size: 12px;
        &.active {
          color: #fff;
        }
        .count {
          font-size: 8px;
          margin-left: 2px;
        }
        &.positive {
          background: rgba(0, 160, 220, 0.2);
          &.active {
            background: rgb(0, 160, 220);
          }
        }
        &.negative {
          background: rgba(77, 85, 93, 0.2);
          &.active {
            background: rgb(77, 85, 93);
          }
        }
      }
    }
    .switch {
      padding: 12px 18px;
      line-height: 24px;
      color: rgb(147, 153, 159);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      font-size: 0;
      .icon-check_circle {
        font-size: 24px;
        margin-right: 4px;
        display: inline-block;
        vertical-align: top;
      }
      .text {
        font-size: 12px;
      }
      &.on {
        .icon-check_circle {
          color: green;
        }
      }
    }
  }
</style>
