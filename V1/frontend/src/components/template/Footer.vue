<template>
    <footer class="footer">
        <span>Copyright <strong>Sistema de Treinamentos </strong>@2021-2023</span>
    </footer>
</template>

<script>
export default {
    name: "Footer"    
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;

        display: flex;
        align-items: center; 
        justify-content: flex-end; /* alinhar do lado direito da tela*/
        padding-right: 100px;/* pra quando o texto do footer para para o lado direito não ficar colado no lado direito da tela*/
    }
</style>