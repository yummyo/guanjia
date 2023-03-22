<!--
 * @Author: wangshuguang
 * @Date: 2023-03-15 13:47:17
 * @LastEditTime: 2023-03-21 15:44:43
 * @LastEditors: wangshuguang
 * @Description: 顶部导航条，透传属性进来
-->
<template>
  <van-nav-bar
    v-bind="$attrs"
    :class="`${isTrue(transparentBg) ? 'transparentBg' : ''} ${themeType}`"
    @click-left="handleLeftClick"
  >
    <!-- 透传slot -->
    <template v-if="isTrue(leftArrow)" #left>
      <slot name="right" :theme-config="themeConfig">
        <van-icon name="arrow-left" :color="themeConfig.iconColor" size="25" />
      </slot>
    </template>
    <template #right>
      <slot name="right" :theme-config="themeConfig" />
    </template>
    <template #title>
      <span :style="{ color: themeConfig.textColor }">{{ title }}</span>
    </template>
  </van-nav-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getThemeConfig } from './themeConfig'
import { isTrue } from '@/utils/utils'

interface Props {
  onClickLeft?: Function
  // 透明背景
  transparentBg?: Boolean
  // 主题
  themeType?: String
  title?: String
  leftArrow?: Boolean
}

const props = withDefaults(defineProps<Props>(), {
  transparentBg: () => false,
  leftArrow: () => false,
  themeType: () => 'default',
  title: () => '',
})
const router = useRouter()

// 获取主题配置
const themeConfig = computed(() => {
  const config = getThemeConfig(props.themeType)
  return config
})
// 重写handleLeftClick   没有传入点击方法就默认回退一页
const handleLeftClick = () => {
  if (props.onClickLeft)
    props.onClickLeft()
  else
    router.go(-1)
}
</script>

<style lang="less" scoped>
.transparentBg{
  background: transparent;
  &::after{
    display: none;
  }

  :deep(.van-nav-bar){
    // 有placeholder占位情况下，会额外生成dom 所以加一层css用于覆盖
    background: transparent;
    &::after{
      display: none;
    }
  }
}
</style>
