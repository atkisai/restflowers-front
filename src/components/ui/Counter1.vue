<template>
  <div class="counter">
    <button class="counter__cell btn-reset" @click="val>1?val-=1:val===1;$emit('update:value',val)"><i class="pi pi-minus"></i></button>
    <input class="counter__cell counter__input c10" readonly v-model="val"/>
    <button class="counter__cell btn-reset" @click="val<100?val+=1:val===100;$emit('update:value',val)"><i class="pi pi-plus"></i></button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props:{
    value:[Number],
  },
  data(){
    return{
      val:this.value,
    }
  }
}
</script>

<style scoped>
.counter {
  display: flex;
  align-items: center;
  min-width: 126px;
  height: 25px;
  overflow: hidden;
  border: 1px solid #e1e1e1;
  padding: 20px 0;
  border-radius: 50px;
  width: 150px;
}
/*.counter input{*/
/*  width: 100%;*/
/*}*/
.counter input:focus, textarea:focus {
  outline: 0;
  outline-offset: 0;
}
.counter__cell {
  /*display: -webkit-inline-box;*/
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  align-items: center;
  height: 25px;
  padding: 2px 15px;
  font-weight: 500;
  text-align: center;
}
.counter__input {
  border: none;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  /*font-weight: 600;*/
  /*font-size: 18px;*/
  text-align: center;
  text-transform: uppercase;
  /*color: var(--color-dark);*/
  /*font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, */
  /*"Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";*/
}
.counter__cell:first-child {
    font-size: 22px;
    line-height: 18px;
    border-right: 1px solid #e1e1e1;
}
.counter__cell:nth-child(2) {
    width: 44px;
    padding: 4px;
}
.counter__cell:last-child {
    font-size: 18px;
    line-height: 22px;
    border-left: 1px solid #e1e1e1;
}
.btn-reset {
    border: none;
    /*padding: 0;*/
    background: white!important;
    color: black!important;
    cursor: pointer;
}

</style>