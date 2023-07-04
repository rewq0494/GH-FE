<template>
  <div>
    <button class="btn-cancle" @click="cancleOrder">取消訂單</button>
    <div v-if="showDialog">
      <dialog-box @close="closeDialog" @confirm="openSuccessDialog" />
    </div>
    <delete-success-dialog v-if="showSuccessDialog" @close="closeSuccessDialog" />
  </div>
</template>

<script>
import DeleteMemberDialog from '../dialog/DeleteMemberDialog.vue';
import DeleteSuccessDialog from '../dialog/DeleteSuccessDialog.vue';

export default {
  components: {
    'dialog-box': DeleteMemberDialog,
    'delete-success-dialog': DeleteSuccessDialog,
  },
  data() {
    return {
      showDialog: false,
      showSuccessDialog: false,
    };
  },
  methods: {
    cancleOrder() {
      console.log('按鈕反應');
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    openSuccessDialog() {
      this.showDialog = false;
      this.showSuccessDialog = true;
      setTimeout(() => {
        this.closeSuccessDialog();
      }, 1200);
    },
    closeSuccessDialog() {
      this.showSuccessDialog = false;
    },
  },
};
</script>

  <style  scoped>
  *{
  font-family: '微軟正黑體';
}
  .btn-cancle{
  position: absolute;
  right: 15%;
  bottom: 13%;
  width: 88px;
  height: 34px;
  color: #FFF;
  background-color: #D65151;
  border-radius: 15px;
  border: 0px;
  cursor: pointer;
}
.btn-cancle:hover{
  background-color: #ce6d6d;
  transition: background-color 0.8s;
}
  </style>