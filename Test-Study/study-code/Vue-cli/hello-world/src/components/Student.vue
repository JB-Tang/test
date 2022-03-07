<template>
    <div>
        <div ref="studentName" @click="addAge">学生的姓名：{{name}}</div>
        <div ref="studentAge">学生的年龄:{{age}}</div>
    </div>
</template>
<script>
export default {
    name:'Student',
    data() {
        return {
            name:'hhh',
            age:12,
        }
    },
    methods: {
        addAge(){
            console.log("获取页面的元素：",this.$refs)
        }
    },
}
</script>