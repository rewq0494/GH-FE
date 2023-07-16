<template>
  <div>
    <table class="thead-table">
      <thead>
        <tr>
          <th @click="sortBy('id')" :class="{ active: sortKey === 'id' }">
            統編
            <span
              class="arrow"
              :class="{
                asc: sortKey === 'company' && sortOrders[sortKey] === 1,
                dsc: sortKey === 'company' && sortOrders[sortKey] === -1,
              }"
            ></span>
          </th>
          <th
            @click="sortBy('company')"
            :class="{ active: sortKey === 'company' }"
          >
            公司
            <span
              class="arrow"
              :class="{
                asc: sortKey === 'company' && sortOrders[sortKey] === 1,
                dsc: sortKey === 'company' && sortOrders[sortKey] === -1,
              }"
            ></span>
          </th>
          <th
            @click="sortBy('RPerson')"
            :class="{ active: sortKey === 'RPerson' }"
          >
            負責人
            <span
              class="arrow"
              :class="{
                asc: sortKey === 'company' && sortOrders[sortKey] === 1,
                dsc: sortKey === 'company' && sortOrders[sortKey] === -1,
              }"
            ></span>
          </th>
          <th
            @click="sortBy('startDate')"
            :class="{ active: sortKey === 'startDate' }"
          >
            起租日期
            <span
              class="arrow"
              :class="{
                asc: sortKey === 'company' && sortOrders[sortKey] === 1,
                dsc: sortKey === 'company' && sortOrders[sortKey] === -1,
              }"
            ></span>
          </th>
          <th
            @click="sortBy('endDate')"
            :class="{ active: sortKey === 'endDate' }"
          >
            結束日期
            <span
              class="arrow"
              :class="{
                asc: sortKey === 'company' && sortOrders[sortKey] === 1,
                dsc: sortKey === 'company' && sortOrders[sortKey] === -1,
              }"
            ></span>
          </th>
          <th
            @click="sortBy('contract')"
            :class="{ active: sortKey === 'contract' }"
          >
            合約
          </th>
          <th>編輯</th>
          <th>刪除</th>
        </tr>
      </thead>
    </table>
    <table class="tbody-table">
      <tbody>
        <tr v-for="member in filteredMembers" :key="member.companyTaxid">
          <td>{{ member.companyTaxid }}</td>
          <td>{{ member.company }}</td>
          <td>{{ member.RPerson }}</td>
          <td>{{ member.startDate }}</td>
          <td>{{ member.endDate }}</td>
          <td>
            <a :href="member.contractPDF" target="_blank">{{
              member.contractPDF.substring(0, 37)
            }}</a>
          </td>
          <td><EditContractButton /></td>
          <td><DeleteMbButton :contractId="member.contractId" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import EditContractButton from "../button/EditContractButton.vue";
import DeleteMbButton from "../button/DeleteMbButton.vue";
import axios from "axios";
export default {
  props: {
    filterKey: String,
  },
  components: {
    EditContractButton,
    DeleteMbButton,
  },
  data() {
    return {
      members: [],
      sortKey: "",
      sortOrders: {
        company: 1,
        RPerson: 1,
        startDate: 1,
        endDate: 1,
        contractPDF: 1,
      },
      searchQuery: "",
    };
  },
  created() {
    axios.get("http://localhost:8081/contracts/contract").then((response) => {
      this.members = response.data;
    });
  },
  computed: {
    filteredMembers() {
      const filterKey = this.filterKey.toLowerCase();
      let data = this.members.map((data) => {
        return {
          ...data,
          startDate: data.startDate.substring(0, 10),
          endDate: data.endDate.substring(0, 10),
        };
      });

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

          if (typeof valueA === "string") {
            return valueA.localeCompare(valueB) * sortMultiplier;
          } else {
            return (valueA - valueB) * sortMultiplier;
          }
        });
      }

      return data;
    },
  },
  methods: {
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] === 1 ? -1 : 1;
    },
  },
};
</script>

<style scoped>
.thead-table {
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
.tbody-table {
  background-color: #fdf4e6;
  text-align: center;
  position: fixed;
  right: 5%;
  top: 25%;
  width: 74%;
  max-height: 500px;
  overflow-y: overlay;
  display: block;
  /* border-collapse: separate; 使用独立的边框模型 */
}

th {
  font-size: 16px;
  font-family: "微軟正黑體";
  /* border-radius: 10px; */
  color: #ffe4d0;
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
  width: 28%;
}
.thead-table th:nth-child(3) {
  width: 10%;
}

.thead-table th:nth-child(4) {
  width: 16%;
}
.thead-table th:nth-child(5) {
  width: 12%;
}

.thead-table th:nth-child(6) {
  width: 15%;
  text-align: center;
}
.thead-table th:nth-child(7) {
  width: 6%;
  text-align: center;
}
.thead-table th:nth-child(8) {
  width: 5%;
  text-align: center;
}

.tbody-table td {
  font-size: 14px;
  color: #706d6c;
  font-family: "微軟正黑體";
  height: 10px; /* 添加行高样式 */
  padding-left: 10px;
  min-width: 40px;
  text-align: left;
  /* border:1px solid #FFE4D0;
    border-collapse: separate;
    border-spacing: 5px;
    box-shadow: 1px 1px 2px rgba(139, 104, 54, 0.079); */
}
.tbody-table td:nth-child(1) {
  width: 12%;
}

.tbody-table td:nth-child(2) {
  width: 28%;
}
.tbody-table td:nth-child(3) {
  width: 12%;
}

.tbody-table td:nth-child(4) {
  width: 15%;
}
.tbody-table td:nth-child(5) {
  width: 15%;
}

.tbody-table td:nth-child(6) {
  width: 12%;
  /* text-align: center; */
}
.tbody-table td:nth-child(7) {
  width: 5%;
  text-align: center;
}
.tbody-table td:nth-child(8) {
  width: 10%;
  text-align: center;
  padding-right: 2px;
}

tr {
  height: 56px;
  box-shadow: 0px 1px 1px rgba(221, 185, 136, 0.538);
}
tr:first-child {
  border-top: none;
}
button {
  border: 0px;
  background-color: #fdf4e6;
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
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #9e5a5a;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #a44a4a;
}

/* 設置整個滾動條的寬度和高度 */
::-webkit-scrollbar {
  width: 7px;
}

/* 滾動條的按鈕部分（上下箭頭按鈕） */
::-webkit-scrollbar-button {
  background: transparent;
  border-radius: 4px;
  height: 0px;
}

/* 動條軌道的樣式 */
::-webkit-scrollbar-track-piece {
  background: transparent;
}

/* 滾動條滑塊的樣式 */
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(83, 60, 34, 0.4);
}
</style>
