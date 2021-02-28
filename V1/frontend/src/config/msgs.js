
// para importar as bibliotecas com o vue
import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted,{
    iconPack: 'fontawesome',
    duration: 3000
})
// criando mensagens default
Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    // se a mesnagem não estiver setado da o oops se não pega a mensagem
    payload => !payload.msg ? 'Oops... Erro inesperado.' : payload.msg,
    { type : 'error', icon : 'times' }
)

//payload dentro dele tem uma mensagem e pode estar setada ou não