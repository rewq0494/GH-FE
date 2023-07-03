<!-- <template>
  <div class="box">
    <span v-for="(item, index) in timeList" :key="index">
      <span style="padding-left: 5px">
        <button size="medium" style="width: 80px" :class="{ 'primary': item.type === 'primary' }"
          :disabled="item.flag" @click="selectTime(index)">{{ item.time }}</button>
      </span>
      <span v-if="(index + 1) % 5 === 0">
        <br>
      </span>
    </span>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const timeList = ref([
      { type: '', time: '9:00', flag: false },
      { type: '', time: '8:30', flag: false },
      { type: '', time: '12:00', flag: false },
      { type: 'primary', time: '9:30', flag: false },
      { type: 'info', time: '10:00', flag: true },
    ]);

    function selectTime(index) {
      // 先查詢是否有已選擇的時間，有的話先取消原來的，再賦值新選中的
      const oldIndex = timeList.value.findIndex((item) => item.type === 'primary');
      // 有已選中的值，取消
      if (oldIndex > -1) {
        timeList.value[oldIndex].type = '';
      }
      // 根據索引對選擇的時間修改樣式
      timeList.value[index].type = 'primary';
    }

    return {
      timeList,
      selectTime,
    };
  },
};
</script> -->
<!-- <template>
  <div class="box">
    <label for="date">選擇日期：</label>
    <input type="date" id="date" v-model="selectedDate" @change="updateTimeSlots" />

    <label for="timeslot">選擇時段：</label>
    <select id="timeslot" v-model="selectedTimeSlot" :disabled="!selectedDate">
      <option value="">請選擇時段</option>
      <option v-for="slot in availableTimeSlots" :value="slot" :key="slot">{{ slot }}</option>
    </select>

    <button @click="reserve" :disabled="!selectedDate || !selectedTimeSlot">預約</button>

    <p v-if="reservationSuccess">預約成功！</p>
    <p v-if="reservationError">預約失敗，請重試。</p>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // 假設會議室可預約的時間段
    const availableTimeSlots = ref(['上午', '下午', '晚上']);

    // 儲存使用者選擇的日期和時段
    const selectedDate = ref('');
    const selectedTimeSlot = ref('');

    // 儲存預約結果的狀態
    const reservationSuccess = ref(false);
    const reservationError = ref(false);

    // 更新可用的時段選項
    function updateTimeSlots() {
      // 這裡可以根據庫存等邏輯來計算可用的時段選項
      // 這裡只是示範，假設當天所有時段都可預約
      availableTimeSlots.value = ['上午', '下午', '晚上'];
      selectedTimeSlot.value = '';
    }

    // 執行預約動作
    function reserve() {
      // 在這裡執行預約的邏輯
      // 可以發送 API 請求等
      // 這裡只是示範預約成功的情況
      reservationSuccess.value = true;
      reservationError.value = false;
    }

    return {
      selectedDate,
      selectedTimeSlot,
      availableTimeSlots,
      reservationSuccess,
      reservationError,
      updateTimeSlots,
      reserve,
    };
  },
};
</script> -->

<template>
  <div class="box">
    <vue-flatpickr v-model="selectedDate"></vue-flatpickr>
  </div>

</template>
<script>
import VueFlatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  data() {
    return {
      selectedDate: null
    };
  },
  components: {
    VueFlatpickr
  },
  mounted() {
    // 在 mounted 鉤子函數中引入 dark.css 主題樣式表
    require("flatpickr/dist/themes/confetti.css");
  }
  }
</script>

<!-- ----------------------------------- -->
<style scoped>
.box{
  z-index: 99999;
  position: fixed;
  top: 10%;
  left: 20%;
}

.dayContainer{
  background-color: wheat;
}
.flatpickr-input {
border-radius: 10px;
}
.flatpickr-day.selected{
  background-color: rgb(220, 156, 44);
  border-color: #f7c056;
}
.flatpickr-day.today {
    border-color: #959ea900;
    color: #f7c056;
}
</style>
