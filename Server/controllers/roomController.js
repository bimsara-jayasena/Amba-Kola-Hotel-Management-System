
import roomServices from '../services/roomServices.js';

const add=async(req,res)=>{
    try {
        await roomServices.add(req.body);
        res.status(200).send({"success":"new record added"});
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
}
const getAll=async(req,res)=>{
    try {
        const response=await roomServices.getAll();
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({"error":error.message})
    }
}
const get=async(req,res)=>{
    try {
        const {id}=req.params;
        const [result]=await roomServices.get(id);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
}

const update=async(req,res)=>{
    try {
        const {id}=req.params;
        const roomObj={
           
            ...req.body,
            id
        }
        await roomServices.update(roomObj);
        res.status(200).send({"success":"updated"});
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
}
const remove=async(req,res)=>{
    try {
        const {id}=req.params;
        const result=await roomServices.remove(id);
        res.status(200).send({"success":"record removed"});
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
}

export default {add,getAll,get,update,remove};