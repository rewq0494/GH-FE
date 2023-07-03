
<!-- 第二版有排序 -->
<template>
    <div >
        <table class="thead-table">
            <thead>
                <tr>
                  <th @click="sortBy('orderId')" :class="{ active: sortKey === 'orderId' }">訂單編號
                      <span class="arrow" :class="{ 'asc': sortKey === 'date' && sortOrders[sortKey] === 1, 'dsc': sortKey === 'date' && sortOrders[sortKey] === -1 }"></span></th>
                    <th @click="sortBy('date')" :class="{ active: sortKey === 'date' }">日期
                    <span class="arrow" :class="{ 'asc': sortKey === 'date' && sortOrders[sortKey] === 1, 'dsc': sortKey === 'date' && sortOrders[sortKey] === -1 }"></span></th>
                    <th @click="sortBy('time')" :class="{ active: sortKey === 'time' }">時間
                        <span class="arrow" :class="{ 'asc': sortKey === 'date' && sortOrders[sortKey] === 1, 'dsc': sortKey === 'date' && sortOrders[sortKey] === -1 }"></span></th>
                    <th @click="sortBy('eventName')" :class="{ active: sortKey === 'eventName' }">活動名稱
                        <span class="arrow" :class="{ 'asc': sortKey === 'date' && sortOrders[sortKey] === 1, 'dsc': sortKey === 'date' && sortOrders[sortKey] === -1 }"></span></th>
                    <th @click="sortBy('space')" :class="{ active: sortKey === 'space' }">場地
                        <span class="arrow" :class="{ 'asc': sortKey === 'date' && sortOrders[sortKey] === 1, 'dsc': sortKey === 'date' && sortOrders[sortKey] === -1 }"></span></th>
                    <th @click="sortBy('contentPerson')" :class="{ active: sortKey === 'contentPerson' }">聯絡人</th>
                    <th></th>
                </tr>
            </thead>
        </table>
        <table class="tbody-table">
            <tbody>
                <tr v-for="member in filteredMembers" :key="member.id">
                    <td>{{ member.orderId }}</td>
                    <td>{{ member.date }}</td>
                    <td>{{ member.time }}</td>
                    <td>{{ member.eventName }}</td>
                    <td>{{ member.space }}</td>
                    <td>{{ member.contentPerson }}</td>
                    <td> <OrderInfoButton/></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
  import OrderInfoButton from '../button/OrderInfoButton.vue';
  export default {
    props: {
    filterKey: String,
  },
  components:{
    OrderInfoButton,
  },
    data() {
      return {
        members: [
        {
        "orderId": "2064856",
        "date": "2021/09/17",
        "time": "09:00-12:00",
        "eventName": "光明高中2022音樂會",
        "space": "A",
        "contentPerson": "小飛象",
        "company": "美商迪士尼科技股份有限公司",

      },
      {
        "orderId": "9418502",
        "date": "2021/01/01",
        "time": "09:00-12:00",
        "eventName": "矯正署毒害防治教育宣導",
        "space": "B",
        "contentPerson": "布丁狗",
        "company": "美商皮克斯有限公司",

      },
      {
        "orderId": "5438504",
        "date": "2021/02/15",
        "time": "09:00-12:00",
        "eventName": "蘋果年度新品發表",
        "space": "C",
        "contentPerson": "庫洛米",
        "company": "美商幼幼有限公司",

      },
      {
        "orderId": "6458501",
        "date": "2021/03/10",
        "time": "09:00-12:00",
        "eventName": "藝術插花課程",
        "space": "A",
        "contentPerson": "史奴比",
        "company": "美商默默科技有限公司",

      },
      {
        "orderId": "2628502",
        "date": "2021/04/20",
        "time": "2021/04/20",
        "eventName": "教育部校園安全研討會",
        "space": "B",
        "contentPerson": "莉露姆",
        "company": "東森有限公司",

      },
      {
        "orderId": "1948503",
        "date": "2021/05/05",
        "time": "15:00-18:00",
        "eventName": "青年創業經驗分享講座",
        "space": "C",
        "contentPerson": "小小兵",
        "company": "GTV有限公司",

      },
      {
        "orderId": "7660851",
        "date": "2021/06/15",
        "time": "12:00-15:00",
        "eventName": "科學實驗展覽",
        "space": "A",
        "contentPerson": "濕紙巾",
        "company": "緯來有限公司",

      },
      {
        "orderId": "6138504",
        "date": "2021/07/25",
        "time": "15:00-18:00",
        "eventName": "健康生活講座",
        "space": "B",
        "contentPerson": "獅子完",
        "company": "HBO有限公司",

      },
      {
        "orderId": "6450855",
        "date": "2021/08/08",
        "time": "15:00-18:00",
        "eventName": "美術作品展示",
        "space": "C",
        "contentPerson": "哈特利",
        "company": "緯來有限公司",

      },
      {
        "orderId": "4338504",
        "date": "2021/09/18",
        "time": "12:00-15:00",
        "eventName": "人工智慧應用研討會",
        "space": "A",
        "contentPerson": "葉大熊",
        "company": "HBO有限公司",

      },
      {
        "orderId": "0857505",
        "date": "2021/10/30",
        "time": "12:00-18:00",
        "eventName": "光明高中2022音樂會",
        "space": "B",
        "contentPerson": "小叮噹",
        "company": "光泉股份有限公司",

      }

      ],
        sortKey: '',
        sortOrders: {
            date: 1,
            name: 1,
            phone: 1,
            email: 1,
            address: 1
        },
        searchQuery: ''
      };
    },
    computed: {
    filteredMembers() {
      const filterKey = this.filterKey.toLowerCase();
      let data = this.members;

      if (filterKey) {
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().includes(filterKey);
          });
        });
      }

      if (this.sortKey) {
        const sortKey = this.sortKey;
        const sortMultiplier = this.sortOrders[sortKey] > 0 ? 1 : -1;
        data = data.slice().sort((a, b) => {
          const valueA = a[sortKey];
          const valueB = b[sortKey];

          if (typeof valueA === 'string') {
            return valueA.localeCompare(valueB) * sortMultiplier;
          } else {
            return (valueA - valueB) * sortMultiplier;
          }
        });
      }

      return data;
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] === 1 ? -1 : 1;
    },
  }
};
</script>
  
<style scoped>
  .thead-table{
    background-color: #373633;
    height: 50px;
    position: fixed;
    right: 5%;
    top: 18%;
    width: 74%;
    height: 7%;
    border-radius: 20px 20px 0 0;
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .tbody-table{
    background-color: #FDF4E6;
    text-align: center;
    position: fixed;
    right: 5%;
    top: 25%;
    width: 74%;
    max-height: 500px;
    overflow-y: overlay;; 
    display: block;
    /* border-collapse: separate; 使用独立的边框模型 */
  }

  th {
    font-size: 16px;
    font-family: '微軟正黑體';
    /* border-radius: 10px; */
    color: #FFE4D0;
    cursor: pointer;
   }

    th:first-child {
    border-top-left-radius: 10px;
    }

    th:last-child {
    border-top-right-radius: 10px;
    }
    .thead-table th:nth-child(1) {
    width: 8%;
    }
  
  .thead-table th:nth-child(2) {
    width: 16%;
  }
  .thead-table th:nth-child(3) {
    width: 12%;
  }
  
  .thead-table th:nth-child(4) {
    width: 22%;
  }
  .thead-table th:nth-child(5) {
    width: 13%;
  }
  .thead-table th:nth-child(6) {
    width: 11%;
  }
  
  .thead-table th:nth-child(7) {
    width: 16%;
    text-align: center;
  }


  
  .tbody-table td {
    font-size: 14px;
    color: #706D6C;
    font-family: '微軟正黑體';
    height: 10px; /* 添加行高样式 */
    padding-left: 10px;
    min-width: 40px;
    text-align: left;
  }
  .tbody-table td:nth-child(1) {
    width: 4%;
  }
  
  .tbody-table td:nth-child(2) {
    width: 5%;
  }
  .tbody-table td:nth-child(3) {
    width: 5%;
  }
  
  .tbody-table td:nth-child(4) {
    width: 10%;
  }
  .tbody-table td:nth-child(5) {
    width: 4%;
  }
  .tbody-table td:nth-child(6) {
    width: 4%;
  }
  
  .tbody-table td:nth-child(7) {
    width: 4%;
    text-align: center;
    /* padding-right: 2px ; */
  }
  
  tr {
    height: 56px;
    box-shadow: 0px 1px 1px rgba(221, 185, 136, 0.538);
  }
  tr:first-child {
  border-top: none;
  }
 button{
  border: 0px;
  background-color:#FDF4E6 ;
  cursor: pointer;
 }
  
  .edit-icon {
    width: 20px;
    height: 20px;
  }
  .delete-icon {
    width: 20px;
    height: 20px;
  }

  .arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 1;
 }

.arrow.asc {
  border-left: 4px solid transpaspace;
  border-right: 4px solid transpaspace;
  border-bottom: 4px solid #9e5a5a;
 }

.arrow.dsc {
  border-left: 4px solid transpaspace;
  border-right: 4px solid transpaspace;
  border-top: 4px solid #a44a4a;
 }

/* 設置整個滾動條的寬度和高度 */
::-webkit-scrollbar {
width: 7px;
}

/* 滾動條的按鈕部分（上下箭頭按鈕） */
::-webkit-scrollbar-button {
background: transpaspace;
border-radius: 4px;
height: 0px;
}

/* 動條軌道的樣式 */
::-webkit-scrollbar-track-piece {
background: transpaspace;
}

/* 滾動條滑塊的樣式 */
::-webkit-scrollbar-thumb {
border-radius: 4px;
background-color: rgba(83, 60, 34, 0.4);
} 
</style> 
   
