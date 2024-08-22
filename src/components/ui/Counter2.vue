<template>
  <div class="counter">
    <Button icon="pi pi-minus" @click="col_flowers>1?col_flowers-=1:col_flowers===1"/>
    <input readonly v-model="col_flowers" class="counter__cell counter__input"/>
    <Button icon="pi pi-plus" @click="col_flowers<100?col_flowers+=1:col_flowers===100"/>
  </div>
</template>

<script>
export default {
  name: "Counter",
  data(){
    return{
      col_flowers:1,
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
.counter input{
  width: 100%;
}
.counter input:focus, textarea:focus {
  outline: 0;
  outline-offset: 0;
}
.counter__cell {
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
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
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  text-transform: uppercase;
  color: var(--color-dark);
  font-family: inherit;
}
/*.counter__cell:first-child {*/
/*    font-size: 22px;*/
/*    line-height: 18px;*/
/*    border-right: 1px solid #e1e1e1;*/
/*}*/
/*.counter__cell:nth-child(2) {*/
/*    width: 44px;*/
/*    padding: 4px;*/
/*}*/
/*.counter__cell:last-child {*/
/*    font-size: 18px;*/
/*    line-height: 22px;*/
/*    border-left: 1px solid #e1e1e1;*/
/*}*/
/*.btn-reset {*/
/*    border: none;*/
/*    !*padding: 0;*!*/
/*    background: white!important;*/
/*    color: black!important;*/
/*    cursor: pointer;*/
/*}*/

</style>