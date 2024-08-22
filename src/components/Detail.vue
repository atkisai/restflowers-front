<template>
    <div class="grid" style="max-width: 1200px;margin: 0 auto">
      <div class="md:col-6">
        <photo-provider>
          <photo-consumer v-for="(src,index) in flower.images" :key="src.image" :intro="display=='none'?flower.name:''" :src="src.image" style="display: block">
            <img v-if="index==0" :src="src.image" style="width: 100%; height: auto; cursor: pointer;box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)"/>
          </photo-consumer>
        </photo-provider>
      </div>
      <div class="md:col-6">
        <div class="c2">{{flower.name}}</div>
        <div v-if="flower.description!=''" class="c3">
          <div class="c5">Описание</div>
          <div class="c4">{{flower.description}}</div>
        </div>
        <div class="c3">
          <div class="c5">Цветы</div>
          <div class="c4">
            <div v-for="(i,index) in flower.category">{{index!==flower.category.length-1?i.name+',&nbsp':i.name}}</div>
          </div>
        </div>
        <div class="c3">
          <div class="c5">Поводы</div>
          <div class="c4">
            <div v-for="(i,index) in flower.povod">{{index!==flower.povod.length-1?i.name+',&nbsp':i.name}}</div>
          </div>
        </div>
        <Extra :flower="flower" @total_price_list="function init_total_price(list){total_price_list=list}"/>

        <Button v-if="!$store.state.basket.includes(flower)" class="p-button-rounded p-button-text p-button-raised p-button-lg" style="margin-top: 10px" label="Добавить в корзину" @click="addBasket"/>
        <Button v-if="$store.state.basket.includes(flower)" class="p-button-rounded p-button-text p-button-raised p-button-lg" style="margin-top: 10px" label="Изменить букет" @click="$emit('close')"/>
        <Button class="p-button-rounded p-button-text p-button-raised p-button-lg p-button-danger" style="margin-top: 10px;margin-left: 20px" label="Закрыть" @click="$emit('close')"/>

      </div>
    </div>
</template>

<script>
import Extra from "./Extra";
import { mapState } from 'vuex';
export default {
  name: "Detail",
  components:{Extra},
  props:{
    flower:[Object]
  },
  data(){
    return{
      api:localStorage.getItem('api'),
      total_price_list:[],
    }
  },
  methods:{
    addBasket(){
      this.$emit('close')
      this.$store.commit('setBasket',this.flower)
    },
    updateBasket(){
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>