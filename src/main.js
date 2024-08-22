import { createApp,reactive } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vue3PhotoPreview from 'vue3-photo-preview'
import 'vue3-photo-preview/dist/index.css'
import './assets/index.css'
import PrimeVue from 'primevue/config';
// import 'primevue/resources/themes/mdc-light-deeppurple/theme.css'
// import 'primevue/resources/primevue.min.css';
import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import ScrollTop from "primevue/scrolltop";
import Listbox from "primevue/listbox";
import Calendar from "primevue/calendar";
import InputMask from "primevue/inputmask";
import Textarea from "primevue/textarea";
import RadioButton from "primevue/radiobutton";
import Checkbox from "primevue/checkbox";
import Password from 'primevue/password';
import SplitButton from 'primevue/splitbutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
const app = createApp(App);
// const app = createApp(AppWrapper);
app.use(PrimeVue, {ripple: true})
app.use(vue3PhotoPreview)
app.use(store)
app.use(router)
app.use(ToastService)
app.component('InputText',InputText)
app.component('Dropdown',Dropdown)
app.component('Button',Button)
app.component('ScrollTop',ScrollTop)
app.component('Listbox',Listbox)
app.component('Calendar',Calendar)
app.component('InputMask',InputMask)
app.component('Textarea',Textarea)
app.component('RadioButton',RadioButton)
app.component('Checkbox',Checkbox)
app.component('Password',Password)
app.component('SplitButton',SplitButton)
app.component('DataTable',DataTable)
app.component('Column',Column)
app.component('Toast',Toast)
app.component('Dialog',Dialog)
app.config.globalProperties.$appState = reactive({ theme: 'mdc-light-deeppurple', darkTheme: false });
// import DiscordPicker from 'vue3-discordpicker'
// app.component('DiscordPicker',DiscordPicker, /* { default options with global component } */)
app.mount('#app')
