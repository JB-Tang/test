<template>
    <div>
        <div>{{msg}}</div>
        <div>学校的名称是：{{name}}</div>
        <div>学校的地址是:{{address}}</div>
        <hr>
        <Student></Student>
    </div>
</template>
<script>
import Student from './Student.vue'
export default {
    name:'School',
    components:{Student},
    data() {
        return {
            msg:'这边是简单的信息介绍'
        }
    },
    props:['name','address']
}
</script>
