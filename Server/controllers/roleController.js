import roleServices from '../services/roleServices.js';


const create=async(req,res)=>{
    try {
        
        await roleServices.create(req.body);
        res.status(200).send({"success":"new record added"});
    } catch (error) {
        res.status(500).send({"error":error});
    }
}
const getAll=async(req,res)=>{
    try {
        const response=await roleServices.getAll();
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({"error":error})
    }
}
const update=async(req,res)=>{
    try {
        const {id}=req.params;
        const roleObj={
            id,
            ...req.body
        }
        await roleServices.update(roleObj);
        res.status(200).send({"success":"record updated"});
    } catch (error) {
        res.status(500).send({"error":error});
    }
}
const remove=async(req,res)=>{
    try {
        const {id}=req.params;
        await roleServices.remove(id);
        res.status(200).send({"success":"record deleted"});
    } catch (error) {
        res.status(500).send({"error":error});
    }
}
export default {create,getAll,update,remove}