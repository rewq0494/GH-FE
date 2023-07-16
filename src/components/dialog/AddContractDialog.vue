<template>
  <div class="overlay"></div>
  <div class="add-contract-dialog">
    <h2>新增合約</h2>
    <div class="add-area">
      <label>
        <h3>公司</h3>
        <input v-model="companyName" class="add-box" type="text" />
      </label>

      <label>
        <h3>負責人</h3>
        <input v-model="inCharge" class="add-box" type="text" />
      </label>

      <label>
        <h3>會員電話</h3>
        <input v-model="memberPhone" class="add-box" type="text" />
      </label>

      <label>
        <h3>辦公室編號</h3>
        <input v-model="officeId" class="add-box" type="text" />
      </label>

      <label>
        <h3>公司統編</h3>
        <input v-model="companyTaxid" class="add-box" type="text" />
      </label>

      <label>
        <h3>付款方式</h3>
        <input v-model="paymentMethod" class="add-box" type="text" />
      </label>

      <label>
        <h3>起租日期</h3>
        <!-- <input class="add-box" type="date"> -->
        <vue-flatpickr v-model="startDate"></vue-flatpickr>
      </label>

      <label>
        <h3>結束日期</h3>
        <!-- <input class="add-box" type="date"> -->
        <vue-flatpickr v-model="endDate"></vue-flatpickr>
      </label>

      <label>
        <h3>備註</h3>
        <input v-model="remark" class="add-box" type="text" />
      </label>
    </div>
    <UploadBox ref="uploadBoxRef" />

    <button class="btn-close" @click="closeDialog">取消</button>
    <button class="btn-confirm" @click="handleConfirm">確定</button>
  </div>
  <AddSuccessDialog v-if="showSuccessDialog" @close="closeSuccessDialog" />
</template>

<script>
import axios from "axios";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { onMounted, toRaw } from "vue";
import VueFlatpickr from "vue-flatpickr-component";
import UploadBox from "../box/UploadBox.vue";
import AddSuccessDialog from "./AddSuccessDialog.vue";

export default {
  emits: ["close", "confirm"],
  components: {
    UploadBox,
    AddSuccessDialog,
    VueFlatpickr,
  },
  data() {
    return {
      showDialog: false,
      showSuccessDialog: false,
      flatpickrConfig: {
        inline: true,
      },
      companyName: "",
      inCharge: "",
      memberPhone: "",
      officeId: "",
      companyTaxid: "",
      paymentMethod: "",
      startDate: null,
      endDate: null,
      remark: "",
      uploadFile: null,
    };
  },
  methods: {
    setUploadFile() {
      console.log(this.$refs.uploadBoxRef.emitFiles());
    },

    async handleConfirm() {
      this.uploadFile = toRaw(this.$refs.uploadBoxRef.emitFiles()[0]);

      const blobfile = new Blob([this.uploadFile], {
        type: "application/pdf",
      });

      await axios({
        method: "post",
        url: "http://localhost:8081/contracts/backstage-add-new-contract",
        data: {
          companyName: this.companyName,
          inCharge: this.inCharge,
          memberPhone: this.memberPhone,
          officeId: this.officeId,
          companyTaxid: this.companyTaxid,
          paymentMethod: this.paymentMethod,
          startDate: this.startDate,
          endDate: this.endDate,
          remark: this.remark,
          uploadFile: blobfile,
        },
        headers: { "Content-Type": "multipart/form-data" },
      });

      this.$emit("confirm");
      this.showSuccessDialog = true;
    },
  },
  mounted() {
    onMounted(() => {
      flatpickr(this.$refs.datePickerInput, {
        monthSelectorType: "long",
        // 其他Flatpickr的配置選項
      });
    });
    // 在 mounted 鉤子函數中引入 dark.css 主題樣式表
    require("flatpickr/dist/themes/confetti.css");
  },
};
</script>

<style scoped>
* {
  font-family: "微軟正黑體";
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

.add-contract-dialog {
  width: 450px;
  height: 670px;
  background-color: #ffffff;
  position: relative;
  z-index: 99999;
  top: 25px;
  left: 35%;
  border-radius: 20px;
}

.btn-close {
  position: absolute;
  left: 37%;
  bottom: 2%;
  width: 60px;
  height: 38px;
  color: #fff;
  background-color: #f7af44;
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
  bottom: 2%;
  width: 60px;
  height: 38px;
  color: #fff;
  background-color: #f7af44;
  border-radius: 40px;
  border: 0px;
  cursor: pointer;
}

.btn-confirm:hover {
  background-color: #ef9817;
  transition: background-color 0.8s;
}

.add-contract-dialog h2 {
  position: relative;
  top: 30px;
  text-align: center;
  color: #5c5c5c;
  font-weight: 500;
}

.add-area {
  position: relative;
  top: 30px;
}

.add-contract-dialog label {
  display: flex;
  /* align-items: center; */
  margin-bottom: 12px;
  height: 40px;
}

.add-contract-dialog h3 {
  font-size: 16px;
  position: relative;
  top: -5px;
  left: 50px;
  text-align: center;
  color: #777777;
}

.add-box {
  position: absolute;
  background-color: #fff0de;
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
.flatpickr-input {
  position: absolute;
  background-color: #fff0de;
  width: 250px;
  height: 36px;
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
