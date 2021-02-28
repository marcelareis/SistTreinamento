<template>
    <aside class="menu" v-show="isMenuVisible">
        <nav class="menuadmin">
            <ul>                 
                <router-link to = "/salas" tag = "li" active-class = "active">
                    <div class="menuadmin-content">
                        
                        <a><i class="fa fa-building"></i><span>Salas de Treinamento</span></a>
                    </div>
                </router-link>
                <router-link to = "/espacos" tag = "li" active-class = "active">
                    <div class="menuadmin-content">
                        <a><i class="fa fa-coffee"></i><span>Espaços de Café</span></a>
                    </div>
                </router-link>
                <router-link to = "/pessoas" tag = "li" active-class = "active">
                    <div class="menuadmin-content">
                        <a><i class="fa fa-users"></i><span>Pessoas e Locais</span></a>
                    </div>
                </router-link> 
            </ul>    
        </nav> 
    </aside>
</template>

<script>
import {mapState} from 'vuex'
//import Tree from 'liquor-tree'
//import { baseApiUrl } from '@/global'
//import axios from 'axios'

export default {
    name: 'Menu',
    //components: { Tree },
    computed: mapState(['isMenuVisible']),   
    //data: function() {
        //return {
            //treeFilter: '',
            //treeData: this.getTreeData(),
            //treeOptions: {
                //propertyNames: { 'text': 'name' },
                //filter: { emptyText: 'Técnico não encontrado' }
            //}
        //}
    //},
    //methods: {
        //getTreeData() {
            //const url = `${baseApiUrl}/users`
            //return axios.get(url).then(res => res.data)
        //},
        //onNodeSelect(node) {
            //this.$router.push({
                //name: 'recipesByUser',
                //params: { id: node.id }
            //})

            //if(this.$mq === 'xs' || this.$mq === 'sm') {
                //this.$store.commit('toggleMenu', false)
            //}
        //}
    //},
    //mounted() {
        //this.$refs.tree.$on('node:selected', this.onNodeSelect)
    //}
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #8c8bb9, #c6cace);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        border-radius:15px;
    }

    .menu a,
    .menu a:hover {
        color: #fff;
        text-decoration: none;
    }

    .menu-area {
    grid-area: menuadmin;
    background-color: #efefef;
    box-shadow:    
        2px 0 10px 0 rgba(0, 0, 0, 0.2),
        2px 0 15px 0 rgba(0, 0, 0, 0.15);
    border-radius:15px;
    margin-left:10px;
    margin-bottom: 1px;
    }

    .menuadmin{
    height: 100%;
    justify-content:flex-start;
    margin-top: 15px;
    }

    .menuadmin a{
    display: block;
    text-decoration:none;
    color:#000;
    font-size: 1.1rem;
    padding: 8px;
    }
    .menuadmin ul {
    margin: 0;
    padding: 0;
    }

    .menuadmin li {
    display: inline-block;
    }

    .menuadmin .menuadmin-content{
    min-width: 215px;
    padding: 10px;
    }
    /*.menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(2);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i {
        color: #AAA;
        margin-right: 10px;
    }

    .menu input {
        color: #CCC;
        font-size: 1rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty {
        color: #CCC;
        font-size: 1rem;
        margin-left: 20px;
    }*/
</style>
