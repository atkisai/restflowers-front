<template>
 <div class="dialog" @click="$emit('close')">
   <div @click.stop class="dialog-content" style="background: white">
     <i class="close-dialog" @click="$emit('close')"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z" fill="white"></path></svg>
     </i>
     <h2 class="name" style="text-align: center" v-if="state=='login'">Войти</h2>
     <h2 class="name" style="text-align: center" v-if="state=='registration'">Регистрация</h2>
     <h2 class="name" style="text-align: center" v-if="state=='forgot'">Восстановление пароля</h2>
     <p class="field2" v-if="state=='forgot'">Введите email указанный при регистрации</p>

     <div class="field2" v-if="state=='login'||state=='registration'">
       <div class="p-float-label">
         <InputText style="width: 100%" type="username" :class="{'p-invalid': v$.login.$invalid && sub}" v-model="v$.login.$model"/><label>Логин</label>
       </div>
       <small v-if="(v$.login.$invalid) && sub || v$.login.$pending.$response" class="p-error">Введите логин</small>
     </div>

     <div v-if="state=='registration'" class="field2">
       <div class="p-float-label"><InputText style="width: 100%" :class="{'p-invalid': v$.name.$invalid && sub}" v-model="v$.name.$model"/><label>Имя</label></div>
       <small v-if="(v$.name.$invalid) && sub || v$.name.$pending.$response" class="p-error">Введите имя</small>
     </div>

     <div v-if="state=='registration'" class="field2">
       <div class="p-float-label"><InputMask style="width: 100%" :class="{'p-invalid': v$.phone.$invalid && sub}" v-model="v$.phone.$model" mask="+375(99) 999-99-99"/><label>Телефон</label></div>
       <small v-if="(v$.phone.$invalid) && sub || v$.phone.$pending.$response" class="p-error">Введите телефон</small>
     </div>

     <div v-if="state=='registration'||state=='forgot'" class="field2">
       <div class="p-float-label"><InputText style="width: 100%" type="email" :class="{'p-invalid': v$.email.$invalid && sub}" v-model="v$.email.$model" @keyup.enter="sendPassword"/><label>Email</label></div>
       <small v-if="(v$.email.$invalid) && sub || v$.email.$pending.$response" class="p-error">Введите email</small>
     </div>

     <div class="field2" v-if="state=='login'||state=='registration'">
       <div class="p-float-label"><Password input-style="width: 100%" :feedback="false" toggleMask :class="{'p-invalid': v$.password.$invalid && sub}" v-model="v$.password.$model" @keyup.enter="sendLogin"/><label>Пароль</label></div>
       <small v-if="(v$.password.$invalid) && sub || v$.password.$pending.$response" class="p-error">{{passwordErr}}</small>
     </div>

     <div v-if="state=='registration'" class="field2">
       <div class="p-float-label"><Password input-style="width: 100%" :feedback="false" toggleMask :class="{'p-invalid': v$.confirm.$invalid && sub}" v-model="v$.confirm.$model"/><label>Подтверждение</label></div>
       <small v-if="(v$.confirm.$invalid) && sub || v$.confirm.$pending.$response" class="p-error">Подтвердите пароль</small>
     </div>

     <div v-if="state=='login'" class="field2">
       <Button label="Войти" class="p-button-rounded p-button-text p-button-raised" @click="sendLogin"/>
       <Button label="Регистрация" class="p-button-rounded p-button-text" @click="state='registration'"/>
       <Button label="Забыли пароль?" class="p-button-rounded p-button-text" @click="state='forgot'"/>
     </div>

     <div v-if="state=='registration'" class="field2">
       <Button label="Регистрация" class="p-button-rounded p-button-text p-button-raised" @click="sendRegistration"/>
       <Button label="Войти" class="p-button-rounded p-button-text" @click="state='login'"/>
     </div>

     <div v-if="state=='forgot'" class="field2">
       <Button label="Отправить" class="p-button-rounded p-button-text p-button-raised" @click="sendPassword"/>
       <Button label="Войти" class="p-button-rounded p-button-text" @click="state='login'"/>
       <Button label="Регистрация" class="p-button-rounded p-button-text" @click="state='registration'"/>
     </div>

   </div>
 </div>
</template>

<script>
import {useVuelidate} from "@vuelidate/core";
import {email, minLength, required} from "@vuelidate/validators";
import axios from "axios";

export default {
  name: "ModalLogin",
  setup(){
    return {v$:useVuelidate()}
  },
  validations(){
    return{
      login:{required},
      name:{required},
      phone:{required},
      email:{required,email},
      password:{required, minLength: minLength(8)},
      confirm:{required, s(){return this.password==this.confirm}}
    }
  },
  data(){
    return{
      api:localStorage.getItem('api'),
      state:'login',
      login:'',
      name:'',
      phone:'',
      email:'',
      password:'',
      confirm:'',
      sub:false,
    }
  },
  methods:{
    sendRegistration(){
      this.sub=true
      if(!this.v$.$invalid){
        let data={username:this.login, password:this.password, email:this.email,name:this.name,phone:this.phone}
        axios.post(this.api+'api/registration/',data).then((res) => {
          if(res.data=='Успешно'){
            localStorage.user=this.login
            localStorage.name=this.name
            // this.user_name=this.name
            this.$emit('user_name',this.name)
            // this.user=this.login
            this.$emit('user',this.login)
            // this.dialog_login=false
            this.$emit('close')
            this.$toast.add({severity: 'success', summary: 'Регистрация пройдена, добро пожаловать '+localStorage.getItem('name')+'!', life: 3000})
          }else{
            this.$toast.add({severity: 'error', summary: res.data, life: 3000})
          }
        })
      }
    },
    sendLogin(){
      this.sub=true
      if(!this.v$.login.$invalid && !this.v$.password.$invalid){
        let data={username:this.login, password:this.password}
        axios.post(this.api+'api/login/',data).then((res) => {
          if(res.data[0]=='Успешно'){
            localStorage.user=this.login
            this.$emit('user',this.login)

            if(res.data[2]!=null){
              localStorage.name=res.data[2]
              this.user_name=res.data[2]
            }else{
              localStorage.name=this.login
              this.user_name=this.login
            }

            if(res.data[1]=='Клиент'){
              localStorage.crm='display:none'
              this.$emit('crm_display','display:none')
            }else{
              localStorage.crm='display:block'
              this.$emit('crm_display','display:block')
            }
            this.$emit('close')
            this.$toast.add({severity: 'success', summary: 'Добро пожаловать '+localStorage.getItem('name')+'!', life: 3000})
          }else{
            this.$toast.add({severity: 'error', summary: res.data, life: 3000})
          }
        })
      }
    },
    sendPassword(){
      this.sub=true
      if(!this.v$.email.$invalid){
        axios.post(this.api+'api/forgot/',{email:this.email}).then((res) => {
          if(res.data=='Пароль отправлен на email!'){
            // this.dialog_login=false
            this.$emit('close')
            this.$toast.add({severity: 'success', summary: res.data, life: 3000})
          }else{
            this.$toast.add({severity: 'error', summary: res.data, life: 3000})
          }
        })
      }
    },
    computed:{
      passwordErr () {
        if(this.v$.password.minLength.$invalid){return 'Минимальная длина - 8 символов'}else if(this.v$.password.required.$invalid){return 'Введите пароль'}
      },
    }
  }
}
</script>

<style scoped>

</style>