
import roomStatusServices from "../services/roomStatusServices.js";

const creat=async(req,res)=>{
    try {
        await roomStatusServices.create(req.body);
        res.status(200).send({"success":"record created"})
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
}
const getAll=async(req,res)=>{
    try {
        const response=await roomStatusServices.getAll();
        
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({"error":error});
    }
}
const update=async(req,res)=>{
    try {
        const {id}=req.parms;
        const statusObj={
            id,
            ...req.body
        }
        await roomStatusServices.update(statusObj);
        res.status(200).send({"success":"record updated"});
    } catch (error) {
        res.status(500).send({"error":error.message});
    }
}
export default {creat,getAll,update}