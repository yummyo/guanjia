<template>
  <!--    时间弹框 -->
  <van-popup v-model:show="popupVis" position="top" class="popupDate">
    <van-nav-bar
      title="选择时间"
      left-text="取消"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <span style="color:#FF5100">确认</span>
      </template>
      <template #left>
        <span style="color: #999999">取消</span>
      </template>
    </van-nav-bar>
    <!-- 时间展示 -->
    <div class="dateBox">
      <div class="date">
        {{ formatDate(pickerDate) }}
      </div>
    </div>
    <van-date-picker
      v-model="pickerDate"
      :columns-type="columnsType"
      :formatter="formatter"
      :show-toolbar="false"
    />
  </van-popup>
</template>

<script>
export default {
  emits: ['confirm'],
  data() {
    return {
      popupVis: false,
      columnsType: ['year', 'month'],
      pickerDate: [],
      // 记录上级打开时的日期
      parentDate: [],
    }
  },
  methods: {
    onClickLeft() {
      // 取消事件
      this.popupVis = false
    },
    onClickRight() {
      // 确定事件
      this.$emit('confirm', this.pickerDate.join('-'))
      this.popupVis = false
    },
    open(pickerDate) {
      // 外界通过 ref.open打开组件
      const date = pickerDate ? pickerDate.split('-') : ''
      this.parentDate = date
      this.pickerDate = date || ['2023', '01']
      this.popupVis = true
    },
    formatter(type, option) {
      if (type === 'year')
        option.text += '年'

      if (type === 'month')
        option.text += '月'

      return option
    },
    formatDate(date) {
      if (date && date.length)
        return date.join('-')
      else
        return '全部时间'
    },
  },
}
</script>

<style lang="less">
.popupDate{
  height: 100%;
  .dateBox{
    text-align: center;
    margin: 22px 0 38px;
    .date{
      width: 140px;
      display: inline-block;
      color: var(--van-primary-color);
      border-bottom: 2px solid var(--van-primary-color);
      padding-bottom: 8px;
    }
  }
}
</style>
