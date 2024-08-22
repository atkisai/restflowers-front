<template>
  <div class="card" style="max-width: 1200px;margin: 0 auto">

    <div style="padding: 10px">

      <div class="field">
        <span class="p-float-label">
          <InputText v-model="v$.name.$model" :class="{'p-invalid': v$.name.$invalid && sub_flower}" style="width: 400px"/>
          <label>Название</label>
        </span>
        <small v-if="(v$.name.$invalid) && sub_flower || v$.name.$pending.$response" class="p-error">Введите название букета</small>
      </div>

      <div class="field">
      <span class="p-float-label">
        <Textarea v-model="description" rows="5" cols="36"/>
        <label>Описание</label>
      </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <InputNumber v-model="v$.price.$model" :class="{'p-invalid': v$.price.$invalid && sub_flower}"/>
          <label>Цена</label>
        </span>
        <small v-if="(v$.price.$invalid) && sub_flower || v$.price.$pending.$response" class="p-error">Введите цену букета</small>
      </div>

      <div class="field">
        <MultiSelect v-model="selected_categorys" :options="catygorys" optionLabel="name" placeholder="Выберите категории" style="max-width: 400px"/>
      </div>

      <div class="field">
        <MultiSelect v-model="selected_povods" :options="povods" optionLabel="name" placeholder="Выберите поводы" style="max-width: 400px"/>
      </div>

      <div class="field">
        <Checkbox v-model="enable" :binary="true"/>
        <small style="margin-left: 10px">Активный</small>
      </div>

      <div class="field">
        <photo-provider>
          <photo-consumer v-for="(src,index) in images" :key="api+src.image" :src="api+src.image" style="display: inline-block;margin: 10px 10px 10px 0;position: relative">
            <div class="card">
              <img :src="api+src.image" style="width: 100px; height: auto; cursor: pointer;box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)"/>
              <Button class="p-button-rounded p-button-danger p-button-raised del_img" @click.stop="delImg(src.id)" icon="pi pi-times"/>
            </div>
          </photo-consumer>
        </photo-provider>
        <FileUpload v-if="state=='create'" mode="basic" name="demo[]" :customUpload="true" @uploader="addImgCreate" :auto="true" chooseLabel="Добавить фото" />
        <FileUpload v-if="state=='update'" mode="basic" name="demo[]" :customUpload="true" @uploader="addImg" :auto="true" chooseLabel="Добавить фото" />
      </div>

      <Button class="p-button-rounded p-button-text p-button-raised p-button-lg" style="margin-top: 10px" label="Сохранить" @click="saveProduct"/>
<!--      <Button v-if="state=='update'" class="p-button-rounded p-button-text p-button-raised p-button-lg" style="margin-top: 10px;margin-left: 20px" label="В архив" @click="addArhive"/>-->
      <Button v-if="state=='update'" class="p-button-rounded p-button-text p-button-raised p-button-lg p-button-danger" style="margin-top: 10px;margin-left: 20px" label="Удалить" @click="dialog_del=true"/>
      <Button class="p-button-rounded p-button-text p-button-raised p-button-lg p-button-danger" style="margin-top: 10px;margin-left: 20px" label="Закрыть" @click="$emit('close')"/>

      <Dialog header="Удаление букета" v-model:visible="dialog_del" :style="{width: '350px'}" :modal="true">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span>Вы действительно хотите удалить букет?</span>
        </div>
        <template #footer>
          <Button label="Отмена" icon="pi pi-times" class="p-button-text p-button-raised" @click="dialog_del=false"/>
          <Button label="Удалить" icon="pi pi-check" class="p-button-text p-button-raised p-button-danger" @click="delProduct"/>
        </template>
      </Dialog>

    </div>

  </div>
</template>

<script>
import MultiSelect from 'primevue/multiselect';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import axios from 'axios';
import {email, minLength, required} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  name: "DetailCrm.vue",
  setup: () => ({ v$: useVuelidate() }),
  components:{MultiSelect,InputNumber,FileUpload},
  props:{
    flower:[Object],
    state:[String],
  },
  data(){
    return{
      api:localStorage.getItem('api'),
      name:this.flower.name,
      description:this.flower.description,
      price:this.flower.price,
      catygorys:this.$store.state.categorys,
      selected_categorys:this.flower.category,
      povods:this.$store.state.povods,
      selected_povods:this.flower.povod,
      enable:this.flower.enable,
      images:this.flower.images,
      selected_image:'',
      sub_flower: false,
      dialog_del: false,
    }
  },
  validations(){
    return{
      name:{required},
      price:{required},
    }
  },
  mounted() {
    // console.log(this.flower)
    // console.log(this.state)
    if(this.state=='create'){
      this.name=''
      this.description=''
      this.price=''
      this.selected_categorys=[]
      this.selected_povods=[]
      this.enable=true
      this.images=[]
    }
    // console.log(this.flower)
  },
  methods:{
    saveProduct(){
      let t = this
      t.sub_flower=true
      if(this.state=='update' && !this.v$.name.$invalid && !this.v$.price.$invalid){
        t.flower.name=t.name
        t.flower.description=t.description
        t.flower.price=t.price
        t.flower.category=t.selected_categorys
        t.flower.povod=t.selected_povods
        t.flower.enable=t.enable
        this.$store.commit('updateFlowerCrm',t.flower)
        let fd={'state':'update','id':t.flower.id,'name':t.name,'description':t.description,'price':t.price,'categorys':t.selected_categorys,'povods':t.selected_povods,'enable':t.enable}
        axios.post(t.api+'api/crm_product_save/',fd).then((res) => {
          t.$toast.add({severity: 'success', summary: 'Продукт сохранен', life: 3000})
        })
      }else if(t.state=='create' && !t.v$.name.$invalid && !t.v$.price.$invalid){
        if (t.selected_image!=''){
          console.log(t.enable)
          let fd=t.selected_image
          // let fd={'state':'create','name':t.name,'description':t.description,'price':t.price,'categorys':t.selected_categorys,'povods':t.selected_povods,'enable':t.enable}
          fd.append('state','create')
          fd.append('name',t.name)
          fd.append('description',t.description)
          fd.append('price',t.price)
          fd.append('categorys',JSON.stringify(t.selected_categorys))
          fd.append('povods',JSON.stringify(t.selected_povods))
          fd.append('enable',t.enable)
          axios.post(t.api+'api/crm_product_save/',t.selected_image).then((res) => {
            console.log(res.data)
            this.$store.commit('addFlowerCrm',res.data)
            t.$toast.add({severity: 'success', summary: 'Продукт сохранен', life: 3000})
            this.$emit('close')
          })
        }else{
          this.$toast.add({severity: 'error', summary: 'Должно быть хотя бы одно изображение!', life: 3000})
        }
      }
    },
    addImg(event){
      let fd=new FormData();
      fd.append('image',event.files[0]);
      fd.append('id',this.flower.id)
      axios.post(this.api+'api/crm_add_img/',fd).then((res) => {
        let data = res.data
        this.images=data.images
        this.flower.images=data.images
        this.$store.commit('updateFlowerCrm',this.flower)
        this.$toast.add({severity: 'success', summary: 'Изображение загружено', life: 3000})
      })
    },
    delImg(id_image){
      if(this.images.length>1){
        axios.post(this.api+'api/crm_del_img/', {id_image:id_image,id:this.flower.id}).then((res) => {
          let data = res.data
          this.images=data.images
          this.flower.images=data.images
          this.$store.commit('updateFlowerCrm',this.flower)
          this.$toast.add({severity: 'success', summary: 'Изображение удалено', life: 3000})
        })
      }else{
        this.$toast.add({severity: 'error', summary: 'Должно быть хотя бы одно изображение!', life: 3000})
      }
    },
    addImgCreate(event){
      let fd=new FormData();
      fd.append('image',event.files[0]);
      this.selected_image=fd
      this.$toast.add({severity: 'success', summary: 'Изображение добавленно!', life: 3000})
    },
    // addArhive(){
    //   axios.post(this.api+'api/crm_product_save/',{id:this.flower.id,state:'in_arhiv'}).then((res)=>{
    //     this.flower.enable = false
    //     this.$store.commit('updateFlowerCrm',this.flower)
    //     this.$emit('close')
    //   })
    // },
    delProduct(){
      axios.post(this.api+'api/crm_product_save/',{id:this.flower.id,state:'delete'}).then((res)=>{
        this.$store.commit('delFlowerCrm',this.flower)
        this.$emit('close')
      })
    }
  }
}
</script>

<style scoped>
/*input{width: 100px!important;}*/
.del_img{
  position: absolute;
  bottom: 5px;
  left:74px;
  z-index:200;
  height: 25px!important;
  width: 25px!important;
  /*background: rgba(255, 255, 255, .9);*/
  /*backdrop-filter: blur(0px);*/
}
</style>