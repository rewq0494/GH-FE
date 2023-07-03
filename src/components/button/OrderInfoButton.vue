<!-- 10:30TEST -->
<template>
    <div>
      <button type="button" class="info-btn" @click="openDialog">詳細資訊
      </button>
      <div v-if="showOrderDialog">
        <dialog-box @close="closeDialog" @confirm="openEditOrderDialog"  />
      </div>
      <edit-order-dialog v-if="showEditOrderDialog" @close="closeDialog" @confirm="openSuccessDialog"  />
      <edit-success-dialog v-if="showSuccessDialog" @close="closeSuccessDialog" />
    </div>
  </template>
  
  <script>
  import OrderDialog from '../dialog/OrderDialog.vue';
  import EditOrderDialog from '../dialog/EditOrderDialog.vue';
  import EditSuccessDialog from '../dialog/EditSuccessDialog.vue';
  
  export default {
    components: {
      'dialog-box': OrderDialog,    
      'edit-order-dialog': EditOrderDialog,
      'edit-success-dialog': EditSuccessDialog,
    },
    data() {
      return {
        showDialog: false,
        showSuccessDialog: false,
        showOrderDialog: false,
        showEditOrderDialog: false,
        
      };
    },
    methods: {
      openDialog() {
        console.log('按鈕反應');
        this.showOrderDialog = true; 
      },
      closeDialog() {
        this.showOrderDialog = false;
      },
      openSuccessDialog() {
        this.showOrderDialog = false;
        this.showEditOrderDialog = false; 
        this.showSuccessDialog = true;
        setTimeout(() => {
          this.closeSuccessDialog();
        }, 1200);
      },
      closeSuccessDialog() {
        this.showSuccessDialog = false;
      },
      EditOrderDialog(){
        this.showOrderDialog = false;
        this.showEditOrderDialog = true;
        console.log('開啟修改窗')
      },
      openEditOrderDialog(){
        this.showOrderDialog = false; // 关闭 dialog-box
          this.showEditOrderDialog = true; // 打开 EditOrderDialog
      }

      
    },
  };
  </script>
  
    <style  scoped>
   
     button{
        color: #fff;
        width: 90px;
        height: 25px;
        border: 0px;
        border-radius: 20px;
        background-color:#F8B470 ;
        cursor: pointer;
     }
    </style>