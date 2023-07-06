<template>
  <div>
    <div class="chat-member">
      <div class="chat-member-title">訪客</div>
      <div
        class="select-member-box"
        v-for="member in members"
        :key="member.id"
        @click="selectMember(member)"
        :class="{ active: selectedMember && selectedMember.id === member.id }"
      >
        <span class="member-name">{{ member.name }}</span>
      </div>
    </div>
    <div class="chat-container" v-if="selectedMember">
      <div class="selected-member">{{ selectedMember.name }}</div>
      <div class="chat-messages">
        <div v-for="message in getMessagesForSelectedMember" :key="message.id" :class="{'message-container': true, 'sender-container': message.sender === '你', 'receiver-container': message.sender !== '你'}">
  <div :class="{'sender':true, 'sender-name':message.sender === '你','receiver-name': message.sender !== '你'}">{{ message.sender }}</div>
  <div class="flex-container">
  <div :class="{'message': true, 'sender-message': message.sender === '你', 'receiver-message': message.sender !== '你'}">
    <div class="content">{{ message.content }}</div>
  </div>
  <div :class="{'time': true, 'sender-time': message.sender === '你', 'receiver-time': message.sender !== '你'}" v-if="message.time">{{ message.time }}</div> <!-- 添加显示时间的元素 -->
</div></div>
      </div>
      <div class="chat-input">
        <input v-model="inputMessage" @keydown.enter="sendMessage" placeholder="請輸入訊息..." />
        <button @click="sendMessage">發送</button>
      </div>
    </div>
    <div v-else class="chat-container">
      <div class="selected-member">選擇聊天對象</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatWidget',
  data() {
    return {
      // members: [
      //   { id: 1, name: '小明', messages: [] },
      //   { id: 2, name: '小红', messages: [] },
      //   { id: 3, name: '其他會員', messages: [] },
      // ],
      members: [
        { id: 1, name: '小明', messages: [{ id: 1, sender: '小明', content: '你好 請問需要什麼幫助呢?' }] },
        { id: 2, name: '史奴比', messages: [{ id: 1, sender: '奴比', content: '你好 請問需要什麼幫助呢?' }] },
        { id: 3, name: '其他會員', messages: [] },
      ],
      selectedMember: null,
      inputMessage: '',
    };
  },
  computed: {
    getMessagesForSelectedMember() {
      if (this.selectedMember) {
        return this.selectedMember.messages;
      }
      return [];
    },
  },
  methods: {
    selectMember(member) {
      this.selectedMember = member;
    },
    sendMessage() {
  if (this.selectedMember && this.inputMessage.trim() !== '') {
    const newMessage = {
      id: this.selectedMember.messages.length + 1,
      sender: '你',
      content: this.inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    this.selectedMember.messages.push(newMessage);
    this.inputMessage = '';
  }
}
  },
};
</script>


<style scoped>
.flex-container {
  display: flex;
  justify-content: flex-end;
  align-items: end;
}

.chat-member{
  height: 620px;
  width: 400px;
  position: absolute;
  top: 60px;
  left: 360px;
  z-index: 999999;
  border-radius: 20px;
  background-color:#d3d0ca ;
}
.selected-member {
   position: relative;
   margin-bottom: 5px;
   min-height: 50px;
  width: 600px;
  height: 50px;
  background-color: #bbb6af;
  border-radius: 20px 20px 0 0;  
  text-align: center;
}
.select-member-box.active {
  background-color: #f4ebdef9;
}
.chat-member-title{
  position: relative;
  width: 400px;
  min-height: 50px;
  height: 50px;
  background-color: #bbb6af;
  border-radius: 20px 20px 0 0;  
  text-align: center;
}
.select-member-box{
  margin-left: 4px;
  margin-top:4px ;
  height: 60px;
  width: 392px;
  position: relative;
  background-color: #f5f4f3e2;
  border-radius: 5px;
  cursor: pointer;
}
.select-member-box:hover{
  background-color: #f4ebdef9;
  transition: background-color 0.8s;
}
.member-name{
  position: relative;
  top: 3px;
  margin-left: 8px;
  font-weight: 600;
}
.chat-container {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 620px;
  background-color: #d3d0ca;
  border-radius: 20px;
  /* padding: 10px; */
  position: absolute;
  top: 60px;
  left: 762px;
  z-index: 999999;
}
.sender-container {
  min-height: 50px;
  position: relative;
  margin-top: 1px;
  margin-left: auto; 
  width: 590px;
  border: red solid 1px;
}

.receiver-container {
  min-height: 56px;
  position: relative;
  margin-top: 1px;
  margin-left: 0;
  width: 590px;
  border: red solid 1px;
}

.chat-messages {

  display: flex; /* 添加这一行 */
  flex-direction: column; /* 添加这一行 */
  flex-grow: 1;
  overflow: auto;;
}

.message {
  display: inline-flex;
  max-width: 300px;
  width: auto;
  border-radius: 15px;
  margin-bottom: 10px;
  margin-top: 5px;
  padding: 6px;
  padding-left: 15px;
  padding-right: 15px;
  overflow:hidden;
  
}
.content{
  word-wrap: break-word; /* 文字超过容器宽度时自动换行 */
  white-space: pre-wrap; /* 保留换行符，显示换行文本 */
}
.sender {
  font-size: 12px;
  margin-left: auto;
  font-weight: bold;
  word-wrap: break-word; /* 文字超过容器宽度时自动换行 */
  overflow-wrap: break-word; /* 兼容性写法，支持更多浏览器 */
  white-space: pre-wrap; /* 保留换行符，显示换行文本 */
}
.sender-name{
  color: rgb(0, 255, 132);
  position: absolute;
  margin-bottom: 10px;
  right: 10px;
}
.receiver-name{
  color: red;
  position: absolute;
  margin-bottom: 10px;
  left: 10px;
}

.sender-message {
  display: inline-block;
  position: absolute;
  top:12px;
  right: 10px;
  background-color: #fcd587;
  flex-wrap: wrap;
  margin-left: 10px; 
}

.receiver-message {
  position: absolute;
  top:12px;
  left: 10px;
  background-color: #f5f5f5;
  flex-wrap: wrap;
}
.time{
  position: absolute;
  transform: translateY(200%);
  font-size: 12px;
}
.sender-time{
  display: inline-block;
  position: relative;
  left: 1px; /* 将左侧位置调整为 -1px，与 .sender-message 右侧相隔 1px */
  color: #ffaa3a;
}
.receiver-time{
  color: #3aff47;
}
.chat-input {
  display: flex;
}

.chat-input input {
  height: 60px;
  flex-grow: 1;
  padding: 5px;
  outline: none;
  border-radius: 15px 5px 5px 15px;
  border: 0px;
  margin: 5px;
}

.chat-input button {
  position: relative;
  bottom: -4px;
  height: 70px;
  width: 80px;
  color: #524d46;
  padding: 5px 10px;
  background-color: #ffaa3a;
  border-radius: 5px 15px 15px 5px;
  border: none;
  cursor: pointer;
  margin: 0 5px 0px 0;
}
.chat-input button:hover {
  background-color: #ffc374;
  transition: background-color 0.8s;
  color: #6b625b;
  transition: color 0.8s;
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
