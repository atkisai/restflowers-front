<template>
  <div class="c6">
    <div class="c5">Количество</div>
    <div class="c7 c9">
      <Counter v-model:value="flower.col"/>
      <div class="c10">{{flower.col*flower.price}} р.</div>
    </div>
    <div class="c5">Дополнительно</div>

    <div v-for="(item,index) in flower.set.extra" :key="index">
      <div class="c7">
        <div class="c9">
          <Checkbox v-model="item.selected" :binary="true"/>
          <div class="c8">{{item.name}}</div>
        </div>
        <div class="c10">{{item.col*item.price}} р.</div>
      </div>
      <Counter v-show="item.selected" v-model:value="item.col"/>
    </div>
<!--    <div class="c7 c9">-->
<!--      <div style="color: rgb(92, 99, 112)">Доставка</div>-->
<!--      <div class="c10">1000 р.</div>-->
<!--    </div>-->
    <div class="c7 c9">
      <div class="c5">Итого</div>
      <div class="c10" style="font-weight: 600">{{total_price_init}} р.</div>
    </div>
  </div>
</template>

<script>
import Counter from "../components/ui/Counter1";
import Checkbox from 'primevue/checkbox';
export default {
  name: "Extra",
  components:{Counter,Checkbox},
  props:{
    flower:[Object],
  },
  data(){
    return{
      // col_flowers:1,
      // extra_items:[
      //   {name:'Шары',price:500,col:1,selected:false,total:''},
      //   {name:'Зелень',price:1000,col:1,selected:false,total:''},
      //   {name:'Ваза',price:5000,col:1,selected:false,total:''},
      //   {name:'Raffaello',price:3000,col:1,selected:false,total:''},
      //   {name:'Мишка Teddy (средний)',price:5000,col:1,selected:false,total:''},
      //   {name:'Шары Комплект',price:9500,col:1,selected:false,total:''},
      //   {name:'Мишка Teddy (гигант) 2 метра',price:25000,col:1,selected:false,total:''},
      // ],
    }
  },
  mounted(){
    // if(this.flower.extras){
    //   this.extra_items=this.flower.extras[0]
    //   this.col_flowers=this.flower.extras[3]
    // }
  },
  computed:{
    total_price_init(){
      let total = 0
      for(let item of this.flower.set.extra){
        if(item.selected===true){
          item.total=item.price*item.col
          total+=item.total
        }
      }
      // let total_extras_price = total
      // let total_price_flowers = this.flower.price*this.flower.col
      this.flower.total=this.flower.price*this.flower.col+total
      // this.$emit('total_price_list',[this.flower.,total_extras_price,total_price_flowers,this.col_flowers,total])
      return this.flower.total
    }
  },
}
</script>

<style scoped>

</style>