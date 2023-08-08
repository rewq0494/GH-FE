<template>
  <SidebarMenu/>
  <div class="title">租賃狀況</div>
  <SearchButton @search="updateSearchQuery" />
  <div class="main-section">
    <loading class="loading" v-if="isLoading"  />
    <LeaseData :contracts="contracts" :filter-key="searchQuery" />
  </div>
  <AddMemberDialog v-if="showDialog" @close="closeDialog"/>
</template>

<script>
import SearchButton from '../components/button/SearchButton.vue';
import LeaseData from '../components/data-list/LeaseData.vue';
import AddMemberDialog from '../components/dialog/AddMemberDialog.vue';
import SidebarMenu from '../components/SidebarMenu.vue';
import Loading from '../components/loading/LoadingOverlay.vue';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';

export default {
  name: 'MemberList',
  components: {
    Loading,
    SearchButton,
    LeaseData,
    AddMemberDialog,
    SidebarMenu,
  },
  data() {
    return {
      isLoading: false, // 控制 loading 動畫的顯示
      showDialog: false,
      searchQuery: '',
      contracts: [],
    };
  },
  methods: {
    updateSearchQuery(searchTerm) {
      this.searchQuery = searchTerm;
    },
    fetchData() {
      this.isLoading = true; // 啟用 loading 動畫
      axios
        .get('/contract')
        .then(response => {
          this.contracts = response.data;
          console.log(this.contracts)
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false; // 關閉 loading 動畫
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>



<!-- ----------------------------------- -->
<style scoped>

.title{
  font-family: 微軟正黑體 ;
  color: #7D5F4F;
  font-size: 32px;
  font-weight: 500;
  position: fixed;
  right: 68%;
  top: 4%;
}
.main-section{
/* background-color: #FDF4E6; */
position: fixed;
right: 5%;
top: 18%;
width: 74%;
height: 100%;
border-radius: 20px;
}
.section-head{
background-color: #373633;
width: 100%;
height: 8%;
border-radius: 20px 20px 0 0;
display: flex;
justify-content: flex-start;
align-items: center;
}
.section-head p {
font-size: 16px;
margin-left: 50px;
margin-right: 70px;
color: #FFE4D0;
}
.loading{
  position: absolute;
  top: 200px;
  left: 45%;
}
</style>