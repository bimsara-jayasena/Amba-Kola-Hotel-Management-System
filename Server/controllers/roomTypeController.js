
import roomTypeServices from "../services/roomTypeServices.js";
const creat=async(req,res)=>{
    try {
        await roomTypeServices.create(req.body);
        res.status(200).send({"success":"record created"})
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
}
const getAll=async(req,res)=>{
    try {
        const response=await roomTypeServices.getAll();
        
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({"error":error});
    }
}
const update=async(req,res)=>{
    try {
        const {id}=req.params;
        const typeObj={
            id,
            ...req.body
        }
        await roomTypeServices.update(typeObj);
        res.status(200).send({"success":"record updated"});
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
}
const remove=async(req,res)=>{
    try {
        const {id}=req.params;
        const response=await roomTypeServices.remove(id);
        res.status(200).send({"success":"record deleted"});
    } catch (error) {
        res.status(500).send({"error":error});
    }
}
export default {creat,getAll,update,remove}