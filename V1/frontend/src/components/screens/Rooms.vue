<template>

    <div class="room">
        <div>        
            <PageTitle icon="fa fa-building" main="Salas de Treinamento"
            sub="Cadastros e Cia"/> 
        </div>
        <hr>    
        <template>
            <div>
                <b-modal id="modal-lg" size="lg" v-model="modalShow"  hide-footer >
                    <b-form-group
                        label="Pesquisar"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="lg"
                        label-for="filterInput"
                        class="ml-5"
                    >
                    <b-input-group size="lg">
                        <b-form-input
                            v-model="filter"
                            type="search"
                            id="filterInput"
                            placeholder="Digite para pesquisa"
                        ></b-form-input>
                    <b-input-group-append>
                        <b-button class="ml-1" :disabled="!filter" @click="filter = ''">Limpar</b-button>
                    </b-input-group-append>
                    </b-input-group>
                    </b-form-group>                 
                    <template>
                        <div class="table">         
                            <b-table 
                                sticky-header="400px"
                                hover striped
                                :items="rooms"
                                :fields="fields"
                                :filter="filter"
                                responsive >                              
                                <template slot="actions" slot-scope="data">
                                    <b-button variant="warning" @click="loadRoom(data.item)"  class="mr-2">
                                        <i class="fa fa-pencil"></i>
                                    </b-button>
                                    <b-button variant="danger" @click="loadRoom(data.item, 'remove')">
                                        <i class="fa fa-trash"></i>
                                    </b-button>
                                </template>                             
                            </b-table>
                        </div>
                    </template>
                    <b-button v-if="mode === 'save || edit'"
                        @click="modalShow=false">Fechar
                    </b-button>
                </b-modal>
            </div>            
        </template>
      
        <div>
            
            <b-col class="table-design" xl="12">
              <h3 v-if = " mode == 'save || edit'"> Cadastro ou Edição de Salas</h3>                            
                    <h3 v-if = " mode == 'remove'"> Excluir</h3> 
                    <b-form id = "Cadastro">
                        <!-- vai estar escondido se v-model="room.id estiver setado
                        vai estar marcado se não estiver setado não vai estar marcado-->
                        <input id="room-id" type="hidden" v-model="room.id" />                        
                        <b-row>                            
                            <b-col md="6" sm="12">
                                <b-form-group label="Nome da Sala:" label-for="room-name">
                                    <b-form-input id="room-name" type="text"
                                        v-model="room.nome" 
                                        :readonly="mode === 'remove'"                                       
                                        placeholder="Insira o Nome da Sala..." />
                                </b-form-group>
                            </b-col>
                            <b-col md="6" sm="12">
                                <b-form-group label="Lotação:" label-for="romm-stocking">
                                    <b-form-input id="romm-stocking" type="text"
                                        v-model="room.lotacao" 
                                        :readonly="mode === 'remove'"                                       
                                        placeholder="Insira a lotação da sala (Capacidade de pessoas)" />
                                </b-form-group>
                            </b-col>                            
                        </b-row>                                               
                        <b-row>
                            <b-col xs="12">
                                <div class="buttons">
                                <!--  -->
                                    <b-button variant="primary" class="mr-2"
                                        @click="save"  >Salvar</b-button>                                                                        
                                    <b-button variant="danger" v-if="mode === 'remove'"
                                        @click= "remove" class="mr-2" >Excluir</b-button> 
                                    <b-button 
                                        @click="reset()">Cancelar</b-button>
                                    <b-button class="ml-3" variant="success" @click="loadRooms()">Consultar Salas</b-button>
                                </div> 
                            </b-col>
                        </b-row>
                    </b-form>      
            </b-col>
        </div>
    </div>
</template>

<script>
import PageTitle from '@/components//template/PageTitle'
// importamos a constante para ter o endereço do backend
import { baseApiUrl, showError } from '@/global'
// token, qualquer requisição que faça o token é enviado
import axios from 'axios'

export default {
    name:"Rooms",
    components: {PageTitle},
    // aponta para uma função que retorna um objeto
    data: function(){ // ESTADOS dos componentes
        return {
            // vai trocar entre o modo de exclusão quando salvar
            // se tiver o botão save e não tiver o id chama post
            // se o botão save com id chama put
            // se o botão remover chama delete
            mode:'save',
            // esse objeto serve para salvar atualizar ou excluir
            room: {},
            // array  que vai renderizar na tabela
            rooms:[],
            // campos da tabela
            //sortable - ordenação 
            modalShow: false,
            fields: [
                { key: 'actions', label: 'Ações' },
                { key: 'id', label: 'Código', sortable: true }, 
                { key: 'nome', label: 'Nome da Sala',sortable: true},               
                { key: 'lotacao', label: 'Lotacao', sortable: true }, 
            ],
            filter: null            
        }        
    },
    
    computed: {
      sortOptions() {
        // Crie uma lista de opções de nossos campos
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    methods: {
        // carregar a lista de usuários dos componentes no BACKEND
        loadRooms() {
            this.modalShow = true
            const url = `${baseApiUrl}/salas`
            axios.get(url).then(res => {
                this.rooms = res.data                
                // os dados que vieram da resposta
                console.log(this.rooms)
            })    
        },
                      
        reset() {
            this.mode = 'save'            
            this.room = {}
            //this.loadRooms() //  carrega novamente os usuários quando clicar em reset
        },
        //// aqui de fato faz uma requisição para o backend
        save() {

            // método put ou post , através do id do usuário
            const method = this.room.id ? 'put' : 'post'
            // se o id estiver setado colocar no final da url o id
            // se o tiver o id coloca na base url e senão recebe um valor vazio
            const id = this.room.id ? `/${this.room.id}` : ''
            //pode chamar de duas formas, axios.post ou axios.put, mas vou passar através de uma string
            //this.room será enviado para o backend
            axios[method](`${baseApiUrl}/salas${id}`, this.room) // recebe o objeto room:{}, que pode
            //// ou não estar vazio dependendo do loadRoom, ou seja se tem ou não um usuário carregado            
            //// caso der certo chama o then   
                .then(() => {
                    //mostra a mensagem de sucesso
                   this.$toasted.global.defaultSuccess()                    
                    // reseta o formulário depois que fizer uma submissão bem sucessida
                    this.reset()                    
                })
                .catch(showError)
        },

        //closeModal(){
            //this.modalShow = false
        //},
        remove() {
            const id = this.room.id
            axios.delete(`${baseApiUrl}/salas/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)   
        },
        loadRoom(room, mode = 'save || edit ') { // recebe o usuário, por padrão recebe o modo save            
            this.modalShow = false
            //this.reset() 
            this.mode = mode // setando o modo que recebeu como parametro do método, save, edit etc
            //this.room = { ...room }
            axios.get(`${baseApiUrl}/salas/${room.id}`)
                .then(res => this.room = res.data)                              
        },
                        
    },   
    
    // ciclo de vida, atualiza os estados
    mounted() {        
        //this.loadRooms()
        
    }

}
</script>

<style>

.room {
        grid-area: room;
        display:block;
        padding: 20px; 
}
.flex-container{
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    height: 80px;
    justify-content: flex-start;
    align-items: center;
    align-content:space-around;    
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 
        2px 0 10px 0 rgba(0, 0, 0, 0.12),
        2px 0 15px 0 rgba(0, 0, 0, 0.09); 
}
.table-design{
    border-radius: 20px;
    background-color: #fff;    
}
</style>