<template>
    <div class="content">
       <router-view ></router-view>        
    </div>
   
</template>

<script>
export default {
    name: 'Content',  
}
</script>

<style>
    .content {
        grid-area: content;
        display:block;
        background-color: #efefef;
        background-image: src = '../assets/foto.jpg';
        padding: 20px; /* pra não ficar colado com menu, nem header e nem footer*/
        border-radius:20px;
        margin-top:10px;  
        margin-left: 10px;
        box-shadow: 
        2px 0 10px 0 rgba(0, 0, 0, 0.08),
        2px 0 15px 0 rgba(0, 0, 0, 0.09);      
    }
    
</style>