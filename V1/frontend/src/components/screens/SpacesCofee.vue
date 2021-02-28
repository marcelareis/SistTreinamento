<template>

    <div class="space">
        <div>        
            <PageTitle icon="fa fa-coffee" main="Espaços de Café"
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
                                :items="spaces"
                                :fields="fields"
                                :filter="filter"
                                responsive >                              
                                <template slot="actions" slot-scope="data">
                                    <b-button variant="warning" @click="loadSpace(data.item)"  class="mr-2">
                                        <i class="fa fa-pencil"></i>
                                    </b-button>
                                    <b-button variant="danger" @click="loadSpace(data.item, 'remove')">
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
              <h3 v-if = " mode == 'save || edit'"> Cadastro ou Edição de Espaços</h3>                            
                    <h3 v-if = " mode == 'remove'"> Excluir</h3> 
                    <b-form id = "Cadastro">
                        <!-- vai estar escondido se v-model="space.id estiver setado
                        vai estar marcado se não estiver setado não vai estar marcado-->
                        <input id="space-id" type="hidden" v-model="space.id" />                        
                        <b-row>                            
                            <b-col md="6" sm="12">
                                <b-form-group label="Nome da Espaço para café:" label-for="space-name">
                                    <b-form-input id="space-name" type="text"
                                        v-model="space.nome" 
                                        :readonly="mode === 'remove'"                                       
                                        placeholder="Insira o Nome da Espeço para Café..." />
                                </b-form-group>
                            </b-col>
                            <b-col md="6" sm="12">
                                <b-form-group label="Lotação:" label-for="space-stocking">
                                    <b-form-input id="space-stocking" type="text"
                                        v-model="space.lotacao" 
                                        :readonly="mode === 'remove'"                                       
                                        placeholder="Insira a Capacidade de pessoas" />
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
                                    <b-button class="ml-3" variant="success" @click="loadSpaces()">Consultar Salas</b-button>
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
import axios from 'axios'

export default {
    name:"Spaces",
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
            space: {},
            // array  que vai renderizar na tabela
            spaces:[],
            // campos da tabela
            //sortable - ordenação 
            modalShow: false,
            fields: [
                { key: 'actions', label: 'Ações' },
                { key: 'id', label: 'Código', sortable: true }, 
                { key: 'nome', label: 'Nome do Espaço',sortable: true},               
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
        loadSpaces() {
            this.modalShow = true
            const url = `${baseApiUrl}/espacos`
            axios.get(url).then(res => {
                this.spaces = res.data                
                // os dados que vieram da resposta
                console.log(this.spaces)
            })    
        },
                      
        reset() {
            this.mode = 'save'            
            this.space = {}
            //this.loadSpaces() //  carrega novamente os usuários quando clicar em reset
        },
        //// aqui de fato faz uma requisição para o backend
        save() {

            // método put ou post , através do id do usuário
            const method = this.space.id ? 'put' : 'post'
            // se o id estiver setado colocar no final da url o id
            // se o tiver o id coloca na base url e senão recebe um valor vazio
            const id = this.space.id ? `/${this.space.id}` : ''
            //pode chamar de duas formas, axios.post ou axios.put, mas vou passar através de uma string
            //this.space será enviado para o backend
            axios[method](`${baseApiUrl}/espacos${id}`, this.space) // recebe o objeto space:{}, que pode
            //// ou não estar vazio dependendo do loadSpace, ou seja se tem ou não um usuário carregado            
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
            const id = this.space.id
            axios.delete(`${baseApiUrl}/espacos/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)   
        },
        loadSpace(space, mode = 'save || edit ') { // recebe o usuário, por padrão recebe o modo save            
            this.modalShow = false
            //this.reset() 
            this.mode = mode // setando o modo que recebeu como parametro do método, save, edit etc
            //this.space = { ...space }
            axios.get(`${baseApiUrl}/espacos/${space.id}`)
                .then(res => this.space = res.data)                              
        },
                        
    },   
    
    // ciclo de vida, atualiza os estados
    mounted() {        
        //this.loadSpaces()
        
    }

}
</script>

<style>

.space {
        grid-area: space;
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