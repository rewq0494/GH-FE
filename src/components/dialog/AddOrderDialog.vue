<template>
  <div class="overlay"></div>
  <div class="add-order-dialog">
    <h2>新增訂單</h2>
    <div class="add-area">
      <label>
        <h3>訂單編號</h3>
        <input class="add-box" type="text" v-model="tradeNo" ref="tradeNoInput">
      </label>
      <label>
        <h3>教室</h3>
        <select class="add-box" v-model="meetingroomId" ref="meetingroomIdInput">
          <option value="MR001">A</option>
          <option value="MR002">B</option>
          <option value="MR003">C</option>
        </select>
      </label>
      <label>
        <h3>日期</h3>
        <vue-flatpickr v-model="rentalDate" ref="rentalDateInput"></vue-flatpickr>
      </label>
      <label>
        <h3>時段</h3>
        <select class="add-box" v-model="rentalTime" ref="rentalTimeInput">
          <option value="1">09:00-12:00</option>
          <option value="2">12:00-15:00</option>
          <option value="3">15:00-18:00</option>
        </select>
      </label>
      <label>
        <h3>活動名稱</h3>
        <input class="add-box" type="text" v-model="activityName" ref="activityNameInput">
      </label>
      <label>
        <h3>聯絡人</h3>
        <input class="add-box" type="text" v-model="memberName" ref="memberNameInput">
      </label>
      <label>
        <h3>手機</h3>
        <input class="add-box" type="text" v-model="memberPhone" @blur="fetchContactInfo" ref="memberPhoneInput">
      </label>
      <label>
        <h3>信箱</h3>
        <input class="add-box" type="text" v-model="memberEmail" ref="memberEmailInput">
      </label>
      <label>
        <h3>公司</h3>
        <input class="add-box" type="text" v-model="companyName" ref="companyNameInput">
      </label>
      <label>
        <h3>統編</h3>
        <input class="add-box" type="text" v-model="companyTaxid" ref="companyTaxidInput">
      </label>
      <label>
        <h3>備註</h3>
        <input class="add-box" type="text" v-model="remark" ref="remarkInput">
      </label>
    </div>

    <button class="btn-close" @click="closeDialog">取消</button>
    <button class="btn-confirm" @click="handleConfirm">確定</button>
  </div>
  <AddSuccessDialog v-if="showSuccessDialog" @close="closeSuccessDialog" />
</template>

<script>
import AddSuccessDialog from './AddSuccessDialog.vue';
import VueFlatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import flatpickr from 'flatpickr';
import { onMounted } from 'vue';
import axios from 'axios';

export default {
  emits: ['close', 'confirm'],
  components: {
    AddSuccessDialog,
    VueFlatpickr
  },
  data() {
    return {
      showDialog: false,
      showSuccessDialog: false,
      tradeNo: '', // 新增的訂單編號屬性
      meetingroomId: '',
      rentalDate: null,
      rentalTime: '',
      activityName: '',
      memberName: '',
      memberPhone: '',
      memberEmail: '',
      companyName: '',
      companyTaxid: '',
      remark: ''
    };
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
    handleConfirm() {
      const data = {
        tradeNo: this.tradeNo,
        meetingroomId: this.meetingroomId,
        rentalDate: this.rentalDate,
        rentalTime: this.rentalTime,
        activityName: this.activityName,
        memberName: this.memberName,
        memberPhone: this.memberPhone,
        memberEmail: this.memberEmail,
        companyName: this.companyName,
        companyTaxid: this.companyTaxid,
        remark: this.remark
      };

      axios
        .post('http://localhost:8080/meetings/insert', data)
        .then(response => {
          console.log('新增成功', response.data);
          this.$emit('confirm');
          this.showSuccessDialog = true;
        })
        .catch(error => {
          console.error('新增失敗', error);
        });
    },
    fetchContactInfo() {
      const phoneNumber = this.memberPhone;

      // 使用適當的 API 端點和參數來查詢聯絡人資訊
      axios
        .get(`http://localhost:8080/booking/profile/${phoneNumber}`)
        .then(response => {
          const contactInfo = response.data;
          this.memberName = contactInfo.memberName;
          this.memberEmail = contactInfo.memberEmail;
          this.companyName = contactInfo.company.companyName;
          this.companyTaxid = contactInfo.company.companyTaxId;
        })
        .catch(error => {
          console.error('查詢聯絡人資訊失敗', error);
        });
    }
  },
  mounted() {
    onMounted(() => {
      flatpickr(this.$refs.rentalDateInput, {
        monthSelectorType: 'long'
        // 其他Flatpickr的配置選項
      });
    });
    // 在 mounted 鉤子函數中引入 confetti.css 主題樣式表
    require('flatpickr/dist/themes/confetti.css');
  }
};
</script>




<style scoped>
* {
  font-family: '微軟正黑體';
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 设置半透明的黑色背景 */
  z-index: 9999;
  /* 确保遮罩层在其他内容之上 */
}

.add-order-dialog {
  width: 920px;
  height: 600px;
  ;
  background-color: #ffffff;
  position: fixed;
  z-index: 99999;
  top: 9%;
  left: 20%;
  border-radius: 20px;
}

.btn-close {
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

.btn-close:hover {
  background-color: #ef9817;
  transition: background-color 0.8s;
}

.btn-confirm {
  position: absolute;
  left: 53%;
  bottom: 6%;
  width: 60px;
  height: 38px;
  color: #FFF;
  background-color: #F7AF44;
  border-radius: 40px;
  border: 0px;
  cursor: pointer;
}

.btn-confirm:hover {
  background-color: #ef9817;
  transition: background-color 0.8s;
}

.add-order-dialog h2 {
  position: relative;
  top: 30px;
  text-align: center;
  color: #5C5C5C;
  font-weight: 500;
}

.add-area {
  position: relative;
  top: 30px;
}


.add-order-dialog label {
  display: flex;
  /* align-items: center; */
  margin-bottom: 2px;
  height: 40px;
}

.add-order-dialog h3 {
  font-size: 16px;
  position: relative;
  top: -5px;
  left: 50px;
  text-align: center;
  color: #777777;
}

.add-box {
  position: absolute;
  background-color: #FFF0DE;
  width: 250px;
  height: 30px;
  left: 130px;
  border-radius: 10px;
  border: 0px;
  outline: none;
  color: #777777;
  font-size: 14px;
  padding-left: 10px;
}

#note-h3 {
  color: #777777;
  position: absolute;
  left: 500px;
  top: 10px;
}

#note-box {
  background-color: #FFF0DE;
  position: absolute;
  left: 500px;
  top: 50px;
  width: 300px;
  height: 150px;
  border-radius: 5px;
}

/* 日期選擇器 */
.flatpickr-input {
  position: absolute;
  background-color: #FFF0DE;
  width: 250px;
  height: 30px;
  left: 130px;
  border-radius: 10px;
  border: 0px;
  outline: none;
  padding-left: 10px;
}


.dayContainer {
  background-color: #f2eee9;
}

.flatpickr-input {
  border-radius: 10px;
}

.flatpickr-calendar.open {
  background-color: #d8d0c7;
  width: 100px;
}
</style>

