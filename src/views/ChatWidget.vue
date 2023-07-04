<template>
  <div>
    <div class="chat-member"></div>
    <div class="chat-container">
      <div class="chat-messages">
        <div v-for="message in messages" :key="message.id" :class="{'message': true, 'sender-message': message.sender === '你', 'receiver-message': message.sender !== '你'}">
          <div class="sender">{{ message.sender }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
      <div class="chat-input">
        <input v-model="inputMessage" @keydown.enter="sendMessage" placeholder="請輸入消息..." />
        <button @click="sendMessage">發送</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatWidget',
  data() {
    return {
      messages: [
        { id: 1, sender: '小明', content: '你好' },
        { id: 2, sender: '小红', content: 'Hi' },
        { id: 3, sender: '小明', content: '最近怎么样？' },
      ],
      inputMessage: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.inputMessage.trim() !== '') {
        const newMessage = {
          id: this.messages.length + 1,
          sender: '你',
          content: this.inputMessage.trim()
        };
        this.messages.push(newMessage);
        this.inputMessage = '';
      }
    }
  }
};
</script>

<style scoped>
.chat-member{
  height: 600px;
  width: 400px;
  background-color: #ffffff;
  position: absolute;
  top: 60px;
  left: 360px;
  z-index: 999999;
}
.chat-container {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 600px;
  background-color: #dbceb9;
  border-radius: 20px;
  padding: 10px;
  position: absolute;
  top: 60px;
  left: 760px;
  z-index: 999999;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: scroll;
}

.message {
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 5px;
  padding-left: 15px;
  background-color: #f5f5f5;
}

.sender {
  font-weight: bold;
}

.sender-message {
  width: auto;
  max-width: 300px;
  background-color: #ffc374;
  /* position: absolute;
  right: 12px; */
  white-space: nowrap;
}

.receiver-message {
  width: auto;
  max-width: 300px;
  background-color: #f5f5f5;
  white-space: nowrap;
}

.chat-input {
  display: flex;
}

.chat-input input {
  flex-grow: 1;
  padding: 5px;
  outline: none;
  border-radius: 10px;
  border: 0px;
  margin-right: 10px;
}

.chat-input button {
  color: #524d46;
  padding: 5px 10px;
  background-color: #ffaa3a;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
.chat-input button:hover {
  padding: 5px 10px;
  background-color: #ffc374;
  transition: background-color 0.8s;
  color: #6b625b;
  transition: color 0.8s;
  border-radius: 10px;
  border: none;
  cursor: pointer;
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
