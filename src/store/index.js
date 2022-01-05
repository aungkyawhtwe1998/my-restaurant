import { createStore } from "vuex";
import firebase from "firebase/compat/app";
import db from "../config/firebaseInit";
export default createStore({
  state: {
    //user
    editPost:null,
    user:null,
    profileEmail:null,
    profileName:null,
    profileId:null,
    profileAddress:null,
    profilePhoto:null,
    profileIsOwner:null,
    ownerId:null,
    users:[],
    userLoaded:null,

    //menu
    menuName:null,
    menuPhoto:null,
    menuPrice:null,
    menuPhone:null,
    menuId:null,
    menuDate:null,
    menuItems:[],
    ownerMenu:[],
    menuItemsLoaded:null
  },
  getters:{
    homeMenuItems(state){
      return state.menuItems.slice(0,3);
    }
  },
  mutations: {

    //User
    updateUser(state, payload){
        state.user = payload
    },
    createPhotoURL(state, payload){
      state.profilePhoto = payload;
    },

    setProfileInfo(state, doc){
      state.profileId = doc.data().id;
      state.profileEmail = doc.data().email;
      state.profileName = doc.data().name;
      state.profilePhoto = doc.data().photo;
      state.profileAddress = doc.data().address;
      state.profileIsOwner = doc.data().owner;
    },
    changeProfileSettings(state, doc){
      state.profileName = doc.data().name;
      state.profileAddress = doc.data().address;
    },
    changeName(state, payload){
      state.profileName = payload
    },
    changeAddress(state, payload){
      state.profileAddress = payload
    },
    //Menu
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
    updateOwnerId(state, payload){
      state.ownerId = payload;
    },
    filterOwnerMenu(state, payload){
      state.ownerMenu = state.ownerMenu.filter((menu) => menu.menuId !== payload);
    },
    searchMenuItems(state, payload){
      state.menuItems = state.menuItems.filter((menu) => menu.menuName.toLocaleLowerCase().includes(payload));
    }
  },
  actions: {
    //menu

    async getOwnerMenu({state}){
      if(firebase.auth().currentUser){
        const menuDB = db.collection('menu').where("ownerId","==",firebase.auth().currentUser.uid).orderBy("date","desc");
        const results = await menuDB.get();
        results.forEach(doc=>{
          //to restrict adding the same menu twice
          if(!state.ownerMenu.some(menu => menu.menuId === doc.id)){
            const data = {
              menuId:doc.id,
              menuName:doc.data().name,
              menuPhoto:doc.data().photo,
              menuPrice:doc.data().price,
              menuPhone:doc.data().phone,
              ownerId:doc.data().ownerId,
              menuDate: doc.data().date,
            };
            state.ownerMenu.push(data);
          }
        });
        state.menuItemsLoaded=true;
      }
    },

    async getMenuItems({state}){
        const menuDB= db.collection('menu').orderBy("date","desc");
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
              ownerId:doc.data().ownerId,
              menuDate: doc.data().date,
            };
            state.menuItems.push(data);
          }
        });
        state.menuItemsLoaded=true;
    },
    async deleteMenu({ commit }, payload) {
      const getMenu = await db.collection("menu").doc(payload);
      await getMenu.delete();
      commit("filterOwnerMenu", payload);
    },

    //user

    async getUsers({state}){
      const userDb= db.collection('users').orderBy("date","desc");
      const results = await userDb.get();
      results.forEach(doc=>{
        //to restrict adding the same menu twice
        if(!state.users.some(user => user.menuId === doc.id)){
          const data = {
            profileId:doc.id,
            profilePhoto:doc.data().photo,
            profileName:doc.data().name,
            profileEmail:doc.data().email,
            profileIsOwner:doc.data().owner,
            profileAddress:doc.data().address
          };
          state.users.push(data);
        }
      });
      state.userLoaded=true;
    },
    async getCurrentUser({commit}){
      const usersDB = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const results = await usersDB.get();
      commit("setProfileInfo", results);

    },
    async updateProfileSettings({commit, state}){
      console.log("profile id"+state.profileId);
      const usersDB = await db.collection('users').doc(state.profileId);
      await usersDB.update({
        id:state.profileId,
        email:state.profileEmail,
        name: state.profileName,
        address: state.profileAddress,
        photo:state.profilePhoto,
      });
      commit("setProfileInfo");
    },

  },
  modules: {},
});
