const {router,pool}=require('../connect')

router.get('/',(req,res)=>{
    pool.getConnection((err,conn)=>{
        conn.query('SELECT * FROM student',(e,r)=>{
            res.json(r)
        })
        conn.release();
    })
})

module.exports=router;