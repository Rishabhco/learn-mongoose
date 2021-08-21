const express=require('express')
const User = require('../models/user_model.js')

const router=new express.Router()

router.post('/users',async (req,res)=>{
    // console.log(req.body)
    //  res.send('testing!')
   const user=new User(req.body)

   try{
       await user.save()
       res.status(201).send("Successfully Saved")
    }catch(error){
       res.status(400).send(error)
   }
})

router.get('/users/me', async(req,res)=>{
    try{
        const user=await User.find({})
        res.status(201).send(user)
    }catch(error){
        res.status(400).send(error)
    }
})
router.get('/users/:id', async(req,res)=>{
    const _id=req.params.id
    try{
        const user=await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    }catch(error){
        res.status(500).send(error)
    }
})

router.patch('/users/:id',async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['email','age']
    const isValidOpration=updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOpration){
        return res.status(400).send('Invalid updates!')
    }

    try{
        const user=await User.findById(req.params.id)
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save()
        if(!user){
            res.status(404).send()
        }
        res.status(200).send(user)
    }catch(error){
        res.status(500).send(error)
    }
})

router.delete('/users/:id',(req,res)=>{
    try{
        const _id=req.params.id
        const user=User.findById(_id)
        if(!user){
            res.status(404).send('No user found')
        }
        User.findByIdAndDelete(_id, () => {
            res.status(200).send('Deleted!')
        })
    }catch(error){
        res.status(500).send(error)
    }

})

module.exports=router
