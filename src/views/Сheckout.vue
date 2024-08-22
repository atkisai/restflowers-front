<template>
  <div class="grid" style="max-width: 1200px;margin: 0 auto">
    <div class="md:col-8" style="padding:20px;">
      <h2 class="md" style="margin-bottom: 30px">Оформление заказа</h2>
      <div class="grid md">

        <div class="field-radiobutton ml10"><RadioButton name="payment" value="Отправка другому" v-model="me_or_another"/><label>Отправка другому</label></div>
        <div class="field-radiobutton ml10"><RadioButton name="payment" value="Отправка себе" v-model="me_or_another"/><label>Отправка себе</label></div>

        <h3 class="col-12">Получатель</h3>

        <div class="field">
          <div class="p-float-label"><InputText :class="{'p-invalid': validationErrors.username}" v-model="username"/><label>Имя</label></div>
          <small v-show="validationErrors.username" class="p-error">Введите имя получателя</small>
        </div>
        <div class="field">
          <div class="p-float-label"><InputMask :class="{'p-invalid': validationErrors.phone}" v-model="phone" mask="+375(99) 999-99-99"/><label>Телефон</label></div>
          <small v-show="validationErrors.phone" class="p-error">Введите телефон получателя</small>
        </div>
        <div v-if="me_or_another!=='Отправка другому'" class="field">
          <div class="p-float-label"><InputText :class="{'p-invalid': validationErrors.email}" v-model="email"/><label>Почта</label></div>
          <small v-show="validationErrors.email" class="p-error">Введите Вашу почту</small>
        </div>

        <h3 class="col-12">Адрес и дата доставки</h3>
        <div class="field">
          <div class="p-float-label"><InputText :class="{'p-invalid': validationErrors.address}" v-model="address"/><label>Адрес</label></div>
          <small v-show="validationErrors.address" class="p-error">Введите адрес получателя</small>
        </div>
        <div class="field">
          <div class="p-float-label"><Calendar :class="{'p-invalid': validationErrors.date}" v-model="date" dateFormat="yy-mm-dd"/><label>Дата</label></div>
          <small v-show="validationErrors.date" class="p-error">Выберите дату доставки</small>
        </div>
        <div class="field">
          <div class="p-float-label"><Dropdown :class="{'p-invalid': validationErrors.selectedTime}" :options="selectTime" v-model="selectedTime" optionLabel="label"/><label>Время</label></div>
          <small v-show="validationErrors.selectedTime" class="p-error">Выберите время доставки</small>
        </div>

        <h3 v-if="me_or_another=='Отправка другому'" class="col-12">Отправитель</h3>
        <div v-if="me_or_another=='Отправка другому'" class="field">
          <div class="p-float-label"><InputMask :class="{'p-invalid': validationErrors.my_phone}" v-model="my_phone" mask="+375(99) 999-99-99"/><label>Ваш телефон</label></div>
          <small v-show="validationErrors.my_phone" class="p-error">Введите Ваш телефон</small>
        </div>
        <div v-if="me_or_another=='Отправка другому'" class="field">
          <div class="p-float-label"><InputText :class="{'p-invalid': validationErrors.email}" v-model="email"/><label>Почта</label></div>
          <small v-show="validationErrors.email" class="p-error">Введите Вашу почту</small>
        </div>
        <div v-if="me_or_another=='Отправка другому'" class="field col-12">
          <Checkbox v-model="anonim" :binary="true"/>
          <small style="margin-left: 10px">Аноним</small>
        </div>

        <h3 class="col-12">Добавить открытку бесплатно</h3>
        <div class="p-float-label"><Textarea v-model="postcard_text" rows="4" cols="30"/><label>Введите пожелание для открытки</label></div>

        <h3 class="col-12">Добавить комментарий</h3>
        <div class="p-float-label"><Textarea v-model="comment_text" rows="4" cols="30"/><label>Введите дополнительные пожелания</label></div>

        <h3 class="col-12">Способ оплаты</h3>
        <div class="field-radiobutton ml10"><RadioButton name="payment" value="Оплата онлайн" v-model="payment"/><label>Оплата онлайн</label></div>
        <div class="field-radiobutton ml10"><RadioButton name="payment" value="Оплата через Kaspi" v-model="payment"/><label>Оплата через Kaspi</label></div>
        <div v-if="me_or_another!=='Отправка другому'" class="field-radiobutton ml10"><RadioButton name="payment" value="Оплата наличными курьеру" v-model="payment"/><label>Оплата наличными курьеру</label></div>

        <div class="col-12">
          <Button label="Заказать" @click="sendPayment" icon="pi pi-check" class="p-button-lg"/>
        </div>
      </div>
    </div>
    <div class="md:col-4 md" style="background:rgb(243, 243, 247);padding: 20px">
      <h2>В корзине</h2>
      <ul class="my-ul" style="overflow: auto;height: 900px;">
        <transition-group name="flowers-list">
        <li v-for="(fl, index) in basket" :key="index" class="my-li" style="max-width: 220px">
          <div class="card">
            <photo-provider class="cardImages">
              <photo-consumer v-for="(src,index) in fl.images" :key="api+src.image" :src="api+src.image" style="display: block">
                <img v-if="index==0" :src="api+src.image" class="image" style="max-width: 220px"/>
              </photo-consumer>
            </photo-provider>
            <div style="padding: 14px">
              <p class="name" @click="openCart(fl)">{{fl.name}}</p>
              <div class="block_buy">
                <p class="name" @click="openCart(fl)">{{fl.total}} руб.</p>
                <Button class="p-button-text p-button-rounded p-button-danger p-button-raised" icon="pi pi-times" @click="this.$store.commit('delBasket',{flower:fl,index:index});basket==''?$router.push('/'):''"></Button>
              </div>
            </div>
          </div>
        </li>
        </transition-group>
      </ul>
    </div>
  </div>

  <Sidebar v-model:visible="dialog_buy" :baseZIndex="200" position="full">
    <Detail :flower="flower" @close="dialog_buy=false"/>
  </Sidebar>

  <Dialog header="Оплата через Kaspi!" v-model:visible="dialog_kaspi" :style="{width: '350px'}" :modal="true">
    <div class="confirmation-content">
<!--      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />-->
      <h4>Скопируйте и оплатите заказ по номеру карты:</h4>
      <h4>4400 4301 7508 6542</h4>
      <h4>После оплаты в сообщении укажите номер заказа: {{ order_id }}.</h4>
      <h4>Заказ можно отслеживать в личном кабинете.</h4>
      <h4>Эта информация пришла к Вам на почту.</h4>
      <a href="https://kaspi.kz/" target="_blank">Оплатить Kaspi</a>
    </div>
    <template #footer>
      <Button label="Ok" icon="pi pi-check" class="p-button-text p-button-raised" @click="dialog_kaspi=false;$router.push('/')"/>
    </template>
  </Dialog>
</template>

<script>
import Sidebar from 'primevue/sidebar';
import Detail from "../components/Detail";
import axios from 'axios'
export default {
  name: "Сheckout",
  components:{Sidebar,Detail},
  data(){
    return{
      me_or_another:'Отправка другому',
      username:'',
      phone:'',
      address:'',
      date:'',
      selectedTime:'',
      selectTime:[{label:'В течение дня'},{label:'7:00-10:00'},{label:'10:00-13:00'},{label:'13:00-16:00'},{label:'16:00-19:00'},{label:'19:00-22:00'}],
      my_phone:this.$store.state.user.phone,
      email:this.$store.state.user.email,
      anonim:true,
      postcard_text:'',
      comment_text:'',
      payment:'Оплата онлайн',
      validationErrors: {},
      basket:this.$store.state.basket,
      api:localStorage.getItem('api'),
      dialog_kaspi:false,
      order_id:'',
      dialog_buy:false,
      flower:'',
    }
  },
  mounted() {
    // console.log(this.basket)
  },
  watch:{
    me_or_another(value){
      if(value=='Отправка другому' && this.payment=='Оплата наличными курьеру'){this.payment='Оплата онлайн'}
      if(value=='Отправка себе'){this.phone=this.my_phone;this.username=this.$store.state.user.name}else{this.phone='';this.username=''}
    }
  },
  computed:{
    dateFormat(){
      function join(t, a, s) {
        function format(m) {
          let f = new Intl.DateTimeFormat('en', m);
          return f.format(t);
        }
        return a.map(format).join(s);
      }
      let a = [{year: 'numeric'}, {month: 'numeric'}, {day: 'numeric'}];
      let s = join(this.date, a, '-');
      return s
    }
  },
  methods:{
    sendPayment(){
      if (this.validateForm()){
        let sum = 0
        for (let flower of this.basket){sum+=flower.total}
        if(this.me_or_another!=='Отправка другому'){this.my_phone=this.phone}
        console.log(this.anonim)
        const data={
          user:localStorage.getItem('user'),
          payment:this.payment,
          sum:sum,
          name:this.username,
          phone:this.phone,
          address:this.address,
          date:this.dateFormat,
          time:this.selectedTime.label,
          my_phone:this.my_phone,
          email:this.email,
          postcard:this.postcard_text,
          comments:this.comment_text,
          basket:this.basket,
          anonim:this.anonim,
        }
        axios.post(this.api+'api/order/post_order/',data).then((res)=>{
          console.log(res.data)
          if(res.data.status=='Успех') {
            if(this.payment == 'Оплата онлайн'){window.open(res.data.url, '_blank');this.$router.push('/')}else
            if(this.payment == 'Оплата наличными курьеру'){this.$toast.add({severity: 'success', summary: 'Заказ принят!', life: 3000});this.$router.push('/')}else
            if(this.payment == 'Оплата через Kaspi'){this.$toast.add({severity: 'warn', summary: 'Оплата через Kaspi! Проверьте почту!', life: 3000});this.order_id=res.data.order_id;this.dialog_kaspi=true}
            this.$store.commit('cleanBasket')
          }else{this.$toast.add({severity: 'error', summary: 'Что-то пошло не так!', life: 3000});}
        })
      }
    },
    openCart(fl){
      console.log(fl)
      this.dialog_buy=true
      this.flower=fl
    },
    validateForm() {
      if (this.username=='') this.validationErrors['username'] = true; else delete this.validationErrors['username']
      if (this.phone=='') this.validationErrors['phone'] = true; else delete this.validationErrors['phone']

      if (this.address=='') this.validationErrors['address'] = true; else delete this.validationErrors['address']
      if (this.date=='') this.validationErrors['date'] = true; else delete this.validationErrors['date']
      if (this.selectedTime=='') this.validationErrors['selectedTime'] = true; else delete this.validationErrors['selectedTime']

      if (this.my_phone=='' && this.me_or_another=='Отправка другому') this.validationErrors['my_phone'] = true; else delete this.validationErrors['my_phone']
      if (this.email=='') this.validationErrors['email'] = true; else delete this.validationErrors['email']

      return !Object.keys(this.validationErrors).length;
    }
  }
}
</script>