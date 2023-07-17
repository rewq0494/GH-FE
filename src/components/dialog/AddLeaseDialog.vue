<template>
  <div class="overlay"></div>
  <div class="add-mb-dialog">
    <h2>新增租賃情況</h2>
    <div class="add-area">
      <label>
        <h3>統編</h3>
        <input class="add-box" type="text" v-model="companyTaxId">
      </label>
      
      <label>
        <h3>公司名稱</h3>
        <input class="add-box" type="tel" v-model="paymentStatus">
      </label>
      <label>
        <h3>起租日期</h3>
        <input class="add-box" type="text" v-model="startDate">
      </label>

      <label>
        <h3>結束日期</h3>
        <input class="add-box" type="text" v-model="endDate">
      </label>

      <!-- <label>
        <h3>繳納狀態</h3>
        <input class="add-box" type="tel" v-model="paymentStatus">
      </label> -->
    </div>
    <button class="btn-close" @click="closeDialog">取消</button>
    <button class="btn-confirm" @click="handleConfirm">確定</button>
  </div>
  <AddSuccessDialog v-if="showSuccessDialog" @close="closeSuccessDialog" />
</template>

<script>
import AddSuccessDialog from './AddSuccessDialog.vue';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';

export default {
  emits: ['close', 'confirm'],
  components: {
    AddSuccessDialog
  },
  props: {
    officeId: {
      type: String,
      required: true
    },
    contracts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showDialog: false,
      showSuccessDialog: false,
      startDate: null,
      endDate: null,
      companyTaxId: null,
      paymentStatus: null
    }
  },
  methods: {
    handleConfirm() {
      const requestData = {
        startDate: this.startDate,
        endDate: this.endDate,
        companyTaxId: this.companyTaxId,
        paymentStatus: this.paymentStatus
      };

      // 发送请求到后端API
      axios.put(`/contract/${this.officeId}`, requestData)
        .then(() => {
          console.log('更改成功');
          this.$emit('confirm');
        })
        .catch(error => {
          console.error('更改失败', error);
        });
    },
    closeDialog() {
      this.$emit('close');
    },
    closeSuccessDialog() {
      this.showSuccessDialog = false;
    }
  },
};
</script>



<style scoped>
*{
  font-family: '微軟正黑體';
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 设置半透明的黑色背景 */
  z-index: 9999; /* 确保遮罩层在其他内容之上 */
}
.add-mb-dialog{
  width: 580px;
  height: 400px;;
  background-color: #ffffff;
  position: fixed;
  z-index: 99999;
  top: 20%;
  left: 30%;
  border-radius: 20px;
}
.btn-close{
  position: absolute;
  left: 37%;
  bottom: 6%;
  width: 60px;
  height: 38px;
  color: #FFF;
  background-color: #F7AF44;
  border-radius: 40px;
  border: 0px;
  cursor: pointer;
}
.btn-close:hover{
  background-color: #ef9817;
  transition: background-color 0.8s;
}
.btn-confirm{
  position: absolute;
  left: 51%;
  bottom: 6%;
  width: 60px;
  height: 38px;
  color: #FFF;
  background-color: #F7AF44;
  border-radius: 40px;
  border: 0px;
  cursor: pointer;
}
.btn-confirm:hover{
  background-color: #ef9817;
  transition: background-color 0.8s;
}
.add-mb-dialog h2{
  font-size: 24px;
  position: relative;
  top: 20px;
  text-align: center;
  color: #5C5C5C;
  font-weight:500;
}
.add-area{
  position: relative;
  top: 40px;
}


.add-mb-dialog label {
  display: flex;
  /* align-items: center; */
  margin-bottom: 10px;
  height: 40px;
}

.add-mb-dialog h3{
  position: relative;
  top: -10px;
  left: 80px;
  text-align: center;
  color: #777777;
}
.add-box{
  position: absolute;
  background-color: #FFF7EA;
  width: 300px;
  height: 36px;
  left: 150px;
  border-radius: 10px;
  border: 0px;
  outline: none;
  color: #777777;
  font-size: 14px;
  padding-left: 10px;
}
</style>