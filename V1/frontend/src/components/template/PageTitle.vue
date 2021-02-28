<template>
    <div class="page-title">
        <h1><i v-if="icon" :class="icon"></i>{{ main }}</h1>
        <h2>{{ sub }}</h2>
        <hr>
        
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    // recebe tres propriedades que é icon, main e sub
    props:['icon', 'main', 'sub']
}
</script>

<style>
    .page-title{
        grid-area:title;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 
        2px 0 10px 0 rgba(0, 0, 0, 0.12),
        2px 0 15px 0 rgba(0, 0, 0, 0.09);
        margin-bottom: 10px;
        padding:10px;
        
    }
    .page-title h1{
        margin: 0px;
    }

    .page-title h2{
        color:#777;
        margin-top: 5px;
        font-size: 1.3rem;
                
    }
</style>
