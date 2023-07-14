<template>
  <div class="overlay"></div>
  <div class="edit-mb-dialog">
    <h2>修改會員資訊</h2>
    <div class="edit-area">
      <label>
        <h3>公司</h3>
        <input class="edit-box" type="text" v-model="company">
      </label>

      <label>
        <h3>統編</h3>
        <input class="edit-box" type="text" v-model="companyTaxId">
      </label>

      <label>
        <h3>聯絡人</h3>
        <input class="edit-box" type="text" v-model="contact">
      </label>

      <label>
        <h3>電話</h3>
        <input class="edit-box" type="tel" v-model="phone">
      </label>

      <label>
        <h3>地址</h3>
        <input class="edit-box" type="text" v-model="address">
      </label>
    </div>
    <button class="btn-close" @click="closeDialog">取消</button>
    <button class="btn-confirm" @click="handleConfirm">確定</button>
  </div>
  <EditSuccessDialog v-if="showSuccessDialog" @close="closeSuccessDialog" />
</template>

<script>
import EditSuccessDialog from '../dialog/EditSuccessDialog.vue';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';

export default {
  components: {
    EditSuccessDialog,
  },
  props: {
    member: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDialog: false,
      showSuccessDialog: false,
      company: '',
      companyTaxId: '',
      contact: '',
      phone: '',
      address: '',
    };
  },
  computed: {
    initialCompany() {
      return this.member ? this.member.companyName : '';
    },
    initialCompanyTaxId() {
      return this.member ? this.member.companyTaxId : '';
    },
    initialContact() {
      return this.member ? this.member.companymemberName : '';
    },
    initialPhone() {
      return this.member ? this.member.companyPhone : '';
    },
    initialAddress() {
      return this.member ? this.member.address : '';
    },
  },
  mounted() {
    this.company = this.initialCompany;
    this.companyTaxId = this.initialCompanyTaxId;
    this.contact = this.initialContact;
    this.phone = this.initialPhone;
    this.address = this.initialAddress;
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
    handleConfirm() {
      // 构造要发送的数据
      const updatedData = {
        companyTaxId: this.member.companyTaxId,
        companyName: this.company,
        companymemberName: this.contact,
        companyPhone: this.phone,
        address: this.address,
      };

      // 发送PUT请求
      axios.put(`/company/${this.member.companyTaxId}`, updatedData)
        .then(response => {
          console.log('更新成功', response.data);
          this.$emit('confirm');
          this.showDialog = false;
          // 可以在这里执行其他操作或刷新数据
          
        })
        .catch(error => {
          console.error('更新失败', error);
          // 处理错误情况
        });
    },
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
.edit-mb-dialog{
  width: 580px;
  height: 440px;;
  background-color: #ffffff;
  position: fixed;
  z-index: 99999;
  top: 20%;
  left: 30%;
  border-radius: 20px;
}
.btn-close{
  position: absolute;
  left: 38%;
  bottom: 10%;
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
  left: 50%;
  bottom: 10%;
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
.edit-mb-dialog h2{
  font-size: 24px;
  position: relative;
  top: 20px;
  text-align: center;
  color: #5C5C5C;
  font-weight:500;
}
.edit-area{
  position: relative;
  top: 40px;
}


.edit-mb-dialog label {
  display: flex;
  /* align-items: center; */
  margin-bottom: 10px;
  height: 40px;
}

.edit-mb-dialog h3{
  position: relative;
  top: -10px;
  left: 80px;
  text-align: center;
  color: #777777;
}
.edit-box{
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