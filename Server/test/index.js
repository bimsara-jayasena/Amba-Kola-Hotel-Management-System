import express from 'express';
const app=express();

app.use('/',(req,res)=>{
    res.send('Hello world')
})
app.listen(5555,()=>{
    console.log('app is listning')
})