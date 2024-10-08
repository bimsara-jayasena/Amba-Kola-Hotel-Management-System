import guestServices from "../services/guestServices.js";

const getAll=async(req,res)=>{
    try {
        const result=await guestServices.getAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
}
const get=async(req,res)=>{
    try {
        const {id}=req.params;
        const [result]=await guestServices.get(id);
        res.status(200).send(result);
    } catch (error) {
        
    }
}
const create=async(req,res)=>{
    try {
        
        await guestServices.create(req.body);
        res.status(200).send({"success":"new guest added"});
    } catch (error) {
        res.status(500).send({"error":error.message})
    }
}
const update=async(req,res)=>{
    try {
        const {id}=req.params;
        const employe= {
            id,
            ...req.body
           }
        await guestServices.update(employe);
        res.status(200).send({"success":"updated"})
    } catch (error) {
        
    }
}

/* const remove=async(req,res)=>{
    try {
        const {id}=req.params;
        await employeServices.remove(id);
        res.status(200).send({"success":"record removed"})
    } catch (error) {
        res.status(500).send({"error":error})
    }
} */
export default {getAll,get,create};