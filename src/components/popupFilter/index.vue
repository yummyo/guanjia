<template>
  <!-- 条件筛选弹框 -->
  <van-popup
    v-model:show="popupVis"
    position="top"
    class="popupFilter"
  >
    <!-- 标题 -->
    <div class="title">
      {{ title }}
    </div>
    <!-- 选项内容 -->
    <div class="filterList">
      <div
        v-for="column of columnData"
        :key="column.value"
        class="filterItem"
        :class="{ active: activeItem.value == column.value }"
        @click="activeItem = column"
      >
        {{ column.label }}
      </div>
    </div>
    <!-- 按钮组 -->
    <div class="btnList">
      <div class="resetBtn" @click="onClickLeft">
        重置
      </div>
      <div class="confirmBtn" @click="onClickRight">
        确定
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: ['title', 'columnData'],
  emits: ['confirm', 'popupVisToggle'],
  data() {
    return {
      popupVis: false,
      activeItem: {},
    }
  },
  watch: {
    popupVis(val) {
      this.$emit('popupVisToggle', val)
    },
  },
  mounted() {
    this.resetFilter()
  },
  methods: {
    resetFilter() {
      // 取columnData 第一个为默认值
      if (this.columnData && this.columnData.length)
        this.activeItem = this.columnData[0]
    },
    onClickLeft() {
      // 取消事件
      this.popupVis = false
    },
    onClickRight() {
      // 确定事件
      this.$emit('confirm', this.activeItem)
      this.popupVis = false
    },
    open(pickerDate) {
      // 外界通过 ref.open打开组件
      this.popupVis = true
    },
  },
}
</script>

<style lang="less">
.popupFilter{
  padding-top: var(--van-nav-bar-height);
  .title{
    padding: 15px 20px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333333;
  }
  .filterList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20px 48px;
    .filterItem{
      width: 88px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: #F5F5F5;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 600;
      color: #666666;
      &.active{
        background: #FFE7E1;
        color: var(--van-primary-color);
      }
    }
  }
  .btnList{
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    text-align: center;
    line-height: 48px;
    display: flex;
    .resetBtn{
      flex: 1;
      background: #F5F5F5;
    }
    .confirmBtn{
      flex: 1;
      color: #fff;
      background: linear-gradient(180deg, #FF6500 0%, #FF1700 100%);
    }
  }
}
</style>
