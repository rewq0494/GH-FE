<template>
    <div class="overlay"></div>
  <div class="edit-contract-dialog">
   <h2>修改合約資訊</h2>
<div class="edit-area">
   <label>
    <h3>公司</h3>
    <input class="edit-box" type="text">
  </label>


  <label>
    <h3>負責人</h3>
    <input class="edit-box" type="text">
  </label>

  <label>
  <h3>起租日期</h3>
    <input class="edit-box" type="date">
    </label>

  <label>
    <h3>結束日期</h3>
    <input class="edit-box" type="date">
  </label>
  <UploadBox/>
  
</div>
   <button class="btn-close" @click="closeDialog">取消</button>
   <button class="btn-confirm" @click="handleConfirm">確定</button>
  </div>
  <EditSuccessDialog v-if="showSuccessDialog" @close="closeSuccessDialog" />

</template>
<script>
  import EditSuccessDialog from './EditSuccessDialog.vue';
  import UploadBox from '../box/UploadBox.vue';
export default {
  components:{
    EditSuccessDialog,
    UploadBox,
  },
  data() {
  return {
    showDialog: false,
    showSuccessDialog: false
  }
},
  methods: {
    closeDialog() {
      this.$emit('close');
    },
    handleConfirm() {
      console.log('新增成功');
      this.$emit('confirm');
      this.showSuccessDialog = true;
},
      // 处理确定按钮的逻辑
      // 在这里可以进行一些处理操作
      // 如果需要将处理结果传递给父组件或其他地方，可以使用$emit来触发事件
    }
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
.edit-contract-dialog{
  width: 450px;
  height: 480px;;
  background-color: #ffffff;
  position: fixed;
  z-index: 99999;
  top: 90px;
  left: 35%;
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
.btn-confirm:hover{
  background-color: #ef9817;
  transition: background-color 0.8s;
}
.edit-contract-dialog h2{
  font-size: 24px;
  position: relative;
  top: 20px;
  text-align: center;
  color: #5C5C5C;
  font-weight:500;
  margin-bottom: 20px;
}
.edit-area{
  position: relative;
  top: 30px;
}


.edit-contract-dialog label {
  display: flex;
  margin-bottom: 10px;
  height: 40px;
}

.edit-contract-dialog h3{
  font-size: 16px;
  position: relative;
  top: -5px;
  left: 50px;
  text-align: center;
  color: #777777;
}
.edit-box{
  position: absolute;
  background-color: #FFF7EA;
  width: 250px;
  height: 36px;
  left: 130px;
  border-radius: 10px;
  border: 0px;
  outline: none;
  color: #777777;
  font-size: 14px;
  padding-left: 10px;
}

  /* 日期選擇器 */
  input[type="date"]::-webkit-calendar-picker-indicator {
  background-image: url(../../assets/dialog-icon/calendar.png);
  width: 20px;
  height: 20px;
  margin-right: 8px;
  cursor: pointer;
}

input[type="date"]::before{
  content: attr(placeholder);
}
</style>