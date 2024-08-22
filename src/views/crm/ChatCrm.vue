<template>

  <div style="max-width: 1200px;margin: 0 auto;text-align: center" class="main">

    <div class="chat-content" @click="picker=false">
      <div v-for="msg in list_msg">
        <div class="chat-msg" :style="{background: msg.color}">{{msg.msg}}</div>
      </div>
    </div>
    <div class="chat-input-block">
      <VuemojiPicker v-if="picker" @emojiClick="handleEmojiClick" style="position: absolute;top: -400px;right: 0"/>
      <span class="p-input-icon-right">
        <i style="display: flex;align-items: center">
          <div class="chat-icon" style="font-size: 40px" @click="send">📨</div>
          <div class="chat-icon" style="font-size: 25px" @click="picker==false?picker=true:picker=false">😀</div>
        </i>
        <InputText v-model="msg" class="chat-input" @keyup.enter="send"/>
      </span>
    </div>
  </div>
</template>

<script>
import Textarea from 'primevue/textarea';
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker'
export default {
  name: "Chat",
  components: {VuemojiPicker,},
  data(){
    return{
      socket:null,
      msg:'',
      list_msg:this.$store.state.mesgs_crm,
      container:{},
      picker:false,
    }
  },
  mounted() {
    this.container = document.querySelector('.chat-content')
    this.container.scrollTop = 999999
    this.socket = new WebSocket(localStorage.getItem('api_ws')+'chat_crm/')
    this.socket.onmessage = (res) => {
      let msg = JSON.parse(res.data);
      this.$store.commit('setMesgsCrm',msg)
      this.$nextTick(() => {this.container.scrollTop = 99999})
    }
  },
  methods:{
    send(){
      const msgData = {
        'msg': this.msg,
        'color': this.getRandomColor(),
      };
      this.socket.send(JSON.stringify(msgData))
      this.msg=''
    },
    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    handleEmojiClick(emoji) {
      this.msg=this.msg+emoji.unicode
    },
    setEmoji (emoji) {
      console.log(emoji)
      this.msg=this.msg+emoji
    },
    setGif (gif) {
      console.log(gif)
      this.msg=this.msg+gif
    }
  },
  beforeUnmount(){
    this.socket.close()
  }
}
</script>

<style scoped>
.chat-input-block{box-shadow: rgba(6, 5, 50, 0.1) 0 4px 30px;background-color: white;position: fixed;bottom: 0;width: auto;z-index: 100; width: 100%;max-width: 1200px}
.chat-input{width: 100%;text-align: center;}
.chat-content{
  position: absolute;
  top: 50px;
  left:0px;
  right:0px;
  bottom:44px;
  max-width: 1200px;
  margin:0 auto;
  overflow-x: hidden;
  overflow-y: visible;
  box-shadow: rgba(6, 5, 50, 0.1) 0 4px 30px;
}
.chat-msg{
  margin: 10px;
  padding: 10px;
  font-size: 20px;
  border-radius: 50px;
  width: auto;
  display: inline-block;
  color: white;
  -webkit-box-shadow: 1px 5px 48px -5px rgba(80, 34, 79, 0.43);
  -moz-box-shadow: 1px 5px 48px -5px rgba(80, 34, 79, 0.43);
  box-shadow: 1px 5px 48px -5px rgba(80, 34, 79, 0.43);
}
.chat-icon:hover{
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}
.p-input-icon-right > i:last-of-type {
  color: white!important;
  font-style: normal;
  cursor: pointer;
}
.p-input-icon-left > i, .p-input-icon-right > i {
  top: 0;
  margin-top: 0rem;
}
</style>