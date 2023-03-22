<template>
  <div class="dataManage">
    <NavBar title="机构数据管理" transparent-bg />
    <!-- 顶部广告栏 -->
    <div class="topBanner">
      <img src="@/assets/index/banner.png" alt="">
    </div>
    <!-- 数据展示 -->
    <div class="dataShow">
      <div class="title">
        数据展示
      </div>
      <div class="dataCard">
        <div class="dataCard-div_leftInfo">
          <div class="dataCard-div_info1">
            今日数据管理交易
          </div>
          <div class="dataCard-div_info2">
            899,211.08
          </div>
          <div class="dataCard-div_info3">
            共计5笔
          </div>
        </div>
        <div class="dataCard-div_rightBox">
          <div class="dataCard-div_today">
            <span class="number">
              769.13
            </span>
            <span>今日数据管理收益</span>
          </div>
          <div class="dataCard-div_total">
            <span class="number">
              769.13
            </span>
            <span>累计数据管理收益</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 操作栏 -->
    <div class="menuBox">
      <div class="title">
        操作办理
      </div>
      <div class="menuBox-div_card">
        <div class="menuBox-div_label">
          数据管理开关
          <van-switch
            :model-value="checkForm.dataChecked"
            active-color="#384b9e"
            inactive-color="#d0d0d0"
            size="18px"
            class="switchBox"
            @change="dataCheckedChange"
          />
        </div>
        <div class="menuBox-div_tips">
          今日剩余次数：<span class="redNum">5</span>次
        </div>
      </div>
      <div class="menuBox-div_card">
        <div class="menuBox-div_label">
          批量费率变更
          <van-switch
            :model-value="checkForm.feeChecked"
            active-color="#384b9e"
            inactive-color="#d0d0d0"
            size="18px"
            class="switchBox"
            @change="feeCheckedChange"
          />
        </div>
        <div class="menuBox-div_tips">
          未开通
        </div>
      </div>
      <div class="menuBox-div_card">
        <div class="menuBox-div_label">
          商户调价
          <van-switch
            :model-value="checkForm.mercChecked"
            active-color="#384b9e"
            inactive-color="#d0d0d0"
            size="18px"
            class="switchBox"
            @change="mercCheckedChange"
          />
        </div>
        <div class="menuBox-div_tips">
          已开通
        </div>
      </div>
    </div>

    <van-dialog
      v-model:show="dataChkVis"
      title="标题"
      show-cancel-button
      :before-close="datachkClose"
    >
      <van-field
        v-model="dataOpenTime"
        class="timeInput"
        label="开始时长(分钟)"
        placeholder="请输入0-25间5的倍数"
      />
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'

const router = useRouter()
const checkForm = reactive({
  dataChecked: false,
  feeChecked: false,
  mercChecked: true,
})
const dataChkVis = ref(false)
const dataOpenTime = ref('')

const dataCheckedChange = (checked) => {
  console.log('checked', checked)
  if (checked) {
    dataChkVis.value = true
  } else {
    showConfirmDialog({
      title: '温馨提示',
      message: '关闭后，即会停止本次数据管理',
    })
      .then(() => {
        checkForm.dataChecked = false
      })
  }
}
const feeCheckedChange = () => {
  router.push('/feeSetting')
}
const mercCheckedChange = () => {
  router.push('/priceManage')
}
const datachkClose = (action) => {
  console.log('val', action)
  if (action == 'confirm') {
    checkForm.dataChecked = true
    return true
  } else {
    return true
  }
}
</script>

<style lang="less" scoped>
.dataManage{
  background: #F5F5F5 url('@/assets/index/dataManage_bg.png') no-repeat;
  background-size: 100% 100%;
  height: 100%;
  overflow: auto;
  .timeInput{
    :deep(.van-field__label){
      width: 100px;
    }
  }
  .topBanner{
    padding: 12px 15px 0;
    img{
      width: 100%;
    }
  }
  .title{
    padding: 15px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
  }
  .dataShow{
    .dataCard{
      display: flex;
      padding: 0 15px;
      .dataCard-div_leftInfo{
        flex: 1;
        background: #FFFFFF;
        border-radius: 10px 0px 0px 10px;
        padding: 10px ;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: #ffffff url('@/assets/index/money.png') no-repeat;
        background-size: 57px 50px;
        background-position: 106px 90px;
        .dataCard-div_info1{
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
        .dataCard-div_info2{
          font-size: 24px;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #333333;
          margin: 18px 0 10px;
        }
        .dataCard-div_info3{
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
      }
      .dataCard-div_rightBox{
        margin-left: 4px;
        flex: 1;
        display: flex;
        flex-direction: column;
        div{
          flex: 1;
          padding: 15px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          display: flex;
          flex-direction: column;
          text-align: center;
          background: #fff;
          border-radius: 0px 10px 0px 0px;
          &+div{
            border-radius: 0px 0px 10px 0px;
            margin-top: 4px;
          }
          .number{
            font-size: 18px;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: #333333;
          }
        }
        .dataCard-div_today{
        }
      }
    }
  }
  .menuBox{
    .menuBox-div_card{
      background: #FFFFFF;
      border-radius: 5px;
      padding: 18px 20px;
      margin: 0 15px 15px;
      .menuBox-div_label{
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #333333;
        display: flex;
        align-items: center;
        .switchBox{
          margin-left: 15px;
        }
      }
      .menuBox-div_tips{
        margin-top: 15px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        .redNum{
          color: #E6242C;
        }
      }
    }
  }
}
</style>
