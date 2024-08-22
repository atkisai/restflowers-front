<template>
  <div class="main" style="text-align: center">
    <!--find-block-->
    <div class="container_of_find_block">
      <div class="find_block">

        <Button class="p-button-rounded p-button-text p-button-raised burger-1000" @click="dialog_filter=!dialog_filter" style="height: 2.25rem">Фильтр</Button>

        <transition name="filter">
          <div v-if="dialog_filter" class="filter-container">
            <input-text type="text" v-model="searchQuery" placeholder="Поиск по словам" class="filter-items-dialog my-filter"/>
            <Dropdown :options="sortedItems" v-model="selectedSort" optionLabel="label" class="filter-items-dialog my-filter"></Dropdown>
            <Dropdown :options="povods" v-model="selected_povods" optionLabel="name" class="filter-items-dialog my-filter"/>
            <Dropdown :options="categorys" v-model="selected_category" optionLabel="name" class="filter-items-dialog my-filter"/>
          </div>
        </transition>

        <div class="collapse-1000" style="display: flex">
          <input-text type="text" v-model="searchQuery" placeholder="Поиск по словам" class="filter-items my-filter"/>
          <Dropdown :options="sortedItems" v-model="selectedSort" optionLabel="label" class="filter-items my-filter"/>
          <Dropdown :options="povods" v-model="selected_povods" optionLabel="name" class="filter-items my-filter"/>
          <Dropdown :options="categorys" v-model="selected_category" optionLabel="name" class="filter-items my-filter"/>
          <p class="p-button p-button-text" style="cursor:auto">{{this.sortedAndSearchedPosts.length}}</p>
        </div>

        <div style="margin-left: auto;display:flex;align-items: center;">
          <Button :style="activeZoom" class="p-button-rounded p-button-text p-button-raised" @click="zoom=zoom==='100%'?'50%':'100%'" icon="pi pi-search-minus"/>
          <Button :style="activeDisplay" class="p-button-rounded p-button-text p-button-raised" @click="display=display==='none'?'block':'none'" icon="pi pi-image"/>
          <Button class="p-button-rounded p-button-text p-button-raised" @click="dialog_basket=true">
            <i style="margin-right: 5px" class="pi pi-shopping-cart"></i>
            <span>Корзина {{basket.length===0?'':basket.length}}</span>
          </Button>
        </div>
      </div>
    </div>
    <!--list products-->
    <ul class="my-ul">
      <transition-group name="flowers">
        <li v-for="flower in sortedAndSearchedPosts" :key="flower.id" class="my-li" :style="{zoom:zoom}">
          <div class="card">
            <photo-provider class="cardImages">
              <photo-consumer v-for="(src,index) in flower.images" :key="src.image" :intro="display=='none'?flower.name:''" :src="src.image" style="display: block">
                <img v-if="index==0" :src="src.image" class="image"/>
              </photo-consumer>
            </photo-provider>

            <div style="padding: 14px" :style="{display:display}" @click="openCart(flower)">
              <p class="name">{{flower.name}}</p>
              <p class="description">{{flower.description}}</p>
              <div class="block_buy">
                <p class="name">{{flower.price}} руб.</p>
                <Button class="p-button-text p-button-rounded p-button-raised" @click="openCart(flower)">Выбрать</Button>
              </div>
            </div>

          </div>
        </li>
      </transition-group>
    </ul>
    <Button v-if="next && download!='all'" style="margin: 20px" class="p-button-raised p-button-rounded p-button-text" label="Загрузить еще 30" @click="getNextData"/>

    <Sidebar v-model:visible="dialog_buy" :baseZIndex="200" position="full">
      <Detail :flower="flower" @close="this.dialog_buy=false"/>
    </Sidebar>

    <!--dialog-basket-->
    <transition name="dialog">
      <div v-if="dialog_basket" class="dialog" @click="dialog_basket = false"></div>
    </transition>
    <transition name="basket">
      <div v-if="dialog_basket" class="basket">
        <i class="close-basket" @click="dialog_basket = false"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z" fill="white"></path></svg>
        </i>

        <h2 class="basket-header">{{basket.length}} {{tovar}} на {{basketPrice}} руб.</h2>

        <ul class="my-ul" style="overflow: auto;height: calc(100% - 110px)">
          <transition-group name="flowers-list">
            <li v-for="(flower, index) in basket" :key="index" class="my-li" style="max-width: 220px">
              <div class="card">
                <photo-provider class="cardImages">
                  <photo-consumer v-for="(src,index) in flower.images" :key="src.image" :src="src.image" style="display: block">
                    <img v-if="index==0" :src="src.image" class="image" style="max-width: 220px"/>
                  </photo-consumer>
                </photo-provider>
                <div style="padding: 14px">
                  <p class="name" @click="openCart(flower)">{{flower.name}}</p>
                  <div class="block_buy">
                    <p class="name" @click="openCart(flower)">{{flower.total}} руб.</p>
                    <Button class="p-button-text p-button-rounded p-button-danger p-button-raised" icon="pi pi-times" @click="this.$store.commit('delBasket', {flower:flower,index:index})"></Button>
                  </div>
                </div>
              </div>
            </li>
          </transition-group>
        </ul>

        <div class="basket-footer" v-if="basket.length!=0">
          <div style="display: flex;justify-content: space-between;align-items: center;margin: 5px 15px">
            <p class="name">{{basketPrice}} руб.</p>
            <Button class="p-button-text p-button-rounded p-button-raised" @click="dialog_basket=false;$router.push('/checkout')">Оформить заказ</Button>
          </div>
        </div>

      </div>
    </transition>
  </div>

</template>

<script>
import Sidebar from 'primevue/sidebar';
import Detail from "../components/Detail";
import axios from 'axios'
import { mapState} from 'vuex'
export default{
  components: {Sidebar,Detail},
  data(){
    return{
      api:localStorage.getItem('api'),
      sortedItems:[{label:'По дате',value:'id'},{label:'По цене',value: 'price'}],
      selectedSort:{label:'По дате',value:'id'},
      flowers:this.$store.state.flowers,
      povods:this.$store.state.povods,
      categorys:this.$store.state.categorys,
      basket:this.$store.state.basket,
      selected_povods:{name:'Все поводы'},
      selected_category:{name:'Все цветы'},
      dialog_buy:false,
      dialog_basket:false,
      dialog_filter:false,
      searchQuery:'',
      flower:'',
      images:[],
      allImages:[],
      zoom: '100%',
      display: 'auto',
      rows:10,
      menu_items: [{name:'Доставка'},{name:'Контакты'},{name:'Франшиза'},{name:'О нас'}],
      next:this.$store.state.next,
    }
  },
  watch:{
    dialog_buy(x){this.overflowHidden(x)},
    dialog_basket(x){this.overflowHidden(x)},
    download(){this.getData()}
  },
  computed:{
    ...mapState(['download']),
    sortedFlowersDataPrice(){
      const sort = [...this.flowers].sort((flower1,flower2)=>flower1[this.selectedSort.value]>flower2[this.selectedSort.value]?1:-1)
      if (this.selectedSort.value==='id'){return sort.reverse()}
      else {return sort}
    },
    sortedFlowersPovods(){
      if(this.selected_povods.name!='Все поводы'){return this.sortedFlowersDataPrice.filter(flower=>flower.povod.some(e=>e.name==this.selected_povods.name))}
      else{return this.sortedFlowersDataPrice}},
    sortedFlowersCategorys(){
      if(this.selected_category.name!='Все цветы'){return this.sortedFlowersPovods.filter(flower=>flower.category.some(e=>e.name==(this.selected_category.name)))}
      else{return this.sortedFlowersPovods}
    },
    sortedAndSearchedPosts(){
      // console.log(this.sortedFlowersCategorys.length)
      return this.sortedFlowersCategorys.filter(flower => flower.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || flower.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
    },
    flowersNumber(){
      return this.sortedAndSearchedPosts.length
    },
    activeZoom(){
      if(this.zoom!=='100%'){return {'background': '#ebe7f6'}}else{return {background: 'white'}}
    },
    activeDisplay(){
      if(this.display==='none'){return {'background': '#ebe7f6'}}else{return {background: 'white'}}
    },
    slideIndex(images){
      console.log(images)
      for(let i=0;i<images.length;i++){}
      return 0
    },
    basketPrice(){
      let price = 0
      this.basket.forEach(i=>price+=Number(i.total))
      return price
    },
    imgHeight(){
      if(document.documentElement.clientWidth<500&&this.images.length>1){return{'height':'100px'}}else{return {'height':'200px'}}
    },
    tovar(){
      const l = this.basket.length
      if(l==1){return'товар'};if(l>1&&l<5){return'товара'};if(l==0||l>4){return'товаров'}
    }
  },
  mounted() {
    // console.log(this.flowers)
    this.getData()
    // console.log(this.flowers)
    if(this.$store.state.flowers==''){this.getData()}
  },
  methods:{
    load(){
      this.rows+=5
      console.log(this.rows)
    },
    getData(){
      if(String(this.download)!='all'){
        axios.post(this.api+'api/get_data1/',{state:'1'}).then((res)=>{
          const data=res.data
          console.log(data)
          data.povods.unshift({name:'Все поводы'})
          this.$store.commit('setPovods',data.povods)
          this.povods=data.povods
          data.categorys.unshift({name:'Все цветы'})
          this.$store.commit('setCategorys',data.categorys)
          this.categorys=data.categorys
        }).then(
            axios.get(this.api+'api/get_data2/',{params:{ordering:'-date_time'}}).then((res)=>{
              const data=res.data
              this.$store.commit('setFlowers',data.results)
              this.flowers=data.results
              this.$store.commit('setNext', data.next)
              this.next=data.next
              this.$nextTick(() => {
                document.dispatchEvent(new Event('render-event'))
              })
            })
        )
      }else{
        axios.post(this.api+'api/index/',{state:'1'}).then((res)=>{
          const data=res.data
          console.log(data)
          this.$store.commit('setFlowers',data.flowers)
          this.flowers=data.flowers
          data.povods.unshift({name:'Все поводы'})
          this.$store.commit('setPovods',data.povods)
          this.povods=data.povods
          data.categorys.unshift({name:'Все цветы'})
          this.$store.commit('setCategorys',data.categorys)
          this.categorys=data.categorys
        }).then(
          axios.post(this.api+'api/index/',{state:'2'}).then((res)=>{
            const data=res.data
            this.$store.commit('updateFlowers',data)
            this.flowers = this.flowers.concat(data)
            this.$nextTick(() => {
              document.dispatchEvent(new Event('render-event'))
            })
          })
        )
      }
      // await axios.post(this.api+'api/get_pag_data/',{data_price:'-date_time'}).then((res)=>{
      //   const data=res.data
      //   console.log(data)
      //   this.$store.commit('setFlowers',data.flowers)
      //   this.flowers=data.flowers
      //   let next = this.api+'api/get_data/'+data.next
      //   console.log(next)
      //   this.$store.commit('setNext', next)
      //   this.next=next
      //   // this.$store.commit('updateFlowers',data.results)
      //   // this.flowers = this.flowers.concat(data)
      //   this.$nextTick(() => {
      //     document.dispatchEvent(new Event('render-event'))
      //   })
      // })
    },
    async getNextData(){
      await axios.get(this.next).then((res)=>{
        const data=res.data
        this.$store.commit('updateFlowers',data.results)
        this.flowers = this.flowers.concat(data.results)
        this.$store.commit('setNext',data.next)
        this.next=data.next
      })
    },
    openCart(flower){
      this.flower=flower
      this.dialog_buy=true
      // this.images=[]
      // flower.images.forEach(el=>this.images.push(this.api+el.image))
      // console.log(this.images)
      //this.$router.push(`/${flower.id}`)
    },
    openImg(flower){
      this.images=[]
      flower.images.forEach(el=>this.images.push(this.api+el.image))
    },
    overflowHidden(x){
      if(x==true){document.body.style.overflow='hidden'}else{document.body.style.overflow='auto'}
    },
  }
}
</script>