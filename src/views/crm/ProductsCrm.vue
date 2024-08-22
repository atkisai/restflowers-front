<template>
  <div class="main">
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
          <p style="color:#673AB7">{{this.sortedAndSearchedPosts.length}}</p>
        </div>

        <div style="margin-left: auto;display: flex;text-align: center">
          <Button :style="activeZoom" class="p-button-rounded p-button-text p-button-raised" @click="zoom=zoom==='100%'?'50%':'100%'" icon="pi pi-search-minus"/>
          <Button :style="activeDisplay" class="p-button-rounded p-button-text p-button-raised" @click="display=display==='none'?'block':'none'" icon="pi pi-image"/>
          <Dropdown :options="sortedActive" v-model="selectedActive" optionLabel="label" class="filter-items my-filter"/>
        </div>
      </div>
    </div>
    <!--list products-->
    <ul class="my-ul">
      <transition-group name="flowers-list">
        <li v-for="flower in sortedAndSearchedPosts" class="my-li" :style="{zoom:zoom}">
          <div class="card">
            <photo-provider class="cardImages">
              <photo-consumer v-for="(src,index) in flower.images" :key="api+src.image" :intro="display=='none'?flower.name:''" :src="api+src.image" style="display: block">
                <img v-if="index==0" :src="api+src.image" class="image"/>
              </photo-consumer>
            </photo-provider>

            <div style="padding: 14px" :style="{display:display}" @click="openCart(flower)">
              <p class="name">{{flower.name}}</p>
              <p class="description">{{flower.description}}</p>
              <div class="block_buy">
                <p class="name">{{flower.price}} руб.</p>
                <Button class="p-button-text p-button-rounded p-button-danger p-button-raised" @click="openCart(flower)">Выбрать</Button>
              </div>
            </div>

          </div>
        </li>
      </transition-group>
    </ul>
    <!--dialog-buy-->
    <transition name="dialog">
      <div v-if="false" class="dialog" @click="dialog_buy=false">
        <div @click.stop class="dialog-content">
          <i class="close-dialog" @click="dialog_buy=false"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z" fill="white"></path></svg>
          </i>
          <div class="grid" style="text-align: center;padding-bottom: 0px">
            <div class="col-12">
              <span class="name">{{ flower.name }}</span>
            </div>
          </div>
          <div class="grid">
            <div class="col-12" style="text-align: center">
              <photo-provider>
                <photo-consumer v-for="(src,index) in images" :key="src" :src="src">
                  <img v-if="index==0" :src="src" class="view-box" style="width: 300px">
                </photo-consumer>
              </photo-provider>
            </div>
          </div>
          <div class="grid">
            <div class="col-6">
              <Listbox :options="flower.category" option-label="name" list-style="max-height:150px"></Listbox>
            </div>
            <div class="col-6">
              <Listbox :options="flower.povod" option-label="name" list-style="max-height:150px"></Listbox>
            </div>
          </div>
          <div class="grid">
            <div class="col-12">
            <span class="dialog-footer">
              <p class="name">{{flower.price}} руб.</p>
              <Button class="p-button-rounded p-button-text p-button-raised" label="Добавить в корзину" @click="dialog_buy=false; this.$store.commit('setBasket',flower)"/>
            </span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <Sidebar v-model:visible="dialog_buy" :baseZIndex="200" position="full">
<!--      <template #header><h1>Редактировать букет</h1></template>-->
      <DetailCrm :flower="flower" :state="state" @close="this.dialog_buy=false"/>
    </Sidebar>

    <SpeedDial :model="items" direction="up" class="speeddial-right" buttonClass="p-button-raised p-button-text p-button-white speeddial-fixed" :tooltipOptions="{position: 'left'}" style="position: fixed;bottom: 70px;right: 18px;"/>

  </div>

</template>

<script>
import axios from 'axios'
import Sidebar from 'primevue/sidebar';
import SpeedDial from 'primevue/speeddial';
import Detail from "../../components/Detail";
import DetailCrm from "../../components/DetailCrm";
export default{
  components: {Sidebar,Detail,DetailCrm,SpeedDial},
  data(){
    return{
      sortedActive:[{label:'Активные',value:true},{label:'Не активные',value:false}],
      selectedActive:{label:'Активные',value:true},
      sortedItems:[{label:'По дате',value:'id'},{label:'По цене',value:'price'}],
      selectedSort:{label:'По дате',value:'id'},
      flowers:this.$store.state.flowers_crm,
      povods:this.$store.state.povods,
      categorys:this.$store.state.categorys,
      selected_povods:{name:'Все поводы'},
      selected_category:{name:'Все цветы'},
      dialog_buy:false,
      dialog_basket:false,
      dialog_filter:false,
      api:localStorage.getItem('api'),
      searchQuery:'',
      flower:'',
      images:[],
      allImages:[],
      zoom: '100%',
      display: 'auto',
      rows:10,
      menu_items: [{name:'Доставка'},{name:'Контакты'},{name:'Франшиза'},{name:'О нас'}],
      items: [
        {
          label: 'Добавить товар',
          icon: 'pi pi-plus',
          command: () => {
            // this.flower=""
            this.dialog_buy=true
            this.state="create"
            // this.$toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
        },
        // {
        //   label: 'Update',
        //   icon: 'pi pi-refresh',
        //   command: () => {
        //     this.$toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        //   }
        // },
        // {
        //   label: 'Delete',
        //   icon: 'pi pi-trash',
        //   command: () => {
        //     this.$toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        //   }
        // },
        // {
        //   label: 'Upload',
        //   icon: 'pi pi-upload',
        //   command: () => {
        //     this.$router.push('fileupload');
        //   }
        // },
        // {
        //   label: 'Vue Website',
        //   icon: 'pi pi-external-link',
        //   command: () => {
        //     window.location.href = 'https://vuejs.org/'
        //   }
        // }
      ]
    }
  },
  watch:{
    dialog_buy(x){this.overflowHidden(x)},
    dialog_basket(x){this.overflowHidden(x)},
  },
  computed:{
    sortedFlowersActive(){
      return this.flowers.filter(flower=>flower.enable===this.selectedActive.value)
    },
    sortedFlowersDataPrice(){
      const sort = [...this.sortedFlowersActive].sort((flower1,flower2)=>flower1[this.selectedSort.value]>flower2[this.selectedSort.value]?1:-1)
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
    // this.getData()
    if(this.$store.state.flowers_crm==''){this.getData()}
  },
  methods:{
    load(){
      this.rows+=5
      console.log(this.rows)
    },
    async getData(){
      await axios.get(this.api+'api/crm_products/').then((res)=>{
        const data=res.data
        // console.log(data)
        this.$store.commit('setFlowersCrm',data.flowers)
        this.flowers=data.flowers
        data.povods.unshift({name:'Все поводы'})
        this.$store.commit('setPovods',data.povods)
        this.povods=data.povods
        data.categorys.unshift({name:'Все цветы'})
        this.$store.commit('setCategorys',data.categorys)
        this.categorys=data.categorys
      })
    },
    openCart(flower){
      this.state='update'
      this.flower=flower
      this.dialog_buy=true
    },
    openImg(flower){
      this.images=[]
      flower.images.forEach(el=>this.images.push(this.api+el.image))
    },
    overflowHidden(x){
      if(x==true){document.body.style.overflow='hidden'}else{document.body.style.overflow='auto'}
    }
  }
}
</script>

<style scoped>

</style>