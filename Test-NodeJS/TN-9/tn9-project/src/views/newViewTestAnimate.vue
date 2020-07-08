<template>
    <div>
        <router-link to="/login">登录页</router-link>
        <router-link to="/user">个人页</router-link>
        <transition :name='transitionName'>
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            transitionName:'',
        }
    },
    watch: {
        '$route':(to,from)=>{
            if(to.path=='/login'){  //如果跳到登录页，就启动slide-left类名的动画
                this.transitionName='slide-left';
            }else if(to.path=='/user'){ //如果跳转到个人页，就启动slide-right类名的动画
                this.transitionName='slide-right';
            }
        }
    }
}
</script>
<style>
    .slide-left-enter-active{
        animation: slideInLeft .5s reverse;
    }
    .slide-left-leave-active{
        animation: slideOutLeft .5s reverse;
    }
    .slide-right-enter-active{
        animation: slideInRight .5s reverse;
    }
    .slide-right-leave-active{
        animation: slideOutRight .5s reverse;
    }

</style>