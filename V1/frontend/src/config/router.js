import Vue from 'vue'
import VueRouter from 'vue-router'

import Rooms from '@/components/screens/Rooms'
import Spaces from '@/components/screens/SpacesCofee'
import Persons from '@/components/screens/Persons'

// Registrar o vue router dentro do vue
Vue.use(VueRouter)

// Criar as rotas, para que possa registrar as rotas no vueRouter e fazer a configuração final dele
const routes = [
    
    {
    name:'room',
    path:'/salas',
    component:Rooms,
    },
    {
    name:'space',
    path:'/espacos',
    component:Spaces,
    },
    {
    name:'person',
    path:'/pessoas',
    component:Persons,
    },
    

    
    
]

 const route = new VueRouter({
    mode:'history', // sem o hash
    routes // são as rotas da linha 11
})
// acessar um evento que vai ser chamado sempre que for navegar
// de um rota para outra.
//router.beforeEach recebe como paramentros
// to - qual a tela que vou, from de onde estou vindo
// next - se vai ou não continuar o processo de mudança de tela


//route.beforeEach((to, from, next) => {


    // aplicar validações, impedir que um usuario que não é administrador
    // transicionar para um tela que ele não tenha direito
    // para isso pego o usuário que esta em localStorage
    // poderia fazer uma requisição para o backend mas não vamos fazer isso, mas é parecido
    // como validatetoken...

    //const json = localStorage.getItem(userKey)

    // verificar se a url para onde vamos, url to de destino, some recebe um calback e 
    // recebi o registro (requiresAdmin)que representa qualquer uma das rotas
    
    //if(to.matched.some(record => record.meta.requiresAdmin)) {
        //const user = JSON.parse(json)
        //user && user.admin ? next() : next({ path: '/' }) // volta para o raiz
        // se não der match
   // } else {
        //next()
   //}
//})

export default route

