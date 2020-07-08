<template>
    <div v-if="show">这边测试一下在页面中直接使用前置导航守卫</div>
</template>
<script>
export default {
    data() {
        return {
            show:false,
        }
    },
    beforeRouteEnter (to, from, next) {
        console.log("这边是路由前置导航守卫")
        next();
    },
    created() {
        this.show=true;
    },
}
</script>
<style scoped>

</style>