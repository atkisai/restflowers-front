<template>
  <div id="app" data-server-rendered="true"/>
  <Toast/>
  <Navbar v-if="!$route.path.includes('crm')"/>
  <NavbarCrm v-if="$route.path.includes('crm')"/>
  <router-view/>
  <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />
  <ScrollTop/>
</template>
<script>
import Navbar from './components/Navbar';
import NavbarCrm from "./components/NavbarCrm";
import AppConfig from './AppConfig.vue';
import EventBus from './AppEventBus';

export default {
  components:{Navbar,NavbarCrm,AppConfig},
  themeChangeListener: null,
  data(){
    return{
      layoutMode: 'static',
    }
  },
  mounted() {
    if(localStorage.download===undefined){localStorage.download='30'}
    localStorage.api='http://127.0.0.1:8000/'
    localStorage.api_ws='ws://127.0.0.1:8000/api/'
    // localStorage.api='https://restflowers.com/'
    // localStorage.api_ws='wss://restflowers.com/api/'

    this.themeChangeListener = (event) => {
      const elementId = 'theme-link';
      const linkElement = document.getElementById(elementId);
      // console.log(linkElement)
      const cloneLinkElement = linkElement.cloneNode(true);
      const newThemeUrl = linkElement.getAttribute('href').replace(this.$appState.theme, event.theme);

      cloneLinkElement.setAttribute('id', elementId + '-clone');
      cloneLinkElement.setAttribute('href', newThemeUrl);
      cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', elementId);
      });
      linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

      this.$appState.theme = event.theme;
      this.$appState.darkTheme = event.dark;
    };

    EventBus.on('theme-change', this.themeChangeListener);
  },
  beforeUnmount() {
    EventBus.off('theme-change', this.themeChangeListener);
  },
  methods:{
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
  }
}
</script>


