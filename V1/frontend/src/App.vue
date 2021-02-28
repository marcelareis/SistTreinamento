<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible}"><!-- para esconder o menu com o toggle colocar uma classe css condicional-->
		<Header title = "Sistema de Treinamento"/> 
		<Menu />			
		<Content />
		<Footer />
	</div>
</template>

<script>
//preciso do axios para validar o token no backend preciso dele
//import axios from "axios"
// precisarei interagir com o userKey
//import { baseApiUrl, userKey } from "@/global"
import { mapState } from 'vuex'
import Header from "@/components/template/Header" // @ com ele acessa o raiz da aplicação
// que nesse caso é o src
import Menu  from "@/components/template/Menu"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
//import Loading from "@/components/template/Loading"

export default {
	name: "App",
	components:{Header, Menu, Content, Footer},
	computed: mapState(['isMenuVisible'])
	// para não ficar a áre branca quando esconde o menu, precisamos aplicar o mapState no app
	// aula 494, inserindo o usuário não mais mocado, mapeando user também
	//computed: mapState(['isMenuVisible']),
	// estado do componente apartir do atributo data
	//data: function() { // estado do componente apartir de data
		//return {
			// flag que diz se esta ou não validadando o token
			// por padrão quando carrega vai validar, enquanto esta validando vai estar pensando
			// pois entra no backend
			//validatingToken: true
		//}
	//},
	/*methods: {
		async validateToken() {
			this.validatingToken = true
			// pegar o json que esta no localstore
			const json = localStorage.getItem(userKey)
			// caso esteja setado transformar para userDate
			//se for nulo seta nulo se estiver setado converte para os dados do usuário
			const userData = JSON.parse(json)
			
			this.$store.commit('setUser', null)
			// se não tiver nada
			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)
			// se res.data for verdadeiro, esta tudo ok
			if (res.data) {
				this.$store.commit('setUser', userData)
				// quando terminou todo processo e esta pronto para exigir ele testa
				// o dispositivo do usuário
				if(this.$mq === 'xs' || this.$mq === 'sm') {
					this.$store.commit('toggleMenu', false)
				}
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}
			// pra que não fique eternamente validando o token
			this.validatingToken = false
		}
	},*/
	// pra que a função seja chamada, created antes do mounted
	/*created() {
		this.validateToken()
	}*/
	
}
</script>

<style>
	#app {
    --bg-dark: #1A2F3A; /* Não estou usando*/

    --logo-height: 100px;
    --header-height: 70px;
    --menu-top-height: 20px;
    --aside-width: 300px;
    --footer-height: 40px;

    --shadow: 
        0 2px 23px 0 rgba(0, 0, 0, 0.1),
        0 2px 49px 0 rgba(0, 0, 0, 0.06);
}
	
	
	/*  * seletor universal, lembrando que Lato esta definido em index  */
	*{
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0; /* retira a margem que tem por padrão*/
	}

	#app {
		-webkit-font-smoothing: antialiased; /* suavia as fontes quando renderizar*/
		-moz-osx-font-smoothing: grayscale; /* suavia as fontes quando renderizar*/

		height: 100vh;/* 100% do tamanho da aplicação, divide altura em 100 partes*/
		display: grid;/* foi criado o grid area para cada componente*/
		grid-template-columns: var(--aside-width) 1fr;/* largura que
    	colocou na side with lá em cima, e a outra coluna
    	ocupara o resto por isso 1frame*/
    	grid-template-rows:
        	var(--header-height)/*altura do cabeçalho*/
        	1fr /* o conteudo inteiro da aplicação*/
        	var(--footer-height); /* altura do cabeçalho*/
		grid-template-areas:/* onde cada um dos componentes se encaixam dentro dessa área*/
			/* minusculos pois entra como classes é ali que temos os styles de cada um */
			"header header" /* 3 colunas o header ocupa de ponta a ponta*/
			"menu content" /* 2 colunas 1 para o menu e um para o conteudo*/
			"footer footer"; /* na ultima linha , sendo a primeira coluna teremos o menu e o footer*/
	}

	#app.hide-menu{
		grid-template-areas: /* definindo novas áreas de grid quando o menu escondido*/
			"header header"
			"content content"
			"footer footer";
	}
	/*@media(max-width: 768px){    
		#app{
			grid-template-rows:
				var(--header-height)
				var(--menu-top-height)
				1fr
				var(--footer-height);
			grid-template-columns: var(--asside-with) 1fr;
			grid-template-areas:
				"header header"				
				"menu content"
				"footer footer";
		}
		.menu{
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
	}

	@media(max-width: 576px){
		#app{
			grid-template-rows: 
				var(--header-height)				
				var(--menu-top-height)
				1fr 
				var(--footer-height);
			grid-template-columns:
			1fr;
			grid-template-areas: 
			"header"
			"menu"
			"content"
			"footer";
		}    
	}*/

</style>