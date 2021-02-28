<template>

    <div class="person">
        <div>        
            <PageTitle icon="fa fa-building" main="Cadastro de Pessoas em locais"
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
                        label-size="sm"
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
                                :items="persons"
                                :fields="fields"
                                :filter="filter"
                                responsive >                              
                                <template slot="actions" slot-scope="data">
                                    <b-button variant="warning" @click="loadPerson(data.item)"  class="mr-2">
                                        <i class="fa fa-pencil"></i>
                                    </b-button>
                                    <b-button variant="danger" @click="loadPerson(data.item, 'remove')">
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
                        <!-- vai estar escondido se v-model="person.id estiver setado
                        vai estar marcado se não estiver setado não vai estar marcado-->
                        <input id="person-id" type="hidden" v-model="person.id" />                        
                        <b-row>                            
                            <b-col md="6" sm="12">
                                <b-form-group label="Nome da Pessoa:" label-for="person-name">
                                    <b-form-input id="person-name" type="text"
                                        v-model="person.nome" 
                                        :readonly="mode === 'remove'"                                       
                                        placeholder="Insira o nome da pessoa..." />
                                </b-form-group>
                            </b-col>
                            <b-col md="6" sm="12">
                                <b-form-group label="Sobrenome da Pessoa:" label-for="romm-stocking">
                                    <b-form-input id="romm-stocking" type="text"
                                        v-model="person.sobrenome" 
                                        :readonly="mode === 'remove'"                                       
                                        placeholder="Insira o Sobrenome da pessoa" />
                                </b-form-group>
                            </b-col>                            
                        </b-row>
                        <b-row>
                            <b-col md ="6" sm="12">                                
                                <b-form-group v-if="mode === 'remove'" label="Sala para 1 etapa:" label-for="person-salaIdEt1"  >                                    
                                        <b-form-select id="person-salaIdEt1" :options="rooms" disabled v-model="person.salaIdEt1" />
                                </b-form-group>                                
                                <b-form-group v-if="mode === 'save'" label="Sala para 1 etapa:" label-for="person-salaIdEt1" >                                    
                                        <b-form-select id="person-salaIdEt1" :options="rooms" v-model="person.salaIdEt1"  />
                                </b-form-group>                                
                            </b-col>
                            <b-col md ="6" sm="12">                                
                                <b-form-group v-if="mode === 'remove'" label="Sala para 2 etapa:" label-for="person-salaIdEt2"  >                                    
                                        <b-form-select id="person-salaIdEt2" :options="rooms" disabled v-model="person.salaIdEt2" />
                                </b-form-group>                                
                                <b-form-group v-if="mode === 'save'" label="Sala para 2 etapa:" label-for="person-salaIdEt2" >                                    
                                        <b-form-select id="person-salaIdEt2" :options="rooms" v-model="person.salaIdEt2"  />
                                </b-form-group>                                
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col md ="6" sm="12">                                
                                <b-form-group v-if="mode === 'remove'" label="Espaco para 1 etapa:" label-for="person-espacoIdEt1"  >                                    
                                        <b-form-select id="person-espacoIdEt1" :options="spaces" disabled v-model="person.espacoIdEt1" />
                                </b-form-group>                                
                                <b-form-group v-if="mode === 'save'" label="Espaco para 1 etapa:" label-for="person-espacoIdEt1" >                                    
                                        <b-form-select id="person-espacoIdEt1" :options="spaces" v-model="person.espacoIdEt1"  />
                                </b-form-group>                                
                            </b-col>
                            <b-col md ="6" sm="12">                                
                                <b-form-group v-if="mode === 'remove'" label="Espaco para 2 etapa:" label-for="person-espacoIdEt2"  >                                    
                                        <b-form-select id="person-espacoIdEt2" :options="spaces" disabled v-model="person.espacoIdEt2" />
                                </b-form-group>                                
                                <b-form-group v-if="mode === 'save'" label="Espaco para 2 etapa:" label-for="person-espacoIdEt2" >                                    
                                        <b-form-select id="person-espacoIdEt2" :options="spaces" v-model="person.espacoIdEt2"  />
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
                                    <b-button class="ml-3" variant="success" @click="loadPersons()">Consultas por filtro</b-button>
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
    name:"Persons",
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
            person: {},
            // array  que vai renderizar na tabela
            persons:[],
            // campos da tabela
            //sortable - ordenação 
            rooms: [],
            spaces:[], 
            modalShow: false,
            fields: [
                { key: 'actions', label: 'Ações' },                 
                { key: 'nome', label: 'Nome',sortable: true},               
                { key: 'sobrenome', label: 'Sobrenome', sortable: true },
                { key: 'nomeSalaEt1', label: 'Sala Etapa1',sortable: true},               
                { key: 'nomeSalaEt2', label: 'Sala Etapa2', sortable: true },
                { key: 'nomeEspacoEt1', label: 'Espaço para Etapa1',sortable: true},               
                { key: 'nomeEspacoEt2', label: 'Espaço para Etapa2', sortable: true }, 
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
        loadPersons() {
            this.modalShow = true
            const url = `${baseApiUrl}/pessoas`
            axios.get(url).then(res => {
                this.persons = res.data                
                // os dados que vieram da resposta
                console.log(this.persons)
            })    
        },
                      
        reset() {
            this.mode = 'save'            
            this.person = {}
            //this.loadPersons() //  carrega novamente os usuários quando clicar em reset
        },
        //// aqui de fato faz uma requisição para o backend
        save() {

            // método put ou post , através do id do usuário
            const method = this.person.id ? 'put' : 'post'
            // se o id estiver setado colocar no final da url o id
            // se o tiver o id coloca na base url e senão recebe um valor vazio
            const id = this.person.id ? `/${this.person.id}` : ''
            //pode chamar de duas formas, axios.post ou axios.put, mas vou passar através de uma string
            //this.person será enviado para o backend
            axios[method](`${baseApiUrl}/pessoas${id}`, this.person) // recebe o objeto person:{}, que pode
            //// ou não estar vazio dependendo do loadPerson, ou seja se tem ou não um usuário carregado            
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
            const id = this.person.id
            axios.delete(`${baseApiUrl}/pessoas/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)   
        },
        loadPerson(person, mode = 'save || edit ') { // recebe o usuário, por padrão recebe o modo save            
            this.modalShow = false
            //this.reset() 
            this.mode = mode // setando o modo que recebeu como parametro do método, save, edit etc
            //this.person = { ...person }
            axios.get(`${baseApiUrl}/pessoas/${person.id}`)
                .then(res => this.person = res.data)                              
        },

        loadRooms() {            
            const url = `${baseApiUrl}/salas`
            axios.get(url).then(res => {
                this.rooms = res.data.map(room => {                    
                    return { value: room.id, text: `${room.nome}` }                    
                })
                //this.users = res.data
                console.log(this.rooms)                
            })   
        },        
        loadSpaces() {            
            const url = `${baseApiUrl}/espacos`
            axios.get(url).then(res => {
                this.spaces = res.data.map(space => {                    
                    return { value: space.id, text: `${space.id} || ${space.nome} ` }                    
                })
                //this.users = res.data
                //console.log(this.equipamentos)                
            })   
        },
                        
    },   
    
    // ciclo de vida, atualiza os estados
    mounted() {        
        //this.loadPersons()
        this.loadRooms()
        this.loadSpaces()
        
    }

}
</script>

<style>

.person {
        grid-area: person;
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