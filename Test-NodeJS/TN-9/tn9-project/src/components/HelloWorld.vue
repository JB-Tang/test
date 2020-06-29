<template>
  <div class="hello">
    <button @click="show">点我</button>
    <div v-if="content!=''">{{content}}</div>
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
  methods: {
    show:function(){
      axios.get('http://localhost:3000/userInfo/getUserCount').then(res=>{
        console.log("res",res)
      }).catch(err=>{
        console.log("err",err)
      })
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
