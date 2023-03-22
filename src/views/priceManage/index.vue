<template>
  <div class="feeSetting">
    <NavBar title="调价管理" left-arrow />
    <van-form input-align="right" class="formBox" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formData.xjtj"
          label="下级调价分配(%)"
          placeholder="下级调价分配(%)"
          :rules="[{ required: true, message: '请填写下级调价分配' }]"
        />
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
          v-model="formData.shwd"
          is-link
          readonly
          label="商户维度"
          placeholder="商户维度"
          :rules="[{ required: true, message: '请填写商户维度' }]"
          @click="shwdShow = true"
        />
        <van-field
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
          v-model="formData.flwd"
          is-link
          readonly
          label="费率维度(%)"
          placeholder="费率维度(%)"
          :rules="[{ required: true, message: '请填写费率维度(%)' }]"
          @click="flwdShow = true"
        />
        <div v-if="formData.flwd == '统一费率'" class="flwdTip">
          <van-field
            v-model="formData.fl"
            label="费率调至"
            placeholder="请填写"
            :rules="[{ required: true, message: '请填写' }]"
          />
          <van-field
            v-model="formData.ktf"
            label="快提费调至"
            placeholder="请填写"
            :rules="[{ required: true, message: '请填写' }]"
          />
        </div>
        <div v-else-if="formData.flwd == '固定费率'" class="flwdTip">
          <div v-for="(item, index) in flArr" :key="`fee${index}`">
            <van-field
              v-model="item.jyl"
              label="交易量"
              placeholder="请填写"
              :rules="[{ required: true, message: '请填写' }]"
            />
            <van-field
              v-model="item.tjfl"
              label="调价费率"
              placeholder="请填写"
              :rules="[{ required: true, message: '请填写' }]"
            />
            <van-field
              v-model="item.tjktf"
              label="调价快提费"
              placeholder="请填写"
              :rules="[{ required: true, message: '请填写' }]"
            />
          </div>
          <div class="addLineBtn" @click="flArr.push({ jyl: '', tjfl: '', tjktf: '' })">
            <img src="@/assets/index/add.png" alt="">
            添加规则
          </div>
        </div>
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
    <!-- 费率维度 -->
    <van-action-sheet
      v-model:show="flwdShow"
      :actions="flwdActions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onFlwdCancel"
      @select="onFlwdSelect"
    />
  </div>
</template>

<script setup lang="ts">
const formData = reactive({
  fl: '',
  ktf: '',
  xjtj: '',
  xjpz: '是',
  shwd: '',
  tzsj: '',
  flwd: '',
})
const flArr = reactive([
  { jyl: '', tjfl: '', tjktf: '' },
])

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
/** *************** 商户维度 start *******************/
const flwdShow = ref(false)
const flwdActions = [
  { name: '统一费率', value: 1 },
  { name: '固定费率', value: 2 },
]
const onFlwdCancel = () => {
  console.log('onflwdCancel')
}
const onFlwdSelect = (item) => {
  console.log('item', item)
  formData.flwd = item.name
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
    .addLineBtn{
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #384B9E;
      padding: 5px 0;
      img{
        width: 16px;
        vertical-align: middle;
      }
    }
    :deep(.flwdTip){
      margin: 0 15px 15px;
      background: #F5F5F5;
      border-radius: 5px;
      .van-cell{
        background: #F5F5F5;
      }
    }
  }
}
</style>
