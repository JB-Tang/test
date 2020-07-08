import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode:'history',
  scrollBehavior(to,from,savedPosition){
    return{x:0,y:100}
  },
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:()=>import('@/components/HelloWorld')
    },{
      path:'/personalPlan',
      name:'personalPlan',
      component:()=>import('@/views/personalPlan')
    },{
      path:'/newView1',
      name:'newView1',
      component:()=>import('@/views/newView1'),
      alias:'/newView4'
    },{
      path:'/newView2',
      name:'newView2',
      redirect:'/newView1'
    },{
      path:'/newView3',
      name:'newView3',
      redirect:{name:'newView2'}
    },{
      path:'/newViewTestProp/:id',
      name:'newViewTestProp',
      component:()=>import('@/views/newViewTestProp'),
      props:true,
    },{
      path:'/newViewTestParent',
      component:()=>import('@/views/newViewTestParent'),
      children:[{
        path:'child1',
        component:()=>import('@/views/newViewTestChild')
      }]
    },{
      path:'/newViewTestMain',
      components:{
        // default:()=>import('@/views/newViewTestMain'),
        a:()=>import('@/components/newComponentA'),
        b:()=>import('@/components/newComponentB')
      }
    },{
      path:'/newViewTestBF',
      component:()=>import('@/views/newViewTestBF'),
      beforeEnter:(to,from,next)=>{
        console.log("to",to)
        console.log("from",from)
        // next();
        // next(false)
        // next('/newViewTestMain')
        next(error)
      }
    },{
      path:'/newViewTestBF2',
      component:()=>import('@/views/newViewTestBF2')
    },{
      path:'/newViewTestAnimate',
      component:()=>import('@/views/newViewTestAnimate')
    },{
      path:'/login',
      component:()=>import('@/views/login')
    },{
      path:'/user',
      component:()=>import('@/views/user')
    },{
      path:'/newViewTestScrollA',
      component:()=>import('@/views/newViewTestScrollA')
    },{
      path:'/newViewTestScrollB',
      component:()=>import('@/views/newViewTestScrollB')
    },{
      path:'/*',
      component:()=>import('@/views/newViewTestAll')
    }
  ]
})
