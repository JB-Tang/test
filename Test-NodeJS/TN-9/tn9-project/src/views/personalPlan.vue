<template>
    <div class="rootStyle">
        <div class="mainStyle">
            <div class="top">
                <div class="top-left">{{nowTime}}</div>
                <div></div>
            </div>
            <div class="mid" :style="{height:normalHeight-100+'px'}">
                <div class="mid-con">

                    <div class="mid-con-item" :style="{width:normalWidth-32+'px'}">
                        <div class="mid-con-item-left">
                            <div class="item-left-time">09:00</div>
                        </div>
                        <div class="mid-con-item-mid">
                            <div class="item-mid-con">11111111111111111111111111111111111</div>
                        </div>
                        <div class="mid-con-item-right">
                            <div>忙碌ing...</div>
                        </div>
                    </div>
                    <div class="mid-con-item" :style="{width:normalWidth-32+'px'}">
                        <div class="mid-con-item-left">
                            <div class="item-left-time">10:00</div>
                        </div>
                        <div class="mid-con-item-mid">
                            <div class="item-mid-con">11111111111111111111111111111111111</div>
                        </div>
                        <div class="mid-con-item-right">
                            <div>忙碌ing...</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'personalPlan',
    data() {
        return {
           normalWidth:document.documentElement.clientWidth,    //页面的可用宽度
           normalHeight:document.documentElement.clientHeight,  //页面的可用高度
           nowTime:'',      //当前的时间
        }
    },
    created() {
        this.setNowTimer();
    },
    methods: {
        setNowTimer:function(){
            setInterval(()=>{
                this.nowTime=new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
            },1000)
        }
    },
}
</script>
<style scoped>
    .rootStyle{
        width: 100%;
    }
    .mainStyle{
        width: 100%;
    }
    .top{
        width: 100%;
        height: 64px;
        background-color: #4da1ff;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .top-left{
        margin-left: 16px;
        line-height: 64px;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
    }
    .mid{
        width: 100%;
        overflow-y: scroll;
    }
    .mid-con{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .mid-con-item{
        display: flex;
        align-items: center;
    }
    .mid-con-item-left{
        flex: 1;
    }
    .item-left-time{
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 12px;
    }
    .mid-con-item-mid{
        flex: 2;
    }
    .item-mid-con{
        padding: 8px 0px;
        line-height: 20px;
        font-size: 14px;
        word-break: break-all;
    }
    .mid-con-item-right{
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }

</style>