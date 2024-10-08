import restaurentServices from "../services/restaurentServices.js";

const getAll=async(req,res)=>{
    try {
        const result=await restaurentServices.getAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
}
const get=async(req,res)=>{
    try {
        const {id}=req.params;
        const result=await restaurentServices.get(id);
        res.status(200).send(result);
    } catch (error) {
        
    }
}
const create=async(req,res)=>{
    try {
        
        await restaurentServices.create(req.body);
        res.status(200).send({"success":"new item added"});
    } catch (error) {
        res.status(500).send({"error":error.message})
    }
}
const update=async(req,res)=>{
    try {
        const {id}=req.params;
        const item= {
            id,
            ...req.body
           }
        const response=await restaurentServices.update(item);
        const rows=response.affectedRows;
        if(rows>0){
        res.status(200).send({"success":response.affectedRows})
        }else{
            throw error
        }
      
    } catch (error) {
        res.status(500).send({"error":"updated failed"})
    }
}

const remove=async(req,res)=>{
    try {
        const {id}=req.params;
        await restaurentServices.remove(id);
        res.status(200).send({"success":"record removed"})
    } catch (error) {
        res.status(500).send({"error":error})
    }
}
export default {getAll,get,create,update,remove};