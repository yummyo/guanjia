<template>
  <div class="feeSetting">
    <NavBar title="机构数据管理" left-arrow />
    <van-form input-align="right" class="formBox" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formData.xjpz"
          label="是否允许下级配置"
          placeholder="是否允许下级配置"
          is-link
          readonly
          :rules="[{ required: true, message: '请选择是否允许下级配置' }]"
          @click="xjpzShow = true"
        />
        <van-field
          v-if="formData.xjpz == '是'"
          v-model="formData.shwd"
          is-link
          readonly
          label="商户维度"
          placeholder="商户维度"
          :rules="[{ required: true, message: '请填写商户维度' }]"
          @click="shwdShow = true"
        />
        <van-field
          v-if="formData.xjpz == '是'"
          v-model="formData.tzsj"
          label="调整时间"
          placeholder="调整时间"
          :rules="[{ required: true, message: '请填写调整时间' }]"
        >
          <template #input>
            第
            <input v-model="formData.tzsj" class="dayInput" type="text">
            天后
          </template>
        </van-field>
        <van-field
          v-model="formData.tzfl"
          label="调整费率(%)"
          placeholder="调整费率(%)"
          :rules="[{ required: true, message: '请填写调整费率' }]"
        />
        <van-field
          v-model="formData.tjktf"
          label="调价快提费(元)"
          placeholder="调价快提费(元)"
          :rules="[{ required: true, message: '请填写调价快提费' }]"
        />
      </van-cell-group>
      <div class="submitBtn">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <!-- 是否允许下级配置 -->
    <van-action-sheet
      v-model:show="xjpzShow"
      :actions="xjpzActions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onXjpzCancel"
      @select="onXjpzSelect"
    />
    <!-- 商户维度 -->
    <van-action-sheet
      v-model:show="shwdShow"
      :actions="shwdActions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onShwdCancel"
      @select="onShwdSelect"
    />
  </div>
</template>

<script setup lang="ts">
const formData = reactive({
  xjpz: '是',
  shwd: '',
  tzsj: '',
  tzfl: '',
  tjktf: '',
})

/** *************** 是否允许下级配置 start *******************/
const xjpzShow = ref(false)
const xjpzActions = [
  { name: '是', value: 1 },
  { name: '否', value: 0 },
]
const onXjpzCancel = () => {
  console.log('onXjpzCancel')
}
const onXjpzSelect = (item) => {
  console.log('item', item)
  formData.xjpz = item.name
}

/** *************** 是否允许下级配置 end *******************/
/** *************** 商户维度 start *******************/
const shwdShow = ref(false)
const shwdActions = [
  { name: '入网时间', value: 1 },
  { name: '激活时间', value: 2 },
  { name: '最后交易时间', value: 3 },
]
const onShwdCancel = () => {
  console.log('onshwdCancel')
}
const onShwdSelect = (item) => {
  console.log('item', item)
  formData.shwd = item.name
}

/** *************** 商户维度 end *******************/
const onSubmit = () => {
  console.log('formData', formData)
}
</script>

<style lang="less" scoped>
.feeSetting{
  background: #F5F5F5;
  height: 100%;
  :deep(.van-field__label){
    width: 120px;
  }
  .formBox{
    margin-top: 15px;
    .dayInput{
      width: 65px;
      height: 25px;
      border-radius: 5px;
      border: 1px solid #CCCCCC;
    }
    .submitBtn{
      margin: 130px 16px 16px;
    }
  }
}
</style>
