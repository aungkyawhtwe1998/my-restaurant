import { createStore } from "vuex";
import firebase from "firebase/compat/app";
import db from "../config/firebaseInit";
export default createStore({
  state: {
    editPost:null,
    user:null,
    profileEmail:null,
    profileName:null,
    profileId:null,
    profileAddress:null,
    menuName:null,
    menuPhoto:null,
    menuPrice:null,
    menuPhone:null,
    menuId:null,
    menuDate:null,
    menuItems:[],
    menuItemsLoaded:null
  },
  getters:{
    homeMenuItems(state){
      return state.menuItems.slice(0,3);
    }
  },
  mutations: {
    updateMenuName(state, payload){
      state.menuName = payload;
    },
    updateMenuPhoto(state, payload){
      state.menuPhoto = payload;
    },
    updateMenuPrice(state, payload){
      state.menuPrice = payload;
    },
    updateMenuPhone(state, payload){
      state.menuPhone = payload;
    },

    //User
    updateUser(state, payload){
        state.user = payload
    },
    filterMenuItems(state, payload) {
      state.menuItems = state.menuItems.filter((menu) => menu.menuId !== payload);
    },
    setProfileInfo(state, doc){
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileName = doc.data().name;
      state.profileAddress = doc.data().address;
    },
    changeName(state, payload){
      state.profileName = payload
    },
    changeAddress(state, payload){
      state.profileAddress = payload
    },
  },
  actions: {
    async getCurrentUser({commit}){
      const usersDB = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const results = await usersDB.get();
      commit("setProfileInfo", results);

    },
    async getMenuItems({state}){
      if(firebase.auth().currentUser){
        const menuDB= db.collection('menu').where('ownerId', '==', firebase.auth().currentUser.uid);
        const results = await menuDB.get();
        results.forEach(doc=>{
          //to restrict adding the same menu twice
          if(!state.menuItems.some(menu => menu.menuId === doc.id)){
            const data = {
              menuId:doc.id,
              menuName:doc.data().name,
              menuPhoto:doc.data().photo,
              menuPrice:doc.data().price,
              menuPhone:doc.data().phone,
              menuDate: doc.data().date,
            };
            state.menuItems.push(data);
          }
        });
        state.menuItemsLoaded=true;
      }
    },


    async updateProfileSettings({commit, state}){
      const usersDB = await db.collection('users').doc(state.profileId);
      await usersDB.update({
        name: state.profileName,
        address: state.profileAddress,
      });
      commit("setProfileInfo")
    },

    async deleteMenu({ commit }, payload) {
      const getMenu = await db.collection("menu").doc(payload);
      await getMenu.delete();
      commit("filterMenuItems", payload);
    },

  },
  modules: {},
});
