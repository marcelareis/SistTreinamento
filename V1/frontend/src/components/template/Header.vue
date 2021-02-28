<template>
    <header class="header" :hideToggle = "true">
        <a class="toggle" @click = "toggleMenu" v-if="!hideToggle"> <!-- se não estiver escondido-->
            <i class="fa fa-lg" :class = "icon"></i>
        </a>
        <h1 class="title">
            {{title}}
        </h1>
                
    </header>
</template>

<script>
export default {
    name: 'Header',
    
    props:{
        title: String,
        hideToggle: Boolean, // é para termos a parte que aparece            
   },
   // para obter o botão com formas diferentes no toogle
   computed:{
       // chamando a propriedade de icon
       icon(){ // decide qual ícone que será exibido
            //abaixo outra estatégia para mapear estado em contraponto com a estrategia de mapear o estado
           return this.$store.state.isMenuVisible ? "fa-angle-left":"fa-angle-down"
       } 
   },
   methods:{
       toggleMenu(){
           this.$store.commit('toggleMenu') //$store acessei a store, commit a alteração toggleMenu           
       }
   } 
}
</script>

<style>
    .header {
        grid-area: header; /* vai estar em um contexto de css grid*/
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;/* display flex é linha quando diz justify content estamos centralizando na linha*/
        justify-content: center;
        align-items: center;
    }
    .title {
        font-size: 2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;/* para que o título possa crescer*//*quero que o toogle fique do lado esquerdo*/
        text-align: center;
    }
    .title a {
        color: #FFF;
        text-decoration: none; /* retirar a cara de link*/
    }
    .title a:hover {
        color: #FFF;
        text-decoration: none; /* retirar a cara de link*/
    }
    /* configurando botão seta esquerda*/
    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;/* não quero ne*/

        display: flex;
        justify-content: center;
        align-items: center;        
    }
    /* colocando animação area seta*/
    header.header > a.toggle:hover { 
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    }

    
</style>