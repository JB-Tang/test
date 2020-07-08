<template>
  <div class="hello">
    <button @click="show">点我</button>
    <button @click="turnToNewView">路由newView1</button>
    <button @click="turnToNewView2">路由newView2</button>
    <button @click="turnToNewView3">路由newView3</button>
    <button @click="testRouterPush">测试一下router使用push</button>
    <button @click="testRouterReplace">测试一下router使用replace</button>
    <textarea name="" id="" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
import axios from 'axios'
// import vueAxios from 'vue-axios';
export default {
  name: 'HelloWorld',
  data(){
    return{
      content:'',
    }
  },
  created() {
   console.log("页面重新加载") 
  },
  methods: {
    show:function(){
      // axios.get('http://localhost:3000/userInfo/getUserCount').then(res=>{
      //   console.log("res",res)
      // }).catch(err=>{
      //   console.log("err",err)
      // })
      // this.$router.push({name:'personalPlan',query:{"name":'hhh'}});
      this.$router.push({
        name:'personalPlan',
        params:{
          name:'hhh'
        }
      })
    },
    turnToNewView:function(){
      this.$router.push({
        path:'/newView1',
        query:{name:'hhh'}
      })
    },
    turnToNewView2:function(){
      this.$router.push({
        // path:'/newView2'
        name:'newView2'
      })
    },
    turnToNewView3:function(){
      this.$router.push({
        name:'newView3'
      })
    },
    // 测试使用router中的push
    testRouterPush:function(){
      this.$router.push({
        path:'/newViewTestParent'
      },()=>{
        alert("开始页面的跳转")
      })
    },
    //测试使用router中的replace
    testRouterReplace:function(){
      this.$router.replace({
        path:'/newViewTestParent'
      })
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
