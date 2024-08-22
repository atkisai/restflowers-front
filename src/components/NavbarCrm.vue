<template>
  <!--  navbar-->
  <div class="navbar">
    <div class="find_block">
      <Button icon="pi pi-bars" class="p-button-rounded p-button-text p-button-raised burger-700" @click="dialog_menu=true"/>
      <transition name="dialog">
        <div v-if="dialog_menu" class="dialog" @click="dialog_menu = false"></div>
      </transition>
      <transition name="menu">
        <div v-if="dialog_menu" class="menu">
          <i class="close-menu" @click="dialog_menu = false"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z" fill="white"></path></svg>
          </i>
          <Button label="Заказы" class="p-button-text" @click="$router.push('/crm/orders')"/>
          <Button label="Товары" class="p-button-text" @click="$router.push('/crm/products')"/>
          <Button label="Статистика" class="p-button-text" @click="$router.push('/crm/statistics')"/>
          <Button label="Чат" class="p-button-text" @click="$router.push('/crm/chat')"/>
        </div>
      </transition>

      <div class="collapse-700">
        <Button label="Заказы" class="p-button-rounded p-button-text p-button-raised" @click="$router.push('/crm/orders')"/>
        <Button label="Товары" class="p-button-rounded p-button-text p-button-raised" @click="$router.push('/crm/products')"/>
        <Button label="Статистика" class="p-button-rounded p-button-text p-button-raised" @click="$router.push('/crm/statistics')"/>
      </div>

      <a @click="$router.push('/')" style="position: absolute;left: 50%;margin-left: -20px;cursor: pointer">
        <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6191 29.0818C18.7573 27.3661 17.1259 25.4335 15.3056 23.6571C12.9753 21.3728 12.2068 20.4493 7.82249 20.3841C8.09889 20.1403 9.10676 19.6189 9.51463 19.3661C11.1753 18.3346 12.7876 17.0122 13.9607 15.465C17.6135 10.611 16.727 2.63464 10.5225 0.641381C8.9146 0.121156 6.64043 0.0133044 4.38987 0.00881004H0V0.12117C0.513745 0.12117 1.00644 0.325249 1.36971 0.688522C1.73298 1.05179 1.93711 1.5445 1.93711 2.05825V28.0032C1.93681 28.5167 1.73257 29.0091 1.36933 29.3722C1.00609 29.7352 0.513551 29.9391 0 29.9391V30.0515H7.14718V29.9391C6.89281 29.9394 6.64089 29.8896 6.40581 29.7924C6.17073 29.6952 5.95711 29.5526 5.77719 29.3728C5.59727 29.193 5.45458 28.9795 5.35727 28.7445C5.25996 28.5095 5.20998 28.2575 5.21013 28.0032V21.5189C5.2203 21.5114 5.23122 21.505 5.24271 21.4998C8.18316 20.3088 10.2461 22.6481 11.4607 23.9526C12.8303 25.42 14.5371 27.2021 16.0753 28.7065C19.0056 31.5582 22.4337 34.2032 26.7764 35.0144C30.7573 35.7594 35.6382 35.7594 40 34.565C33.7539 36.0414 24.5022 32.6706 20.6191 29.0818ZM5.21462 20.9369V1.85374C5.21462 1.49615 5.35667 1.15321 5.60953 0.900348C5.86239 0.64749 6.20534 0.50543 6.56294 0.50543H6.62362C7.30467 0.517743 7.97924 0.639911 8.62135 0.867225C12.8551 2.42902 12.9775 9.92453 11.7393 13.5964C11.1876 15.2169 10.3174 16.7106 9.1798 17.9897C8.66182 18.583 6.29215 20.7492 5.21462 20.9369Z" fill="#FF1678"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M33.6752 7.22921L33.2808 7.3573L33.1752 7.05731C33.1752 7.05731 32.1426 4.15393 32.1426 4.14382C31.2437 2.00899 29.9494 0.505617 27.5089 0.448313H23.0808C22.9318 0.448313 22.7889 0.507504 22.6835 0.612862C22.5782 0.718219 22.519 0.861113 22.519 1.01011V14.3416C23.1184 14.3763 23.7197 14.3616 24.3167 14.2978C26.4999 14.0101 27.6325 12.5337 27.7482 9.96741C27.7797 9.20786 27.7482 8.44719 27.7482 7.68652C27.8392 7.68652 27.9302 7.68652 28.0201 7.68652V21.4348C27.9302 21.4348 27.8392 21.4348 27.7482 21.4348C27.7482 20.6753 27.7763 19.9146 27.7482 19.1539C27.6359 16.5888 26.4999 15.109 24.3167 14.8247C23.7197 14.7608 23.1184 14.7462 22.519 14.7809V21.7393C22.1718 24.8022 20.2819 27.4697 19.2021 27.7551V2.0809C19.2035 1.82271 19.1536 1.56681 19.0553 1.32804C18.9571 1.08927 18.8124 0.87237 18.6298 0.689903C18.4471 0.507436 18.23 0.363038 17.9911 0.265057C17.7523 0.167076 17.4963 0.117469 17.2381 0.119108V0H31.1168C31.1269 0 31.1359 0 31.1516 0C31.208 0.00727821 31.2637 0.0196979 31.3179 0.0370874C31.4591 0.0848284 31.5876 0.164048 31.6937 0.268774C31.7998 0.3735 31.8807 0.500977 31.9303 0.641569L31.9584 0.753928L33.5853 6.87752L33.6752 7.22921Z" fill="#FF1678"></path>
        </svg>
      </a>

      <div style="margin-left: auto">
        <Button label="Чат" class="p-button-rounded p-button-text p-button-raised collapse-700" @click="$router.push('/crm/chat')"/>
        <Button v-if="user==''" label="Войти" class="p-button-rounded p-button-text p-button-raised" icon="pi pi-user" @click="dialog_login=true"/>
        <span class="user">
          <SplitButton v-if="user!=''" class="p-button-rounded p-button-text p-button-raised" :model="items">
            <Button @click="$router.push('/profile')">
              <i class="pi pi-user" style="margin-right: 5px"></i>
              <span>{{user_name}}</span>
            </Button>
          </SplitButton>
        </span>
      </div>
    </div>
  </div>

  <transition name="dialog">
    <div v-if="dialog_login" class="dialog" @click="dialog_login=false">
      <div @click.stop class="dialog-content" style="background: white">
        <i class="close-dialog" @click="dialog_login=false"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z" fill="white"></path></svg>
        </i>
        <h2 class="name" style="text-align: center" v-if="state=='login'">Войти</h2>
        <h2 class="name" style="text-align: center" v-if="state=='registration'">Регистрация</h2>
        <h2 class="name" style="text-align: center" v-if="state=='forgot'">Восстановление пароля</h2>
        <p class="field2" v-if="state=='forgot'">Введите email указанный при регистрации</p>

        <div class="field2" v-if="state=='login'||state=='registration'">
          <div class="p-float-label"><InputText style="width: 100%" type="username" :class="{'p-invalid': v$.login.$invalid && sub}" v-model="v$.login.$model"/><label>Логин</label></div>
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
  </transition>

</template>

<script>
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import axios from "axios"
export default {
  name: "Navbar",
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
      admin:true,
      user_name:localStorage.getItem('name'),
      user:localStorage.getItem('user')!=undefined?localStorage.getItem('user'):'',
      api:localStorage.getItem('api'),
      state:'login',
      dialog_menu:false,
      dialog_login:false,
      login:'',
      name:'',
      phone:'',
      email:'',
      password:'',
      confirm:'',
      sub:false,
      items: [
        {
          label: 'Профиль',
          icon: 'pi pi-external-link',
          command: () => {
            this.$router.push('/profile')
          }
        },
        {
          label: 'Выйти',
          icon: 'pi pi-sign-in',
          command: () => {
            localStorage.removeItem('user');
            this.user='';
            this.$router.push('/')
            this.$toast.add({ severity: 'warn', summary: 'До свидания '+this.user_name+'!', life: 3000});
            localStorage.removeItem('user');localStorage.removeItem('name')
          }
        },

      ]
    }
  },
  watch:{
    dialog_login(x){if(x==true){document.body.style.overflow='hidden'}else{document.body.style.overflow='auto'}},
  },
  computed:{
    passwordErr () {
      if(this.v$.password.minLength.$invalid){return 'Минимальная длина - 8 символов'}else if(this.v$.password.required.$invalid){return 'Введите пароль'}
    },
  },
  methods:{
    setFranchise(){
      this.$router.push('/franchise')
      // document.location.reload()
    },
    sendRegistration(){
      this.sub=true
      if(!this.v$.$invalid){
        let data={username:this.login, password:this.password, email:this.email,name:this.name,phone:this.phone}
        axios.post(this.api+'api/registration/',data).then((res) => {
          if(res.data=='Успешно'){
            localStorage.setItem('user',this.login)
            localStorage.setItem('name',this.name)
            this.user_name=this.name
            this.user=this.login
            this.dialog_login=false
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
            console.log(res.data)
            localStorage.setItem('user',this.login);this.user=this.login
            if(res.data[1]!=null){localStorage.setItem('name',res.data[1]);this.user_name=res.data[1]}
            else{localStorage.setItem('name',this.login);this.user_name=this.login}
            this.dialog_login=false
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
            this.dialog_login=false
            this.$toast.add({severity: 'success', summary: res.data, life: 3000})
          }else{
            this.$toast.add({severity: 'error', summary: res.data, life: 3000})
          }
        })
      }
    }
  }
}
</script>