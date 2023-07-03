<template>
  <div class="overlay"></div>
  <div class="meetint-info-dialog">
    <h2>訂單資訊1</h2>
    <div class="info-area">
      <h3 id="od-number">訂單編號：{{ orderId }}</h3>
      <label>
        <div class="h3-box"><h3>日期</h3></div>
        <div class="data-box">{{ date }}</div>
      </label>
      <label>
        <div class="h3-box"><h3>時間</h3></div>
        <div class="data-box">{{ time }}</div>
      </label>
      <label>
        <div class="h3-box"><h3>場地</h3></div>
        <div class="data-box">{{ space }}</div>
      </label>
      <label>
        <div class="h3-box"><h3>活動名稱</h3></div>
        <div class="data-box">{{ eventName }}</div>
      </label>
      <label>
        <div class="h3-box"><h3>公司名稱</h3></div>
        <div class="data-box">{{ company }}</div>
      </label>
      <label>
        <div class="h3-box"><h3>統編</h3></div>
        <div class="data-box">{{ companyId }}</div>
      </label>
      <label>
        <div class="h3-box"><h3>聯絡人</h3></div>
        <div class="data-box">{{ contentPerson }}</div>
      </label>
      <label>
        <div class="h3-box"><h3>電話</h3></div>
        <div class="data-box">{{ phone }}</div>
      </label>
      <label>
        <div class="h3-box"><h3>信箱</h3></div>
        <div class="data-box">{{ mail }}</div>
      </label>
      <label>
        <div class="note-box">
          <div class="note-h3-box">
            <h3>備註</h3>
          </div>
          <div class="note-text">{{ note }}</div>
        </div>
      </label>
      <div class="deposit"><h3>訂金：</h3><p>{{ deposit }}</p></div>
      <div class="total"><h3>總額：</h3><p>{{ total }}</p></div>
    </div>
    <button class="btn-edit" @click="handleConfirm">修改訂單</button>
    <button class="btn-cancle" @click="closeDialog">取消訂單</button>
  </div>
  <EditOrderDialog v-if="showEditOrderDialog" @close="closeEditOrderDialog" />
</template>

<script>
import EditOrderDialog from '../dialog/EditOrderDialog.vue';

export default {
  emits: ['close', 'confirm','edit'],
  components: {
    EditOrderDialog,
  },
  data() {
    return {
      orderId: '2064856',
      date: '2021/09/17',
      time: '09:00-12:00',
      eventName: '光明高中2022音樂會',
      space: 'A',
      contentPerson: '小飛象',
      company: '美商迪士尼科技股份有限公司',
      companyId: '24968746',
      phone: '04-7961-8956',
      mail: 'ajkldie@gmail.com',
      note: '這裡是備註內容',
      deposit: '$2100',
      total: '$4700',
      showDialog: false,
      // showOrderDialog: false, // 新增這行
      showEditOrderDialog: false,
      closeEditOrderDialog: false
    };
  },
  methods: {
    closeDialog() {
      this.$emit('cancle');
    },
    handleConfirm() {
      console.log('開啟修改窗');
      this.$emit('edit');
      // this.$emit('close'); 
      this.showEditOrderDialog = true;
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
.meetint-info-dialog{
  width: 1000px;
  height: 650px;;
  background-color: #ffffff;
  position: fixed;
  z-index: 99999;
  top: 5%;
  left: 10%;
  border-radius: 20px;
}
.btn-cancle{
  position: absolute;
  right: 15%;
  bottom: 10%;
  width: 90px;
  height: 36px;
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
.btn-edit{
  position: absolute;
  right: 15%;
  bottom: 17%;
  width: 90px;
  height: 36px;
  color: #FFF;
  background-color: #BCB0B0;
  border-radius: 15px;
  border: 0px;
  cursor: pointer;
}
.btn-edit:hover{
  background-color: #9c9191;
  transition: background-color 0.8s;
}
.meetint-info-dialog h2{
  font-size: 26px;
  position: relative;
  top: 20px;
  text-align: center;
  color: #7D5F4F;
  font-weight:500;
}
.info-area{
  position: relative;
  top: 40px;
}


.meetint-info-dialog label {
  display: flex;
  /* align-items: center; */
  margin-bottom: 8px;
  height: 40px;
}

.meetint-info-dialog h3{
  font-size: 16px;
  font-weight: 600;
  position: relative;
  top: -10px;
  /* left: 80px; */
  text-align: center;
  color: #7d5f4fbe;
}
.data-box{
  text-align: left;
  position: absolute;
  width: 300px;
  height: 36px;
  left: 210px;
  border-radius: 10px;
  border: 0px;
  outline: none;
  color: #777777;
  font-size: 14px;
  padding-left: 10px;
  margin-top: 8px;
}
.h3-box{
    background-color: #FFF7EA; 
    position: absolute;
    left: 110px;
    width: 100px;
    height: 35px;
    border-radius: 5px;
}

.note-h3-box{
    background-color: #FFF7EA; 
    position: absolute;
    top: 1px;
    width: 300px;
    height: 40px;
    border-radius: 5px;
}
.note-box{
    border: #7d5f4f59 solid 0.5px;
    position: absolute;
    left: 550px;
    top: 40px;
    width: 300px;
    height: 160px;
    border-radius: 5px;
}
.note-text{
    color: #FF6A3C;
    position: absolute;
    top: 50px;
    left: 5px;
}
.deposit {
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  text-align: left;
  font-size: 16px;
  position: absolute;
  top: 400px;
  right:350px;
}
.deposit p{
  color: #D65151;
  position: relative;
  top: -10px;
}
.total {
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  text-align: left;
  font-size: 16px;
  position: absolute;
  top: 430px;
  right:350px;
}
.total p{
  color: #D65151;
  position: relative;
  top: -10px;
}

#od-number{
    position: relative;
    left: -350px; 
}
</style>