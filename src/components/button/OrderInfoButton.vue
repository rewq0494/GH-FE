<template>
  <div>
    <button type="button" class="info-btn" @click="openDialog">詳細資訊</button>
    <div v-if="showDialog">
      <dialog-box @close="closeDialog" @confirm="openEditOrderDialog" />
    </div>
    <edit-order-dialog v-if="showEditOrderDialog" @close="closeDialog" @confirm="openSuccessDialog" />
    <edit-success-dialog v-if="showSuccessDialog" @close="closeSuccessDialog" />
  </div>
</template>

<script>
import OrderDialog from '../dialog/OrderDialog.vue';
import EditOrderDialog from '../dialog/EditOrderDialog.vue';
import EditSuccessDialog from '../dialog/EditSuccessDialog.vue';

export default {
  emits: ['edit','close'],
  components: {
    'dialog-box': OrderDialog,    
    'edit-order-dialog': EditOrderDialog,
    'edit-success-dialog': EditSuccessDialog,
  },
  data() {
    return {
      showDialog: false,
      showSuccessDialog: false,
      showEditOrderDialog: false,
      openEditOrderDialog: false,
   
    };
  },
  methods: {
    openDialog() {
      console.log('按鈕反應');
      this.showDialog = true; 
    },
    closeDialog() {
      this.showDialog = false;
    },
    openSuccessDialog() {
      this.showDialog = false;
      this.showEditOrderDialog = false; 
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