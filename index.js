const express=require('express')
const mongoose=require('./db/mongoose.js')
const userRouter=require('./routes/route.js')

const app=express()
const port=process.env.PORT||3000

app.use(express.json())
app.use(userRouter)

app.listen(port,()=>{
    console.log('Server is up on the port '+port+" !")
})