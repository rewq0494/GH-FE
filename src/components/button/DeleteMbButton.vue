<template>
  <div>
    <button type="button" class="delete-btn" @click="openDialog">
      <img class="icon-delete" src="../../assets/list-icon/delete.png">
    </button>
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


    
  },props:
    ['contractId']
  ,

  methods: {
    openDialog() {
      console.log(this.contractId);
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    openSuccessDialog() {

      // axios
      // .delete("http://localhost:8080/contracts/contract")
      // .then((response) => {
      //   this.members =response.data;
      // });


      this.showDialog = false;
      this.showSuccessDialog = true;
    
      this.closeSuccessDialog();
   
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
      button{
        border: 0px;
        background-color:#FDF4E6 ;
        cursor: pointer;
 }
  
  .icon-delete{
      width: 20px;
      height: 20px;
      margin-top: 1px;
      margin-left: -2px;
  }
  </style>