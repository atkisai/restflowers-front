<template>
  <div style="max-width: 1200px;margin: 0 auto;padding:20px;text-align: center">
    <form @submit.prevent="sendProfile()" class="my-flex flex">
      <h2 class="c12">Личные данные</h2>

      <div class="field">
        <div class="p-float-label"><InputText :class="{'p-invalid': v$.name.$invalid && sub_prof}" v-model="v$.name.$model"/><label>Имя</label></div>
        <small v-if="(v$.name.$invalid) && sub_prof || v$.name.$pending.$response" class="p-error">Введите имя</small>
      </div>

      <div class="field">
        <div class="p-float-label"><InputText :class="{'p-invalid': v$.email.$invalid && sub_prof}" v-model="v$.email.$model"/><label>Почта</label></div>
        <small v-if="(v$.email.$invalid) && sub_prof || v$.email.$pending.$response" class="p-error">Введите почту</small>
      </div>

      <div class="field">
        <div class="p-float-label"><InputMask :class="{'p-invalid': v$.phone.$invalid && sub_prof}" v-model="v$.phone.$model" mask="+375(99) 999-99-99"/><label>Телефон</label></div>
        <small v-if="(v$.phone.$invalid) && sub_prof || v$.phone.$pending.$response" class="p-error">Введите телефон</small>
      </div>

      <div><Button label="Сохранить" type="submit" icon="pi pi-check" class="p-button-lg" style="margin-bottom: 10px"/></div>
    </form>

    <Button label="Удалить пользователя" class="p-button-sm p-button-text p-button-raised" @click="dialog_del=true"/>
    <Dialog header="Удаление пользователя" v-model:visible="dialog_del" :style="{width: '350px'}" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Вы действительно хотите удалить пользователя? Введите логин и пароль!</span>

        <div class="field2">
          <div class="p-float-label"><InputText style="width: 100%" type="username" :class="{'p-invalid': v$.login_del.$invalid && sub_del}" v-model="v$.login_del.$model"/><label>Логин</label></div>
          <small v-if="(v$.login_del.$invalid) && sub_del || v$.login_del.$pending.$response" class="p-error">Введите логин</small>
        </div>

        <div class="field2">
          <div class="p-float-label"><Password input-style="width: 100%" :feedback="false" toggleMask :class="{'p-invalid': v$.password_del.$invalid && sub_del}" v-model="v$.password_del.$model"/><label>Пароль</label></div>
          <small v-if="(v$.password_del.$invalid) && sub_del || v$.password_del.$pending.$response" class="p-error">{{passwordErr}}</small>
        </div>

      </div>
      <template #footer>
        <Button label="Отмена" icon="pi pi-times" class="p-button-text p-button-raised" @click="dialog_del=false"/>
        <Button label="Удалить" icon="pi pi-check" class="p-button-text p-button-raised p-button-danger" @click="delUser"/>
      </template>
    </Dialog>

    <form @submit.prevent="sendPassword()" class="my-flex flex">
      <h2 class="c12">Изменить пароль</h2>

      <div class="field">
        <div class="p-float-label">
          <Password input-style="width: 100%" :feedback="false" toggleMask :class="{'p-invalid': v$.old_password.$invalid && sub_pass}" v-model="v$.old_password.$model"/>
          <label>Старый пароль</label>
        </div>
        <small v-if="(v$.old_password.$invalid) && sub_pass || v$.old_password.$pending.$response" class="p-error">Введите старый пароль</small>
      </div>

      <div class="field">
        <div class="p-float-label">
          <Password input-style="width: 100%" toggleMask :class="{'p-invalid': v$.password.$invalid && sub_pass}" v-model="v$.password.$model"/>
          <label>Новый пароль</label>
        </div>
        <small v-if="(v$.password.$invalid) && sub_pass || v$.password.$pending.$response" class="p-error">{{passwordErr}}</small>
      </div>

      <div class="field">
        <div class="p-float-label">
          <Password input-style="width: 100%" :feedback="false" toggleMask :class="{'p-invalid': v$.confirm.$invalid && sub_pass}" v-model="v$.confirm.$model"/>
          <label>Подтверждение</label>
        </div>
        <small v-if="(v$.confirm.$invalid) && sub_pass || v$.confirm.$pending.$response" class="p-error">Подтвердите пароль</small>
      </div>

      <div>
        <Button label="Сохранить" type="submit" icon="pi pi-check" class="p-button-lg" style="margin-bottom: 10px"/>
      </div>
    </form>

    <div class="card" style="max-width: 650px; margin: 0 auto">
      <!--   responsiveLayout="scroll"   -->
      <DataTable :value="orders" stripedRows :scrollable="true" scrollHeight="1000px" scrollDirection="both" v-model:expandedRows="expandedRows" dataKey="id">

        <h2>Заказы</h2>
        <template #header>
          <div class="table-header-container">
            <Button v-if="expand_all==false" icon="pi pi-plus" label="Раскрыть все" @click="expandAll" class="p-button-sm p-button-text p-button-raised"/>
            <Button v-if="expand_all==true" icon="pi pi-minus" label="Свернуть все" @click="collapseAll" class="p-button-sm p-button-text p-button-raised"/>
          </div>
        </template>
        <Column expander header="Букеты" style="width: 71px"/>
        <Column field="id" header="id" sortable style="width: 57px"/>

        <Column field="date" header="Дата и время доставки" sortable style="width: 156px"/>

        <Column field="status" header="Статус" sortable style="width: 90px">
          <template #body="slotProps">
            <span :class="'order-badge ' + slotProps.data.status.toLowerCase()">{{slotProps.data.status}}</span>
          </template>
        </Column>
        <Column field="city.name" header="Город" sortable style="width: 90px"/>
        <Column field="sum_result" header="Стоимость" sortable style="width: 120px"/>
        <template #expansion="slotProps">
          <div class="orders-subtable">

            <DataTable :value="slotProps.data.order_items" responsiveLayout="scroll" :scrollable="false" class="z-index-0" v-model:expandedRows="expandedRows2">
              <Column expander header="Допы" style="width: 90px"></Column>
              <Column field="item.name" header="Букет" sortable style="width: 200px"></Column>
              <Column header="Фото" style="width: 120px">
                <template #body="slotProps">
                  <photo-provider class="cardImages">
                    <photo-consumer v-for="(src,index) in slotProps.data.item.images" :key="api+src.image" :src="api+src.image" style="display: block">
                      <img v-if="index==0" :src="api+src.image" class="image product-image"/>
                    </photo-consumer>
                  </photo-provider>
                </template>
              </Column>
              <Column field="amount" header="Кол." sortable style="width: 70px"></Column>
              <Column field="item.price" header="Стоимость" sortable></Column>

              <template #expansion="slotProps">
                <div class="orders-subtable">

                  <DataTable :value="slotProps.data.extra_item" responsiveLayout="scroll" :scrollable="false" class="z-index-0">
                    <Column field="extra.name" header="Доп" sortable style="width: 200px"></Column>
                    <Column header="Фото" style="width: 120px">
                      <template #body="slotProps">
                        <photo-provider class="cardImages">
                          <photo-consumer :src="api+slotProps.data.extra.picture" style="display: block">
                            <img :src="api+slotProps.data.extra.picture" class="image product-image"/>
                          </photo-consumer>
                        </photo-provider>
                      </template>
                    </Column>
                    <Column field="amount" header="Кол." sortable style="width: 70px"></Column>
                    <Column field="extra.price" header="Стоимость" sortable></Column>
                  </DataTable>
                </div>
              </template>

            </DataTable>
          </div>
        </template>
      </DataTable>
    </div>

<!--    <div class="card">-->
<!--      <h5>Horizontal and Vertical with Footer</h5>-->
<!--      <DataTable :value="orders" :scrollable="true" scrollHeight="400px" :loading="loading" scrollDirection="both">-->
<!--        <Column field="id" header="Id" footer="Id" style="width:100px"></Column>-->
<!--        <Column field="name" header="Name" footer="Name" style="width:200px"></Column>-->
<!--        <Column field="country.name" header="Country" footer="Country" style="width:200px"></Column>-->
<!--        <Column field="date" header="Date" footer="Date" style="width:200px"></Column>-->
<!--        <Column field="balance" header="Balance" footer="Balance" style="width:200px">-->
<!--          <template #body="{data}">-->
<!--            {{formatCurrency(data.balance)}}-->
<!--          </template>-->
<!--        </Column>-->
<!--        <Column field="company" header="Company" footer="Company" style="width:200px"></Column>-->
<!--        <Column field="status" header="Status" footer="Status" style="width:200px"></Column>-->
<!--        <Column field="activity" header="Activity" footer="Activity" style="width:200px"></Column>-->
<!--        <Column field="representative.name" header="Representative" footer="Representative" style="width:200px"></Column>-->
<!--      </DataTable>-->
<!--    </div>-->

  </div>
</template>

<script>
import {email, minLength, required} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import axios from 'axios';
export default {
  name: "Profile",
  setup: () => ({ v$: useVuelidate() }),
  data(){
    return{
      user:localStorage.getItem('user'),
      api:localStorage.getItem('api'),
      name:'',
      email:'',
      phone:'',
      old_password:'',
      password:'',
      confirm:'',
      sub_prof: false,
      sub_pass: false,
      sub_del: false,
      validationErrors: {},
      orders:'',
      expandedRows: [],
      expandedRows2: [],
      expand_all:false,
      dialog_del:false,
      login_del:'',
      password_del:'',
    }
  },
  validations(){
    return{
      name:{required},
      email:{required,email},
      phone:{required},
      old_password:{required,minLength: minLength(8)},
      password:{required,minLength: minLength(8)},
      confirm:{required,f(){return this.password==this.confirm}},
      login_del:{required},
      password_del:{required,minLength: minLength(8)},
    }
  },
  mounted(){
    this.getData()
  },
  computed:{
    passwordErr(){if(this.v$.password.minLength.$invalid){return 'Минимальная длина - 8 символов'}else if(this.v$.password.required.$invalid){return 'Введите новый пароль'}},
    password_delErr(){if(this.v$.password_del.minLength.$invalid){return 'Минимальная длина - 8 символов'}else if(this.v$.password_del.required.$invalid){return 'Введите новый пароль'}}
  },
  methods:{
    delUser(){
      this.sub_del=true
      if (!this.v$.login_del.$invalid && !this.v$.password_del.$invalid) {
        axios.post(this.api+'api/order/profile/',{username:this.login_del,password:this.password_del,state:'del_profile'}).then((res) => {
          if(res.data=='Пользователь удален!'){this.$toast.add({severity: 'warn', summary: res.data, life: 3000});this.dialog_del=false;
            localStorage.removeItem('user');localStorage.removeItem('name');this.$router.push('/');}
          else{this.$toast.add({severity: 'error', summary: res.data, life: 3000})}
        })
      }
    },
    sendProfile() {
      this.sub_prof=true
      if (!this.v$.name.$invalid && !this.v$.email.$invalid && !this.v$.phone.$invalid) {
        axios.post(this.api+'api/order/profile/',{username:this.user,name:this.name,email:this.email,phone:this.phone,state:'change_profile'}).then((res) => {
          if(res.data=='Успешно'){this.$toast.add({severity: 'success', summary: res.data, life: 3000});
            this.$store.commit('setUser',{name:this.name,email:this.email,phone:this.phone})
          }
          else{this.$toast.add({severity: 'error', summary: res.data, life: 3000})}
        })
      }
    },
    sendPassword() {
      this.sub_pass=true
      if (!this.v$.old_password.$invalid && !this.v$.password.$invalid && !this.v$.confirm.$invalid) {
        axios.post(this.api+'api/order/profile/',{username:this.user,old_password:this.old_password,password:this.password,state:'change_password'}).then((res) => {
          if(res.data=='Успешно'){this.$toast.add({severity: 'success', summary: res.data, life: 3000})}
          else{this.$toast.add({severity: 'error', summary: res.data, life: 3000})}
        })
      }
    },
    getData(){
      axios.post(this.api+'api/order/profile/',{username:this.user,state:'init_profile'}).then((res)=>{
        this.orders=res.data[0];
        this.name=res.data[1];
        this.email=res.data[2];
        this.phone=res.data[3];
        this.$store.commit('setUser',{orders:res.data[0],name:res.data[1],email:res.data[2],phone:res.data[3]})
      })
    },
    expandAll() {
      this.expand_all=true
      this.expandedRows = this.orders.filter(p => p.id);
    },
    collapseAll() {
      this.expand_all=false
      this.expandedRows = null;
    },
  }
}
</script>