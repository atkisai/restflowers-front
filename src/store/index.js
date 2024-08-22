import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    basket:[],
    flowers:[],
    categorys:'',
    povods:'',
    user:'',
    mesgs:[],
    mesgs_crm:[],
    flowers_crm:[],
    save_flowers_crm:[],
    next:'',
    download:localStorage.download,
  },
  mutations: {
    setDownload(state, download){state.download=download;localStorage.download=download},
    setNext(state, next){state.next=next},
    delFlowerCrm(state, flower){state.flowers_crm.splice(state.flowers_crm.indexOf(flower),1)},
    addFlowerCrm(state, flower){state.flowers_crm.unshift(flower)},
    updateFlowerCrm(state,flower){state.save_flowers_crm.push(flower)},
    setFlowersCrm(state,flowers){state.flowers_crm=flowers},
    setMesgsCrm(state,mes){state.mesgs_crm.push(mes)},
    setMesgs(state,mes){state.mesgs.push(mes)},
    setBasket(state,flower){state.basket.push(flower)},
    delBasket(state,obj){
      obj.flower.col=1
      obj.flower.set.extra.forEach((item)=>{item.col=1;item.selected=false})
      state.basket.splice(obj.index,1)
    },
    cleanBasket(state){
      state.basket.forEach((item)=>{item.col=1;item.set.extra.forEach((item)=>{item.col=1;item.selected=false})})
      state.basket=[];
    },
    setFlowers(state,flowers){state.flowers=flowers},
    updateFlowers(state,flowers){
      // console.log(state.flowers)
      // console.log(flowers)
      state.flowers = state.flowers.concat(flowers)
    },
    setCategorys(state,categorys){state.categorys=categorys},
    setPovods(state,povods){state.povods=povods},
    setUser(state,user){state.user=user},
  },
  getters:{

  },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState({storage:window.sessionStorage})]
})
