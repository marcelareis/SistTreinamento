import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'
import store from './config/store'
import router from './config/router'
import './config/bootstrap'
// para chamar as mensagem para ser carregado na tela
import './config/msgs'
//import './config/axios'
//import './config/mq'



Vue.config.productionTip = false
/// Temporário
//require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwibmFtZSI6Ik1hcmlhIiwiZW1haWwiOiJtYXJpYUBnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgxOTM3NjA4LCJleHAiOjE1ODIxOTY4MDh9.1bFtbsSXYc0SbHFG-tY8Smoop73e1vWpqV_W1wCL5e0' 


new Vue({
  // o bootstrap não precisa passar como instancia para o vue
  store,
  router,
  
  render: h => h(App)
}).$mount('#app')