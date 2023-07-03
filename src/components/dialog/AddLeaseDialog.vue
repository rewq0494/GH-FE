<template>
  <div class="overlay"></div>
  <div class="add-mb-dialog">
    <h2>新增租賃情況</h2>
    <div class="add-area">
      <label>
        <h3>公司</h3>
        <input class="add-box" type="text">
      </label>

      <label>
        <h3>租期</h3>
        <input class="add-box" type="text">
      </label>

      <label>
        <h3>租金</h3>
        <input class="add-box" type="text">
      </label>

      <label>
        <h3>館別</h3>
        <input class="add-box" type="tel">
      </label>
    </div>
    <button class="btn-close" @click="closeDialog">取消</button>
    <button class="btn-confirm" @click="handleConfirm">確定</button>
  </div>
  <AddSuccessDialog v-if="showSuccessDialog" @close="closeSuccessDialog" />
</template>

<script>
import AddSuccessDialog from './AddSuccessDialog.vue';

export default {
  emits: ['close', 'confirm'],
  components: {
    AddSuccessDialog
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