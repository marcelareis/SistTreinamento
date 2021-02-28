/* NÃO UTILIZO TODO ESSE ARQUIVO NESTE CÓD.  */

import Vuex from 'vuex'
import Vue from 'vue'
// importanto para usar o token em setUser
//import axios from 'axios'

Vue.use(Vuex) // dizendo que vai usar o VUex

export default new Vuex.Store({
    state:{
        isMenuVisible: true
        //user: null,
    },
    mutations:{
        toggleMenu(state, isVisible){
            // se usuário não estiver setado
            //if(!state.user) {
                //state.isMenuVisible = false
                // e simplesmente não quero que execute o resto do método passo return
                //return
           // }
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            }else{
                // aqui passou ou true ou false
                state.isMenuVisible = isVisible // setar no estado aquilo que recebeu no estado (true ou false)
            }         
            
        },
        // Para mostrar o usuário
        //setUser(state, user) { // recebe o state e o proprio usuário que quero setar
            //state.user = user
            // testes. Se o usuário estiver setar setar o menu para ficar visivel
            //pegar o token e já setar para dentro do axios
            // mas para isso, tem que importar o axios aqui no store
            //if(user) {
                //axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                //state.isMenuVisible = true
            //} else {
                //delete axios.defaults.headers.common['Authorization']
                //state.isMenuVisible = false
            //}
        //}
    }
})